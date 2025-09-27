import React, { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/student/components/ui/button";
import { Input } from "@/student/components/ui/input";
import { Label } from "@/student/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/student/components/ui/card";
import { Alert, AlertDescription } from "@/student/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, GraduationCap, Sparkles, BookOpen, Trophy } from "lucide-react";

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect when user state changes and user is logged in
  useEffect(() => {
    if (user) {
      if (["ADMIN", "SUPERADMIN", "INSTRUCTOR"].includes(user.role)) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(form);
    } catch (err: any) {
      setError(err.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/loginBg.png')",
          opacity: 0.18,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12">
          <div className="max-w-md w-full">
            <div className="flex flex-col items-center text-center mb-12">
              <img
                src="/logo.jpeg"
                alt="App Logo"
                className="w-28 h-auto mb-3 object-contain"
                loading="lazy"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Rohtak Guided Learning Tracker
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome back to your
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                learning journey
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Continue where you left off and unlock new skills!
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="ml-4 text-gray-700">Learn everyday</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <span className="ml-4 text-gray-700">Track your progress</span>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-green-600" />
                </div>
                <span className="ml-4 text-gray-700">Stay on track, you are doing great!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="text-center p-6 pt-8 sm:p-8">
                <div className="flex flex-col items-center justify-center mb-4 lg:hidden">
                  <img
                    src="/logo.jpeg"
                    alt="App Logo"
                    className="w-24 h-auto mb-3 object-contain"
                    loading="lazy"
                  />
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-2">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Rohtak Guided Learning Tracker
                  </h1>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600 text-base pt-1">
                  Sign in to continue your learning journey
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
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
                        className="pl-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  {error && (
                    <Alert className="border-red-200 bg-red-50" role="alert" aria-live="assertive">
                      <AlertDescription className="text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/signup"
                      className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Sign up here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;