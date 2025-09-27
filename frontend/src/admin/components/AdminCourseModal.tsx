import React, { useEffect, useState } from "react";
import { metadataAPI } from "@/api/metadataAPI";
import { useApi } from "@/api/index";
import { courseAPI } from "@/api/courseAPI";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export function AdminCourseModal({
  isOpen,
  onClose,
  onSaved,
  editingCourse,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (course: any) => void;
  editingCourse?: any;
}) {
  const api = useApi();

  // Course basic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Metadata states & add-new controls
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [skillLevels, setSkillLevels] = useState([]);
  const [skillLevelId, setSkillLevelId] = useState<number | "">("");
  const [newSkillLevelName, setNewSkillLevelName] = useState("");
  const [isAddingSkillLevel, setIsAddingSkillLevel] = useState(false);

  const [grades, setGrades] = useState([]);
  const [gradeId, setGradeId] = useState<number | "">("");
  const [newGradeValue, setNewGradeValue] = useState("");
  const [isAddingGrade, setIsAddingGrade] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [languageId, setLanguageId] = useState<number | "">("");
  const [newLanguageName, setNewLanguageName] = useState("");
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);

  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistVideos, setPlaylistVideos] = useState<any[]>([]);
  const [selectedPlaylistVideos, setSelectedPlaylistVideos] = useState<number[]>([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistThumbnailUrl, setPlaylistThumbnailUrl] = useState("");
  const [courseVideos, setCourseVideos] = useState<any[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  // Load all metadata on open or editingCourse change
  useEffect(() => {
    if (!isOpen) return;

    async function fetchMetadata() {
      try {
        const [cats, skills, grds, langs, tgs] = await Promise.all([
          metadataAPI.getCategories(),
          metadataAPI.getSkillLevels(),
          metadataAPI.getGrades(),
          metadataAPI.getLanguages(),
          metadataAPI.getTags(),
        ]);
        setCategories(cats);
        setSkillLevels(skills);
        setGrades(grds);
        setLanguages(langs);
        setTags(tgs);
      } catch {
        alert("Failed to load metadata");
      }
    }
    fetchMetadata();
  }, [isOpen]);

  // Prefill form if editing
  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title || "");
      setDescription(editingCourse.description || "");
      setCategoryId(editingCourse.categoryId ?? "");
      setSkillLevelId(editingCourse.skillLevelId ?? "");
      setGradeId(editingCourse.gradeId ?? "");
      setLanguageId(editingCourse.languageId ?? "");
      setSelectedTagIds(editingCourse.tags?.map((t: any) => t.id) || []);
    } else {
      setTitle("");
      setDescription("");
      setCategoryId("");
      setSkillLevelId("");
      setGradeId("");
      setLanguageId("");
      setSelectedTagIds([]);
    }
  }, [editingCourse]);

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsAddingCategory(true);
    try {
      const created = await metadataAPI.createCategory({ name: newCategoryName.trim() }, api);
      setCategories((prev) => [...prev, created]);
      setCategoryId(created.id);
      setNewCategoryName("");
    } catch {
      alert("Failed to create category");
    } finally {
      setIsAddingCategory(false);
    }
  };

  const addSkillLevel = async () => {
    if (!newSkillLevelName.trim()) return;
    setIsAddingSkillLevel(true);
    try {
      const created = await metadataAPI.createSkillLevel({ level: newSkillLevelName.trim() }, api);
      setSkillLevels((prev) => [...prev, created]);
      setSkillLevelId(created.id);
      setNewSkillLevelName("");
    } catch {
      alert("Failed to create skill level");
    } finally {
      setIsAddingSkillLevel(false);
    }
  };

  const addGrade = async () => {
    if (!newGradeValue.trim()) return;
    setIsAddingGrade(true);
    try {
      const created = await metadataAPI.createGrade({ value: newGradeValue.trim() }, api);
      setGrades((prev) => [...prev, created]);
      setGradeId(created.id);
      setNewGradeValue("");
    } catch {
      alert("Failed to create grade");
    } finally {
      setIsAddingGrade(false);
    }
  };

  const addLanguage = async () => {
    if (!newLanguageName.trim()) return;
    setIsAddingLanguage(true);
    try {
      const created = await metadataAPI.createLanguage({ name: newLanguageName.trim() }, api);
      setLanguages((prev) => [...prev, created]);
      setLanguageId(created.id);
      setNewLanguageName("");
    } catch {
      alert("Failed to create language");
    } finally {
      setIsAddingLanguage(false);
    }
  };

  const addTag = async () => {
    if (!newTagName.trim()) return;
    setIsAddingTag(true);
    try {
      const created = await metadataAPI.createTag({ name: newTagName.trim() }, api);
      setTags((prev) => [...prev, created]);
      setSelectedTagIds((prev) => [...prev, created.id]);
      setNewTagName("");
    } catch {
      alert("Failed to create tag");
    } finally {
      setIsAddingTag(false);
    }
  };

  // Toggle tags multi-select
  const toggleTag = (id: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  // Load videos from playlist URL
  const loadPlaylistVideos = async () => {
    if (!playlistUrl.trim()) return;
    setLoadingPlaylist(true);
    try {
      const data = await courseAPI.processPlaylist(playlistUrl.trim(), api);
      setPlaylistVideos(data.videos);
      setSelectedPlaylistVideos(data.videos.map((v: any, i: number) => i)); // select all by default
      setCourseVideos(data.videos); // Initially add all videos to courseVideos

      // Prefill course details only if NOT editing existing course
      if (!editingCourse) {
        setTitle(data.playlistTitle || "");
        setDescription(data.playlistDescription || "");
        setPlaylistThumbnailUrl(data.playlistThumbnailUrl || "");
        setThumbnailUrl(data.playlistThumbnailUrl || "");
      }
    } catch {
      alert("Failed to load playlist videos");
    } finally {
      setLoadingPlaylist(false);
    }
  };


  // Toggle video selection from playlist
  const togglePlaylistVideo = (index: number) => {
    setSelectedPlaylistVideos((prev) =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // When submitting course, include selected videos from playlist in courseVideos
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setLoadingSave(true);

    // Construct videos array from selected playlistVideos with metadata
    const videosToAdd = courseVideos.map((video, index) => ({
      videoUrl: video.videoUrl,
      title: video.title,
      description: video.description,
      duration: video.duration,
      thumbnailUrl: video.thumbnailUrl,
      platform: 'youtube',
      order: index + 1,
    }));

    // Include existing courseVideos and playlist videos together
    const payload = {
      title,
      description,
      thumbnailUrl: playlistThumbnailUrl || (editingCourse ? editingCourse.thumbnailUrl : ""),
      categoryId: categoryId === "" ? undefined : categoryId,
      skillLevelId: skillLevelId === "" ? undefined : skillLevelId,
      gradeId: gradeId === "" ? undefined : gradeId,
      languageId: languageId === "" ? undefined : languageId,
      tagIds: selectedTagIds,
      courseVideos: videosToAdd,
    };

    try {
      let savedCourse;
      if (editingCourse) {
        savedCourse = await courseAPI.updateCourse(editingCourse.id, payload, api);
      } else {
        savedCourse = await courseAPI.createCourse(payload, api);
      }
      onSaved(savedCourse);
      onClose();
    } catch (e) {
      alert("Failed to save course");
    } finally {
      setLoadingSave(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">{editingCourse ? "Edit Course" : "Create Course"}</h2>
        <input
          type="text"
          placeholder="Course Title"
          className="input w-full mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loadingSave}
        />
        <textarea
          placeholder="Description"
          className="textarea w-full mb-3"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loadingSave}
        />

        <div className="mb-4">
          <label className="block font-semibold mb-1">Add Videos from YouTube Playlist</label>
          <input
            type="text"
            placeholder="YouTube Playlist URL"
            className="input w-full mb-2"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            disabled={loadingSave || loadingPlaylist}
          />
          <button
            onClick={loadPlaylistVideos}
            disabled={loadingSave || loadingPlaylist || !playlistUrl.trim()}
            className="btn btn-secondary mb-4"
          >
            {loadingPlaylist ? "Loading..." : "Load Videos"}
          </button>

          {playlistVideos.length > 0 && (
            <div className="max-h-48 overflow-auto border rounded p-2 bg-gray-50">
              {playlistVideos.map((video, index) => (
                <label key={video.videoId} className="block cursor-pointer mb-1">
                  <input
                    type="checkbox"
                    checked={selectedPlaylistVideos.includes(index)}
                    onChange={() => togglePlaylistVideo(index)}
                    disabled={loadingSave}
                    className="mr-2"
                  />
                  {video.title} ({Math.floor(video.duration / 60)}m {video.duration % 60}s)
                </label>
              ))}
            </div>
          )}

          {courseVideos.length > 0 && (
            <div className="mb-6 max-h-96 overflow-auto border rounded p-2 bg-gray-50">
              <label className="block font-semibold mb-1">Videos (drag to reorder and edit titles)</label>
              <DragDropContext
                onDragEnd={(result: DropResult) => {
                  if (!result.destination) return;
                  const reordered = Array.from(courseVideos);
                  const [removed] = reordered.splice(result.source.index, 1);
                  reordered.splice(result.destination.index, 0, removed);
                  setCourseVideos(reordered);
                }}
              >
                <Droppable droppableId="videos-droppable">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {courseVideos.map((video, index) => (
                        <Draggable key={video.videoId} draggableId={video.videoId} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center gap-3 p-2 rounded cursor-move mb-2 border ${snapshot.isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                                }`}
                            >
                              <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="h-16 w-28 object-cover rounded"
                              />
                              <input
                                type="text"
                                value={video.title}
                                onChange={(e) => {
                                  const updated = [...courseVideos];
                                  updated[index].title = e.target.value;
                                  setCourseVideos(updated);
                                }}
                                className="input flex-grow"
                                disabled={loadingSave}
                              />
                              <span className="whitespace-nowrap text-sm text-gray-600">
                                {Math.floor(video.duration / 60)}m {video.duration % 60}s
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          )}

        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value) || "")}
            disabled={loadingSave || isAddingCategory}
            className="input w-full mb-1"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Add new category"
              value={newCategoryName}
              disabled={loadingSave || isAddingCategory}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button
              onClick={addCategory}
              disabled={isAddingCategory || !newCategoryName.trim()}
              className="btn btn-primary"
            >
              {isAddingCategory ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Skill Level */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Skill Level</label>
          <select
            value={skillLevelId}
            onChange={(e) => setSkillLevelId(Number(e.target.value) || "")}
            disabled={loadingSave || isAddingSkillLevel}
            className="input w-full mb-1"
          >
            <option value="">Select Skill Level</option>
            {skillLevels.map((s) => (
              <option key={s.id} value={s.id}>{s.level}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Add new skill level"
              value={newSkillLevelName}
              disabled={loadingSave || isAddingSkillLevel}
              onChange={(e) => setNewSkillLevelName(e.target.value)}
            />
            <button
              onClick={addSkillLevel}
              disabled={isAddingSkillLevel || !newSkillLevelName.trim()}
              className="btn btn-primary"
            >
              {isAddingSkillLevel ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Grade */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grade</label>
          <select
            value={gradeId}
            onChange={(e) => setGradeId(Number(e.target.value) || "")}
            disabled={loadingSave || isAddingGrade}
            className="input w-full mb-1"
          >
            <option value="">Select Grade</option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>{g.value}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Add new grade"
              value={newGradeValue}
              disabled={loadingSave || isAddingGrade}
              onChange={(e) => setNewGradeValue(e.target.value)}
            />
            <button
              onClick={addGrade}
              disabled={isAddingGrade || !newGradeValue.trim()}
              className="btn btn-primary"
            >
              {isAddingGrade ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Language</label>
          <select
            value={languageId}
            onChange={(e) => setLanguageId(Number(e.target.value) || "")}
            disabled={loadingSave || isAddingLanguage}
            className="input w-full mb-1"
          >
            <option value="">Select Language</option>
            {languages.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Add new language"
              value={newLanguageName}
              disabled={loadingSave || isAddingLanguage}
              onChange={(e) => setNewLanguageName(e.target.value)}
            />
            <button
              onClick={addLanguage}
              disabled={isAddingLanguage || !newLanguageName.trim()}
              className="btn btn-primary"
            >
              {isAddingLanguage ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Tags (multi-select) */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Tags</label>
          <div className="flex flex-wrap max-h-40 overflow-auto gap-2 min-h-[5rem] border rounded p-2 bg-gray-50">
            {tags.map((tag) => (
              <label key={tag.id} className="inline-flex items-center cursor-pointer mr-2">
                <input
                  type="checkbox"
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                  disabled={loadingSave || isAddingTag}
                  className="mr-1"
                />
                {tag.name}
              </label>
            ))}
          </div>
          <div className="flex space-x-2 mt-2">
            <input
              type="text"
              className="input flex-grow"
              placeholder="Add new tag"
              value={newTagName}
              disabled={loadingSave || isAddingTag}
              onChange={(e) => setNewTagName(e.target.value)}
            />
            <button
              onClick={addTag}
              disabled={isAddingTag || !newTagName.trim()}
              className="btn btn-primary"
            >
              {isAddingTag ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} disabled={loadingSave} className="btn btn-outline">Cancel</button>
          <button onClick={handleSubmit} disabled={loadingSave} className="btn btn-primary">
            {loadingSave ? "Saving..." : editingCourse ? "Update Course" : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
