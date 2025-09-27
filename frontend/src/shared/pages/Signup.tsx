import React, { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/student/components/ui/button";
import { Input } from "@/student/components/ui/input";
import { Label } from "@/student/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/student/components/ui/card";
import { Alert, AlertDescription } from "@/student/components/ui/alert";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Trophy,
  Users,
  Building,
  School,
} from "lucide-react";
import { useApi } from "@/api/index";

interface FilterOptions {
  blocks: Array<{ id: number; name: string }>;
  schools: Array<{ id: number; name: string; blockId: number }>;
  grades: Array<{ id: number; value: string }>;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const api = useApi();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    blockId: "",
    schoolId: "",
    gradeId: "",
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        setLoadingOptions(true);
        const response = await api.get("/auth/signup-options");
        setFilterOptions(response.data);
      } catch (error) {
        console.error("Failed to fetch signup options:", error);
        setError("Failed to load signup options. Please refresh the page.");
      } finally {
        setLoadingOptions(false);
      }
    }

    fetchFilterOptions();
  }, [api]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev, [name]: value };

      if (name === "blockId") {
        newForm.schoolId = "";
        newForm.gradeId = "";
      } else if (name === "schoolId") {
        newForm.gradeId = "";
      }

      return newForm;
    });
  };

  const getFilteredSchools = () => {
    if (!filterOptions?.schools || !form.blockId) return [];
    return filterOptions.schools.filter((school) => school.blockId === parseInt(form.blockId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.blockId || !form.schoolId || !form.gradeId) {
      setError("Please select your block, school, and grade");
      return;
    }

    setIsLoading(true);
    try {
      const signupData = {
        name: form.name,
        email: form.email,
        password: form.password,
        organizationUnitId: parseInt(form.schoolId),
        gradeId: parseInt(form.gradeId),
      };

      await signup(signupData);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingOptions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading signup options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/signupBg.png')",
          opacity: 0.18,
        }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-lg mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="text-center p-6 pt-8 sm:p-8">
                <div className="flex flex-col items-center justify-center mb-4">
                  <img
                    src="/logo.jpeg"
                    alt="App Logo"
                    className="w-24 h-auto mb-3 object-contain"
                    loading="lazy"
                  />
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      Rohtak Guided Learning Tracker
                    </h1>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-600 text-base pt-1">
                  Step into a world of learning and growth
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="pl-10 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        type="email"
                        required
                        className="pl-10 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10 h-12 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockId">Select Block</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="blockId"
                        name="blockId"
                        value={form.blockId}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full h-12 border border-input bg-background rounded-xl appearance-none cursor-pointer"
                      >
                        <option value="">Choose your block</option>
                        {filterOptions?.blocks.map((block) => (
                          <option key={block.id} value={block.id}>
                            {block.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolId">Select School</Label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="schoolId"
                        name="schoolId"
                        value={form.schoolId}
                        onChange={handleChange}
                        required
                        disabled={!form.blockId}
                        className="pl-10 w-full h-12 border border-input bg-background rounded-xl appearance-none cursor-pointer disabled:bg-muted disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {!form.blockId ? "Select block first" : "Choose your school"}
                        </option>
                        {getFilteredSchools().map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradeId">Select Grade</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        id="gradeId"
                        name="gradeId"
                        value={form.gradeId}
                        onChange={handleChange}
                        required
                        className="pl-10 w-full h-12 border border-input bg-background rounded-xl appearance-none cursor-pointer"
                      >
                        <option value="">Choose your grade</option>
                        {filterOptions?.grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>
                            Grade {grade.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  {error && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-blue-700"
                    >
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="flex items-center mb-10">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl shadow-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Rohtak Guided Learning Tracker
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Start your
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                learning adventure
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Join a community of passionate learners and transform your skills!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex-center">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="ml-4 text-gray-700">Explore skill based courses</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <span className="ml-4 text-gray-700">Learn at your pace</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex-center">
                  <Trophy className="h-4 w-4 text-purple-600" />
                </div>
                <span className="ml-4 text-gray-700">One step closer to become a pro!</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center mb-2">
                <Sparkles className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-gray-800">Ready to Begin?</span>
              </div>
              <p className="text-sm text-gray-600">
                Your journey of a thousand miles begins with a single step!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
