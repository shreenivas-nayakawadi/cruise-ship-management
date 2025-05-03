import { useNavigate } from "react-router-dom";
import { FiCompass } from "react-icons/fi";

const NotFound = () => {
      const navigate = useNavigate();

      return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="flex justify-center text-blue-500 mb-4">
                              <FiCompass className="text-5xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                              404 - Page Not Found
                        </h1>
                        <p className="text-gray-600 mb-6">
                              The page you're looking for doesn't exist or has
                              been moved.
                        </p>
                        <div className="flex justify-center space-x-4">
                              <button
                                    onClick={() => navigate(-1)}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                              >
                                    Go Back
                              </button>
                              <button
                                    onClick={() => navigate("/")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                              >
                                    Return Home
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default NotFound;
