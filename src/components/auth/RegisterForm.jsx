import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [role, setRole] = useState("voyager");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const { register, currentUser } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  setError("");
                  setLoading(true);
                  const user = await register(email, password, role);
                  navigate(`/${user.role}/dashboard`);
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
                                    Create Account
                              </h1>
                              <p className="text-gray-500 mt-2">
                                    Join our cruise experience
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
                                          minLength="6"
                                          value={password}
                                          onChange={(e) =>
                                                setPassword(e.target.value)
                                          }
                                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                          placeholder="At least 6 characters"
                                    />
                              </div>

                              <div>
                                    <label
                                          htmlFor="role"
                                          className="block text-sm font-medium text-gray-700"
                                    >
                                          Account Type
                                    </label>
                                    <select
                                          id="role"
                                          value={role}
                                          onChange={(e) =>
                                                setRole(e.target.value)
                                          }
                                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                    >
                                          <option value="voyager">
                                                Passenger
                                          </option>
                                          <option value="admin">
                                                Administrator
                                          </option>
                                          <option value="manager">
                                                Crew Manager
                                          </option>
                                          <option value="head-cook">
                                                Head Chef
                                          </option>
                                          <option value="supervisor">
                                                Supervisor
                                          </option>
                                    </select>
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
                                                      Creating account...
                                                </>
                                          ) : (
                                                "Create Account"
                                          )}
                                    </button>
                              </div>
                        </form>

                        <div className="mt-6 text-center">
                              <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link
                                          to="/login"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                          Sign in
                                    </Link>
                              </p>
                        </div>
                  </div>
            </div>
      );
};

export default RegisterForm;
