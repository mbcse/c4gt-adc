import React, { useEffect, useState } from "react";
import { metadataAPI } from "@/api/metadataAPI";
import { useApi } from "@/api/index";
import type { Category, SkillLevel, Grade, Language, Tag } from '@/types';

interface CourseMetadataFormProps {
  categoryId: number | "";
  setCategoryId: (id: number | "") => void;
  skillLevelId: number | "";
  setSkillLevelId: (id: number | "") => void;
  gradeId: number | "";
  setGradeId: (id: number | "") => void;
  languageId: number | "";
  setLanguageId: (id: number | "") => void;
  selectedTagIds: number[];
  setSelectedTagIds: React.Dispatch<React.SetStateAction<number[]>>;
  disabled?: boolean;
}

export function CourseMetadataForm({
  categoryId,
  setCategoryId,
  skillLevelId,
  setSkillLevelId,
  gradeId,
  setGradeId,
  languageId,
  setLanguageId,
  selectedTagIds,
  setSelectedTagIds,
  disabled = false,
}: CourseMetadataFormProps) {
  const api = useApi();

  // Metadata states & add-new controls with proper typing
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);

  const [skillLevels, setSkillLevels] = useState<SkillLevel[]>([]);
  const [newSkillLevelName, setNewSkillLevelName] = useState<string>("");
  const [isAddingSkillLevel, setIsAddingSkillLevel] = useState<boolean>(false);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [newGradeValue, setNewGradeValue] = useState<string>("");
  const [isAddingGrade, setIsAddingGrade] = useState<boolean>(false);

  const [languages, setLanguages] = useState<Language[]>([]);
  const [newLanguageName, setNewLanguageName] = useState<string>("");
  const [isAddingLanguage, setIsAddingLanguage] = useState<boolean>(false);

  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  const [isAddingTag, setIsAddingTag] = useState<boolean>(false);

  useEffect(() => {
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
  }, []);

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

  const toggleTag = (id: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value) || "")}
          disabled={disabled || isAddingCategory}
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
            disabled={disabled || isAddingCategory}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            onClick={addCategory}
            disabled={disabled || isAddingCategory || !newCategoryName.trim()}
            className="btn btn-primary"
          >
            {isAddingCategory ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Skill Level */}
      <div>
        <label className="block font-semibold mb-1">Skill Level</label>
        <select
          value={skillLevelId}
          onChange={(e) => setSkillLevelId(Number(e.target.value) || "")}
          disabled={disabled || isAddingSkillLevel}
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
            disabled={disabled || isAddingSkillLevel}
            onChange={(e) => setNewSkillLevelName(e.target.value)}
          />
          <button
            onClick={addSkillLevel}
            disabled={disabled || isAddingSkillLevel || !newSkillLevelName.trim()}
            className="btn btn-primary"
          >
            {isAddingSkillLevel ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Grade */}
      <div>
        <label className="block font-semibold mb-1">Grade</label>
        <select
          value={gradeId}
          onChange={(e) => setGradeId(Number(e.target.value) || "")}
          disabled={disabled || isAddingGrade}
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
            disabled={disabled || isAddingGrade}
            onChange={(e) => setNewGradeValue(e.target.value)}
          />
          <button
            onClick={addGrade}
            disabled={disabled || isAddingGrade || !newGradeValue.trim()}
            className="btn btn-primary"
          >
            {isAddingGrade ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block font-semibold mb-1">Language</label>
        <select
          value={languageId}
          onChange={(e) => setLanguageId(Number(e.target.value) || "")}
          disabled={disabled || isAddingLanguage}
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
            disabled={disabled || isAddingLanguage}
            onChange={(e) => setNewLanguageName(e.target.value)}
          />
          <button
            onClick={addLanguage}
            disabled={disabled || isAddingLanguage || !newLanguageName.trim()}
            className="btn btn-primary"
          >
            {isAddingLanguage ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-semibold mb-1">Tags</label>
        <div className="flex flex-wrap max-h-40 overflow-auto gap-2 min-h-[5rem] border rounded p-2 bg-gray-50">
          {tags.map((tag) => (
            <label key={tag.id} className="inline-flex items-center cursor-pointer mr-2">
              <input
                type="checkbox"
                checked={selectedTagIds.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
                disabled={disabled || isAddingTag}
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
            disabled={disabled || isAddingTag}
            onChange={(e) => setNewTagName(e.target.value)}
          />
          <button
            onClick={addTag}
            disabled={disabled || isAddingTag || !newTagName.trim()}
            className="btn btn-primary"
          >
            {isAddingTag ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
