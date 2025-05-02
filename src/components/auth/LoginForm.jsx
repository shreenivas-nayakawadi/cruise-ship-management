import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const { login,currentUser } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  setError("");
                  setLoading(true);
                  await login(email, password);
                  navigate(`/${currentUser.role}Dashboard`);
            } catch (err) {
                  setError(err.message);
                  setLoading(false);
            }
      };

      return (
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

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                                setPassword(e.target.value)
                                          }
                                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                          placeholder="••••••••"
                                    />
                              </div>

                              <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                          <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                          />
                                          <label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-sm text-gray-700"
                                          >
                                                Remember me
                                          </label>
                                    </div>

                                    <div className="text-sm">
                                          <Link
                                                to="/forgot-password"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                                Forgot password?
                                          </Link>
                                    </div>
                              </div>

                              <div>
                                    <button
                                          type="submit"
                                          disabled={loading}
                                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          {loading ? (
                                                <>
                                                      <svg
                                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <circle
                                                                  className="opacity-25"
                                                                  cx="12"
                                                                  cy="12"
                                                                  r="10"
                                                                  stroke="currentColor"
                                                                  strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                  className="opacity-75"
                                                                  fill="currentColor"
                                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                      </svg>
                                                      Signing in...
                                                </>
                                          ) : (
                                                "Sign in"
                                          )}
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
      );
};

export default LoginForm;
