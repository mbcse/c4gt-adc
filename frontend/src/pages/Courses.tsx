import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Play,
  Star,
  Calendar,
  User,
  Clock,
  CheckCircle,
  Trophy,
  Filter,
  Search,
  SortAsc,
  MoreHorizontal,
  Award,
  Target,
  Bookmark,
  Library,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

export default function Courses() {
  const [sortBy, setSortBy] = useState<"progress" | "name" | "date">("progress");
  const [filterBy, setFilterBy] = useState<"all" | "in-progress" | "completed" | "not-started">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Ananya Mehta",
    instructorAvatar: "AM",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    duration: "8 weeks",
    difficulty: "Advanced",
    rating: 4.8,
    enrolledDate: "15 Jan 2024",
    lastActivity: "2 hours ago",
    color: "from-blue-100 to-indigo-100",
    borderColor: "border-blue-200",
    image: "💻",
    tags: ["React", "JavaScript", "Frontend"],
    status: "in-progress",
    nextLesson: "State Management with Redux",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Rohan Kapoor",
    instructorAvatar: "RK",
    progress: 60,
    totalLessons: 16,
    completedLessons: 10,
    duration: "6 weeks",
    difficulty: "Beginner",
    rating: 4.6,
    enrolledDate: "01 Feb 2024",
    lastActivity: "1 day ago",
    color: "from-pink-100 to-rose-100",
    borderColor: "border-pink-200",
    image: "🎨",
    tags: ["Design", "UX", "Figma"],
    status: "in-progress",
    nextLesson: "Color Theory Principles",
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Dr. Nisha Verma",
    instructorAvatar: "NV",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    duration: "12 weeks",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolledDate: "08 Jan 2024",
    lastActivity: "3 days ago",
    color: "from-green-100 to-emerald-100",
    borderColor: "border-green-200",
    image: "📊",
    tags: ["Python", "Data Science", "ML"],
    status: "in-progress",
    nextLesson: "Pandas for Data Analysis",
  },
  {
    id: 4,
    title: "Full-Stack Web Development",
    instructor: "Siddharth Rao",
    instructorAvatar: "SR",
    progress: 100,
    totalLessons: 40,
    completedLessons: 40,
    duration: "16 weeks",
    difficulty: "Advanced",
    rating: 4.7,
    enrolledDate: "01 Oct 2023",
    lastActivity: "1 week ago",
    color: "from-purple-100 to-violet-100",
    borderColor: "border-purple-200",
    image: "🌐",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    status: "completed",
    nextLesson: null,
  },
  {
    id: 5,
    title: "Mobile App Development with React Native",
    instructor: "Neha Singh",
    instructorAvatar: "NS",
    progress: 30,
    totalLessons: 28,
    completedLessons: 8,
    duration: "10 weeks",
    difficulty: "Intermediate",
    rating: 4.5,
    enrolledDate: "15 Feb 2024",
    lastActivity: "5 days ago",
    color: "from-cyan-100 to-blue-100",
    borderColor: "border-cyan-200",
    image: "📱",
    tags: ["React Native", "Mobile", "iOS", "Android"],
    status: "in-progress",
    nextLesson: "Navigation Setup",
  },
  {
    id: 6,
    title: "DevOps and Cloud Computing",
    instructor: "Kunal Thakur",
    instructorAvatar: "KT",
    progress: 90,
    totalLessons: 20,
    completedLessons: 18,
    duration: "8 weeks",
    difficulty: "Advanced",
    rating: 4.8,
    enrolledDate: "01 Dec 2023",
    lastActivity: "Yesterday",
    color: "from-orange-100 to-yellow-100",
    borderColor: "border-orange-200",
    image: "☁️",
    tags: ["AWS", "Docker", "Kubernetes"],
    status: "in-progress",
    nextLesson: "Container Orchestration",
  },
  {
    id: 7,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Aarti Kulkarni",
    instructorAvatar: "AK",
    progress: 0,
    totalLessons: 24,
    completedLessons: 0,
    duration: "10 weeks",
    difficulty: "Intermediate",
    rating: 4.9,
    enrolledDate: "20 Feb 2024",
    lastActivity: "Never",
    color: "from-indigo-100 to-purple-100",
    borderColor: "border-indigo-200",
    image: "🤖",
    tags: ["ML", "Python", "AI"],
    status: "not-started",
    nextLesson: "Introduction to ML",
  },
  {
    id: 8,
    title: "Cybersecurity Essentials",
    instructor: "Ishaan Desai",
    instructorAvatar: "ID",
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    duration: "6 weeks",
    difficulty: "Beginner",
    rating: 4.6,
    enrolledDate: "15 Nov 2023",
    lastActivity: "2 weeks ago",
    color: "from-red-100 to-pink-100",
    borderColor: "border-red-200",
    image: "🔒",
    tags: ["Security", "Network", "Ethical Hacking"],
    status: "completed",
    nextLesson: null,
  },
];


  const sortCourses = (courses: typeof allCourses) => {
    return [...courses].sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.progress - a.progress;
        case "name":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime();
        default:
          return 0;
      }
    });
  };

  const filterCourses = (courses: typeof allCourses) => {
    let filtered = courses;

    // Filter by status
    if (filterBy !== "all") {
      filtered = filtered.filter(course => course.status === filterBy);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Clean Welcoming Background with Static Circle Graphics */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-indigo-200 rounded-full opacity-20"></div>
        <div className="absolute top-20 right-1/2 w-28 h-28 bg-purple-300 rounded-full opacity-15"></div>
        <div className="absolute bottom-40 right-10 w-18 h-18 bg-blue-400 rounded-full opacity-25"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-indigo-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-22 h-22 bg-purple-300 rounded-full opacity-20"></div>
        <div className="absolute top-2/3 left-10 w-14 h-14 bg-blue-300 rounded-full opacity-25"></div>
        <div className="absolute bottom-10 left-1/2 w-26 h-26 bg-indigo-300 rounded-full opacity-18"></div>

       <div className="relative z-10 space-y-6 p-6">
  {/* Course Library Header */}
  <div className="text-center py-8 mb-6">
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
        <Bookmark className="h-6 w-6 md:h-8 md:w-8 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight pb-2">
        Course Library
      </h1>
    </div>
  </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Courses</p>
                  <p className="text-2xl font-bold text-blue-900">{allCourses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">
                    {allCourses.filter(c => c.status === "completed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-yellow-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">In Progress</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {allCourses.filter(c => c.status === "in-progress").length}
                  </p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg. Progress</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.round(allCourses.reduce((sum, course) => sum + course.progress, 0) / allCourses.length)}%
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, instructors, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="progress">Sort by Progress</option>
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date Enrolled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <Card
              key={course.id}
              className={cn(
                "bg-white border-2 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2",
                course.status === "completed"
                  ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-green-50 hover:border-emerald-400"
                  : course.status === "in-progress"
                  ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-400"
                  : "border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-gray-400"
              )}
            >
              <CardContent className="p-0">
                {/* Course Thumbnail */}
                <div className="relative">
                  <div className={`w-full h-48 bg-gradient-to-br ${course.color} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-6xl z-10">{course.image}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Progress Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                        {course.progress}% Complete
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-bold border-2",
                        course.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : course.status === "in-progress"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                      )}>
                        {course.status === "completed" ? "✓ Completed" :
                         course.status === "in-progress" ? "◗ In Progress" :
                         "○ Not Started"}
                      </div>
                    </div>
                    
                    {/* Completion Badge for completed courses */}
                    {course.status === "completed" && (
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-green-500 text-white p-1 rounded-full">
                          <Trophy className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-700 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Avatar className="h-5 w-5 mr-2">
                          <AvatarFallback className="text-xs bg-teal-100 text-teal-700">
                            {course.instructorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        {course.instructor}
                      </div>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {course.rating}
                      </div>
                    </div>
                    
                    {/* Course Meta */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-3 mb-4">
                    <div className="relative">
                      <Progress value={course.progress} className="h-2 bg-gray-200" />
                      <div
                        className={cn(
                          "absolute top-0 left-0 h-2 rounded-full transition-all duration-300",
                          course.status === "completed"
                            ? "bg-gradient-to-r from-emerald-500 to-green-500"
                            : course.status === "in-progress"
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                            : "bg-gradient-to-r from-gray-400 to-slate-400"
                        )}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.lastActivity}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Next Lesson or Completion Status */}
                  {course.nextLesson && (
                    <div className="mb-4 p-2 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">Next: {course.nextLesson}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {course.status === "completed" ? (
                      <>
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm shadow-md hover:shadow-lg transition-all duration-300">
                          <Trophy className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm shadow-md hover:shadow-lg transition-all duration-300">
                          <Link to={`/courses/${course.id}/video`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Revise Course
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <div className="flex gap-2">
                        <Button asChild className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                          <Link to={`/courses/${course.id}/video`}>
                            <Play className="h-4 w-4 mr-2" />
                            {course.status === "not-started" ? "Start Course" : "Continue"}
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more courses.</p>
          </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}
