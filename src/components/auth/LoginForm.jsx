import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";

const LoginForm = () => {
      const [email, setEmail] = useState("voyager@voyager.com");
      const [password, setPassword] = useState("123456");
      const [error, setError] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false);
      const { login } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  setIsSubmitting(true);
                  setError("");
                  const user = await login(email, password);

                  // Navigate immediately without waiting
                  navigate(`/${user.role}/dashboard`, { replace: true });
            } catch (err) {
                  setError(err.message);
                  setIsSubmitting(false);
            }
      };

      return (
            <>
                  <Navbar />
                  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                              <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-indigo-600">
                                          Welcome Back
                                    </h1>
                                    <p className="text-gray-500 mt-2">
                                          Sign in to your cruise account
                                    </p>
                              </div>

                              {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                          {error}
                                    </div>
                              )}

                              <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                              >
                                    <div>
                                          <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                          >
                                                Email Address
                                          </label>
                                          <input
                                                type="email"
                                                id="email"
                                                required
                                                value={email}
                                                onChange={(e) =>
                                                      setEmail(e.target.value)
                                                }
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="your@email.com"
                                          />
                                    </div>

                                    <div>
                                          <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700"
                                          >
                                                Password
                                          </label>
                                          <input
                                                type="password"
                                                id="password"
                                                required
                                                value={password}
                                                onChange={(e) =>
                                                      setPassword(
                                                            e.target.value
                                                      )
                                                }
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="••••••••"
                                          />
                                    </div>

                                    <div>
                                          <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                                      isSubmitting
                                                            ? "bg-blue-400"
                                                            : "bg-indigo-600 hover:bg-indigo-700"
                                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                                          >
                                                {isSubmitting
                                                      ? "Signing in..."
                                                      : "Sign in"}
                                          </button>
                                    </div>
                              </form>

                              <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                          Don't have an account?{" "}
                                          <Link
                                                to="/register"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                                Create one
                                          </Link>
                                    </p>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default LoginForm;
