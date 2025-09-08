import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/student/components/ui/card";
import { Button } from "@/student/components/ui/button";
import { Badge } from "@/student/components/ui/badge";
import { Progress } from "@/student/components/ui/progress";
import {
  BookOpen,
  Play,
  CheckCircle,
  Trophy,
  Filter,
  Search,
  SortAsc,
  MoreHorizontal,
  Bookmark,
  Clock,
} from "lucide-react";
import { cn } from "@/student/lib/utils";
import { Link } from "react-router-dom";
import DashboardLayout from "@/student/components/DashboardLayout";
import { courseAPI } from "@/api/courseAPI";
import { useApi } from '@/api/index';
import { metadataAPI } from '@/api/metadataAPI';
import { formatDuration } from "@/utils/format";

export default function Courses() {
  const api = useApi();

  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [sortBy, setSortBy] = useState<"progress" | "name" | "date">("progress");
  const [filterBy, setFilterBy] = useState<"all" | "in-progress" | "completed" | "not-started">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [skillLevels, setSkillLevels] = useState<{ id: number; level: string }[]>([]);
  const [grades, setGrades] = useState<{ id: number; value: string }[]>([]);
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<number | undefined>(undefined);
  const [selectedGrade, setSelectedGrade] = useState<number | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<number | undefined>(undefined);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [assignedFilter, setAssignedFilter] = useState<"all" | "assigned" | "unassigned">("all");



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters: any = {
          categoryId: selectedCategory,
          skillLevelId: selectedSkillLevel,
          gradeId: selectedGrade,
          languageId: selectedLanguage,
          tagIds: selectedTagIds.length ? selectedTagIds : undefined,
          search: searchQuery.trim() || undefined,
        };

        if (assignedFilter === "assigned") filters.assigned = true;
        else if (assignedFilter === "unassigned") filters.assigned = false;

        const response = await courseAPI.getAllCourses(api, 1, limit, filters);
        setAllCourses(response.data);
        setHasMore(response.page < response.totalPages);
        setPage(1);
      } catch (err: any) {
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [
    api,
    limit,
    selectedCategory,
    selectedSkillLevel,
    selectedGrade,
    selectedLanguage,
    selectedTagIds,
    assignedFilter,
    searchQuery,
  ]);


  useEffect(() => {
    async function fetchMetadata() {
      try {
        const [cats, skills, grans, langs, tgs] = await Promise.all([
          metadataAPI.getCategories(),
          metadataAPI.getSkillLevels(),
          metadataAPI.getGrades(),
          metadataAPI.getLanguages(),
          metadataAPI.getTags(),
        ]);
        setCategories(cats);
        setSkillLevels(skills);
        setGrades(grans);
        setLanguages(langs);
        setTags(tgs);
      } catch (err) {
        console.error("Failed to load metadata:", err);
      }
    }
    fetchMetadata();
  }, [api]);


  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);


  const sortCourses = (courses: typeof allCourses) => {
    return [...courses].sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "name":
          return a.title.localeCompare(b.title);
        case "date":
          const dateA = new Date(a.assignedAt || a.createdAt).getTime();
          const dateB = new Date(b.assignedAt || b.createdAt).getTime();
          return dateB - dateA;
        default:
          return 0;
      }
    });
  };


  const filterCourses = (courses: typeof allCourses) => {
    let filtered = courses;

    if (filterBy !== "all") {
      filtered = filtered.filter(course => course.status === filterBy);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query)
      );
    }
    return filtered;
  };

  const getStatusCount = (status: string) => {
    return allCourses.filter(c => c.status === status).length;
  };

  const filteredAndSortedCourses = sortCourses(filterCourses(allCourses));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return null;
    }
  };

  const getColorClass = (progress: number) => {
    if (progress === 100) return { color: "from-emerald-100 to-green-100", border: "border-emerald-300" };
    if (progress > 0) return { color: "from-blue-100 to-indigo-100", border: "border-blue-300" };
    return { color: "from-gray-100 to-slate-100", border: "border-gray-300" };
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-6">
          <p className="text-gray-600 text-lg">Loading courses...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-6 text-red-600">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-100/20 via-blue-100/30 to-teal-100/20 animate-pulse pointer-events-none"></div>
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
        <div className="relative z-10 space-y-8 p-6">
          {/* Course Library Header */}
          <div className="text-center py-12 mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative p-4 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl shadow-2xl">
                <Bookmark className="h-8 w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-bounce"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight pb-2 drop-shadow-sm">
                Course Library
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover • Learn • Excel!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/90 font-medium mb-1">Total Courses</p>
                    <p className="text-3xl font-bold text-white drop-shadow-lg">{allCourses.length}</p>
                  </div>
                  <div className="relative">
                    <BookOpen className="h-10 w-10 text-white/80 drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-emerald-200 rounded-full animate-ping"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-teal-200 rounded-full animate-bounce"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/90 font-medium mb-1">Completed</p>
                    <p className="text-3xl font-bold text-white drop-shadow-lg">
                      {allCourses.filter(c => c.status === "completed").length}
                    </p>
                  </div>
                  <div className="relative">
                    <CheckCircle className="h-10 w-10 text-white/80 drop-shadow-lg" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="absolute top-1 left-3 w-1 h-1 bg-yellow-200 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-orange-200 rounded-full animate-bounce"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/90 font-medium mb-1">In Progress</p>
                    <p className="text-3xl font-bold text-white drop-shadow-lg">
                      {allCourses.filter(c => c.status === "in-progress").length}
                    </p>
                  </div>
                  <div className="relative">
                    <Play className="h-10 w-10 text-white/80 drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-200 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden bg-gradient-to-br from-violet-400 via-purple-500 to-pink-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="absolute top-3 right-1 w-1 h-1 bg-pink-200 rounded-full animate-ping"></div>
              <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-violet-200 rounded-full animate-pulse"></div>
              <CardContent className="relative p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/90 font-medium mb-1">Avg. Progress</p>
                    <p className="text-3xl font-bold text-white drop-shadow-lg">
                      {allCourses.length
                        ? Math.round(allCourses.reduce((sum, c) => sum + c.progress, 0) / allCourses.length)
                        : 0}%
                    </p>
                  </div>
                  <div className="relative">
                    <Trophy className="h-10 w-10 text-white/80 drop-shadow-lg" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-violet-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-violet-400" />
              <input
                type="text"
                placeholder="Search courses, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border-2 border-violet-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-200 focus:border-violet-400 bg-white/90 backdrop-blur-sm shadow-xl text-lg placeholder:text-violet-300 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-100/30 via-purple-100/20 to-pink-100/30 rounded-2xl -z-10 blur-sm"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-violet-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                <Filter className="h-5 w-5 text-violet-500" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="border-0 bg-transparent text-violet-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Courses</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-teal-200 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <SortAsc className="h-5 w-5 text-teal-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border-0 bg-transparent text-teal-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="progress">Sort by Progress</option>
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date Enrolled</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="inline-flex rounded-md bg-white/80 border border-violet-300 shadow-lg backdrop-blur-sm p-1">
              {["all", "assigned", "unassigned"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAssignedFilter(filter as any)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${assignedFilter === filter
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-violet-700 hover:bg-violet-200"
                    }`}
                >
                  {filter === "all"
                    ? "All Courses"
                    : filter === "assigned"
                      ? "Assigned Courses"
                      : "Unassigned Courses"}
                </button>
              ))}
            </div>


            <select
              value={selectedCategory ?? ""}
              onChange={e => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedSkillLevel ?? ""}
              onChange={e => setSelectedSkillLevel(e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border rounded"
            >
              <option value="">All Skill Levels</option>
              {skillLevels.map(sl => (
                <option key={sl.id} value={sl.id}>{sl.level}</option>
              ))}
            </select>

            <select
              value={selectedGrade ?? ""}
              onChange={e => setSelectedGrade(e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border rounded"
            >
              <option value="">All Grades</option>
              {grades.map(gr => (
                <option key={gr.id} value={gr.id}>{gr.value}</option>
              ))}
            </select>

            <select
              value={selectedLanguage ?? ""}
              onChange={e => setSelectedLanguage(e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 border rounded"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 max-w-xs max-h-24 overflow-auto border p-2 rounded">
              {tags.map(tag => (
                <label key={tag.id} className="inline-flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTagIds.includes(tag.id)}
                    onChange={e => {
                      if (e.target.checked) setSelectedTagIds([...selectedTagIds, tag.id]);
                      else setSelectedTagIds(selectedTagIds.filter(id => id !== tag.id));
                    }}
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>


          {/* Course Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedCourses.map((course) => {
              const getColorClass = (progress: number) => {
                if (progress === 100) return {
                  bg: "from-emerald-400 via-emerald-500 to-teal-600",
                  accent: "emerald",
                  statusBg: "bg-emerald-500",
                  progressBg: "from-emerald-500 to-emerald-600"
                };
                if (progress > 0) return {
                  bg: "from-blue-400 via-indigo-500 to-purple-600",
                  accent: "blue",
                  statusBg: "bg-blue-500",
                  progressBg: "from-blue-500 to-purple-500"
                };
                return {
                  bg: "from-slate-300 via-gray-400 to-slate-500",
                  accent: "gray",
                  statusBg: "bg-slate-500",
                  progressBg: "from-slate-500 to-gray-500"
                };
              };
              const { bg, accent, statusBg, progressBg } = getColorClass(course.progress);
              return (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card
                    // FIX: Added flex, flex-col, and h-full to make the card a flex container that fills its grid cell
                    className="flex flex-col h-full relative overflow-hidden bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer group hover:-translate-y-3 hover:scale-105 transform-gpu"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 group-hover:from-white/98 group-hover:via-white/95 group-hover:to-white/90 transition-all duration-500"></div>
                    <CardContent className="relative p-0 flex flex-col flex-grow">
                      {/* Course Thumbnail */}
                      <div className="relative">
                        <div className="w-full h-56 rounded-t-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

                          {course.thumbnailUrl ? (
                            <img
                              src={course.thumbnailUrl}
                              alt={`${course.title} thumbnail`}
                              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-7xl select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">📚</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent group-hover:from-black/40 transition-all duration-500"></div>

                          {/* Progress Badge */}
                          <div className="absolute top-4 right-4">
                            <div className={`bg-gradient-to-r ${progressBg} text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20`}>
                              {course.progress}% Complete
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-4 left-4">
                            <div
                              className={cn(
                                "px-3 py-2 rounded-2xl text-sm font-bold border-2 backdrop-blur-sm shadow-lg",
                                course.status === "completed"
                                  ? "bg-emerald-500 text-white border-emerald-300"
                                  : course.status === "in-progress"
                                    ? "bg-blue-500 text-white border-blue-300"
                                    : "bg-slate-500 text-white border-gray-300"
                              )}
                            >
                              {course.status === "completed"
                                ? "✓ Completed"
                                : course.status === "in-progress"
                                  ? "◗ In Progress"
                                  : "○ Not Started"}
                            </div>
                          </div>

                          {course.status === "completed" && (
                            <div className="absolute bottom-4 right-4">
                              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 text-white p-3 rounded-2xl shadow-lg animate-pulse">
                                <Trophy className="h-5 w-5" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {course.isAssigned && (
                        <Badge className="bg-indigo-100 text-indigo-800 absolute bottom-4 left-4 
    rounded-lg px-2 py-1 text-xs font-semibold z-20">
                          Assigned
                        </Badge>
                      )}

                      {/* Course Content */}
                      {/* FIX: Added flex, flex-col, and flex-grow to make this section fill available space */}
                      <div className="p-7 flex flex-col flex-grow">
                        {/* FIX: Added flex-grow to this inner div to push the buttons to the bottom */}
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-slate-900 text-xl group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                              {course.title}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-600 mb-5 flex items-center font-medium">
                            <span className="inline-block w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mr-2"></span>
                            {course.createdBy || "Unknown"}
                          </p>
                          
                          <div className="relative mb-2">
                            <Progress
                              value={course.progress}
                              className="h-3 rounded-full bg-slate-200 shadow-inner"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${progressBg} rounded-full opacity-90 transition-all duration-300`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <div className="text-sm text-slate-700 mb-4 font-medium">
                            {course.progress}% Complete • {formatDuration(course.totalWatchTime)} watched
                          </div>

                          <p className="text-slate-700 mb-5 line-clamp-3 leading-relaxed">{course.description}</p>

                          <div className="flex justify-between text-sm text-slate-500 mb-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-3">
                            <span className="flex items-center font-medium">
                              <BookOpen className="h-4 w-4 mr-2 text-violet-500" />
                              {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span className="flex items-center font-medium">
                              <Clock className="h-4 w-4 mr-2 text-teal-500" />
                              {formatDuration(course.totalDuration)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons (will now be at the bottom) */}
                        {course.status === "completed" ? (
                          <div className="space-y-3">
                            <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm shadow-xl hover:shadow-2xl transition-all duration-300 py-3 font-semibold">
                              <Link to={`/courses/${course.id}/video`}>
                                <BookOpen className="h-5 w-5 mr-2" />
                                Revise Course
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 py-3 font-semibold text-base group-hover:scale-105">
                            <Link to={`/courses/${course.id}`}>
                              <Play className="h-5 w-5 mr-2" />
                              {course.status === "not-started" ? "Start Learning" : "Continue Learning"}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="text-center py-6 text-gray-600">
              Loading more courses...
            </div>
          )}

          {/* End of list message */}
          {!hasMore && !loading && (
            <div className="text-center py-6 text-gray-600">
              You have reached the end.
            </div>
          )}

          {filteredAndSortedCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-2xl">
                  <BookOpen className="h-12 w-12 text-violet-500" />
                </div>
                <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full opacity-40 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">No courses found</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">Try adjusting your filters or search terms to discover more amazing courses ✨</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}