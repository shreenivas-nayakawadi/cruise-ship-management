// import React, { useState, useEffect } from "react";
// import { FiFilm, FiEdit, FiTrash2, FiPlus, FiSave, FiX } from "react-icons/fi";
// import { useAdminContext } from "../../context/AdminContext";
// import AdminNavbar from "./AdminNavbar";

// const AdminMovies = () => {
//       const {
//             movies,
//             loading,
//             fetchMovies,
//             addMovie,
//             updateMovie,
//             deleteMovie,
//       } = useAdminContext();

//       const [isAdding, setIsAdding] = useState(false);
//       const [editingId, setEditingId] = useState(null);
//       const [formData, setFormData] = useState({
//             title: "",
//             time: "18:00",
//             seats: 50,
//       });

//       useEffect(() => {
//             fetchMovies();
//       }, []);

//       const handleInputChange = (e) => {
//             const { name, value } = e.target;
//             setFormData((prev) => ({
//                   ...prev,
//                   [name]: name === "seats" ? parseInt(value) || 0 : value,
//             }));
//       };

//       const handleAddMovie = async () => {
//             const { success } = await addMovie(formData);
//             if (success) {
//                   setIsAdding(false);
//                   setFormData({ title: "", time: "18:00", seats: 50 });
//             }
//       };

//       const handleUpdateMovie = async (id) => {
//             const { success } = await updateMovie(id, formData);
//             if (success) {
//                   setEditingId(null);
//                   setFormData({ title: "", time: "18:00", seats: 50 });
//             }
//       };

//       const handleEditClick = (movie) => {
//             setEditingId(movie.id);
//             setFormData({
//                   title: movie.title,
//                   time: movie.time,
//                   seats: movie.seats,
//             });
//       };

//       const handleCancel = () => {
//             setIsAdding(false);
//             setEditingId(null);
//             setFormData({ title: "", time: "18:00", seats: 50 });
//       };

//       return (
//             <>
//                   <AdminNavbar />
//                   <div className="container mx-auto px-4 py-6">
//                         <div className="flex justify-between items-center mb-6">
//                               <h1 className="text-2xl font-bold text-gray-800">
//                                     Movie Management
//                               </h1>
//                               <button
//                                     onClick={() => setIsAdding(true)}
//                                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
//                               >
//                                     <FiPlus className="mr-2" />
//                                     Add Movie
//                               </button>
//                         </div>

//                         {/* Add New Movie Form */}
//                         {isAdding && (
//                               <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//                                     <h2 className="text-lg font-semibold mb-4">
//                                           Add New Movie
//                                     </h2>
//                                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                                           <div className="md:col-span-2">
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                       Title
//                                                 </label>
//                                                 <input
//                                                       type="text"
//                                                       name="title"
//                                                       value={formData.title}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="w-full p-2 border border-gray-300 rounded"
//                                                       placeholder="Movie title"
//                                                 />
//                                           </div>
//                                           <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                       Showtime
//                                                 </label>
//                                                 <select
//                                                       name="time"
//                                                       value={formData.time}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="w-full p-2 border border-gray-300 rounded"
//                                                 >
//                                                       <option value="10:00">
//                                                             10:00 AM
//                                                       </option>
//                                                       <option value="13:00">
//                                                             1:00 PM
//                                                       </option>
//                                                       <option value="16:00">
//                                                             4:00 PM
//                                                       </option>
//                                                       <option value="18:00">
//                                                             6:00 PM
//                                                       </option>
//                                                       <option value="20:30">
//                                                             8:30 PM
//                                                       </option>
//                                                       <option value="22:00">
//                                                             10:00 PM
//                                                       </option>
//                                                 </select>
//                                           </div>
//                                           <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                                       Seats
//                                                 </label>
//                                                 <input
//                                                       type="number"
//                                                       name="seats"
//                                                       value={formData.seats}
//                                                       onChange={
//                                                             handleInputChange
//                                                       }
//                                                       className="w-full p-2 border border-gray-300 rounded"
//                                                       min="1"
//                                                 />
//                                           </div>
//                                     </div>
//                                     <div className="flex justify-end mt-4 space-x-2">
//                                           <button
//                                                 onClick={handleCancel}
//                                                 className="px-4 py-2 border border-gray-300 rounded flex items-center"
//                                           >
//                                                 <FiX className="mr-2" />
//                                                 Cancel
//                                           </button>
//                                           <button
//                                                 onClick={handleAddMovie}
//                                                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
//                                           >
//                                                 <FiSave className="mr-2" />
//                                                 Save Movie
//                                           </button>
//                                     </div>
//                               </div>
//                         )}

//                         {/* Movies Table */}
//                         <div className="bg-white rounded-lg shadow overflow-hidden">
//                               <table className="min-w-full divide-y divide-gray-200">
//                                     <thead className="bg-gray-50">
//                                           <tr>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                       Title
//                                                 </th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                       Showtime
//                                                 </th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                       Seats
//                                                 </th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                       Actions
//                                                 </th>
//                                           </tr>
//                                     </thead>
//                                     <tbody className="bg-white divide-y divide-gray-200">
//                                           {loading ? (
//                                                 <tr>
//                                                       <td
//                                                             colSpan="4"
//                                                             className="px-6 py-4 text-center"
//                                                       >
//                                                             Loading movies...
//                                                       </td>
//                                                 </tr>
//                                           ) : movies.length === 0 ? (
//                                                 <tr>
//                                                       <td
//                                                             colSpan="4"
//                                                             className="px-6 py-4 text-center"
//                                                       >
//                                                             No movies found
//                                                       </td>
//                                                 </tr>
//                                           ) : (
//                                                 movies.map((movie) => (
//                                                       <tr key={movie.id}>
//                                                             {editingId ===
//                                                             movie.id ? (
//                                                                   <>
//                                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                                               <input
//                                                                                     type="text"
//                                                                                     name="title"
//                                                                                     value={
//                                                                                           formData.title
//                                                                                     }
//                                                                                     onChange={
//                                                                                           handleInputChange
//                                                                                     }
//                                                                                     className="w-full p-1 border border-gray-300 rounded"
//                                                                               />
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                                               <select
//                                                                                     name="time"
//                                                                                     value={
//                                                                                           formData.time
//                                                                                     }
//                                                                                     onChange={
//                                                                                           handleInputChange
//                                                                                     }
//                                                                                     className="w-full p-1 border border-gray-300 rounded"
//                                                                               >
//                                                                                     <option value="10:00">
//                                                                                           10:00
//                                                                                           AM
//                                                                                     </option>
//                                                                                     <option value="13:00">
//                                                                                           1:00
//                                                                                           PM
//                                                                                     </option>
//                                                                                     <option value="16:00">
//                                                                                           4:00
//                                                                                           PM
//                                                                                     </option>
//                                                                                     <option value="18:00">
//                                                                                           6:00
//                                                                                           PM
//                                                                                     </option>
//                                                                                     <option value="20:30">
//                                                                                           8:30
//                                                                                           PM
//                                                                                     </option>
//                                                                                     <option value="22:00">
//                                                                                           10:00
//                                                                                           PM
//                                                                                     </option>
//                                                                               </select>
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                                               <input
//                                                                                     type="number"
//                                                                                     name="seats"
//                                                                                     value={
//                                                                                           formData.seats
//                                                                                     }
//                                                                                     onChange={
//                                                                                           handleInputChange
//                                                                                     }
//                                                                                     className="w-full p-1 border border-gray-300 rounded"
//                                                                                     min="1"
//                                                                               />
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
//                                                                               <button
//                                                                                     onClick={
//                                                                                           handleCancel
//                                                                                     }
//                                                                                     className="text-gray-600 hover:text-gray-900"
//                                                                               >
//                                                                                     <FiX />
//                                                                               </button>
//                                                                               <button
//                                                                                     onClick={() =>
//                                                                                           handleUpdateMovie(
//                                                                                                 movie.id
//                                                                                           )
//                                                                                     }
//                                                                                     className="text-green-600 hover:text-green-900"
//                                                                               >
//                                                                                     <FiSave />
//                                                                               </button>
//                                                                         </td>
//                                                                   </>
//                                                             ) : (
//                                                                   <>
//                                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                                               {
//                                                                                     movie.title
//                                                                               }
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                                               {
//                                                                                     movie.time
//                                                                               }
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                                               {
//                                                                                     movie.seats
//                                                                               }
//                                                                         </td>
//                                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                                               <div className="flex space-x-2">
//                                                                                     <button
//                                                                                           onClick={() =>
//                                                                                                 handleEditClick(
//                                                                                                       movie
//                                                                                                 )
//                                                                                           }
//                                                                                           className="text-blue-600 hover:text-blue-900"
//                                                                                     >
//                                                                                           <FiEdit />
//                                                                                     </button>
//                                                                                     <button
//                                                                                           onClick={() =>
//                                                                                                 deleteMovie(
//                                                                                                       movie.id
//                                                                                                 )
//                                                                                           }
//                                                                                           className="text-red-600 hover:text-red-900"
//                                                                                     >
//                                                                                           <FiTrash2 />
//                                                                                     </button>
//                                                                               </div>
//                                                                         </td>
//                                                                   </>
//                                                             )}
//                                                       </tr>
//                                                 ))
//                                           )}
//                                     </tbody>
//                               </table>
//                         </div>
//                   </div>
//             </>
//       );
// };

// export default AdminMovies;

import React, { useState, useEffect } from "react";
import {
      FiFilm,
      FiEdit,
      FiTrash2,
      FiPlus,
      FiSave,
      FiX,
      FiDollarSign,
} from "react-icons/fi";
import { useAdminContext } from "../../context/AdminContext";
import AdminNavbar from "./AdminNavbar";
import { MdCurrencyRupee } from "react-icons/md";

const AdminMovies = () => {
      const {
            movies,
            loading,
            fetchMovies,
            addMovie,
            updateMovie,
            deleteMovie,
      } = useAdminContext();

      const [isAdding, setIsAdding] = useState(false);
      const [editingId, setEditingId] = useState(null);
      const [formData, setFormData] = useState({
            title: "",
            time: "18:00",
            seats: 50,
            price: 8.99,
      });

      useEffect(() => {
            fetchMovies();
      }, []);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                  ...prev,
                  [name]:
                        name === "seats" || name === "price"
                              ? parseFloat(value) || 0
                              : value,
            }));
      };

      const handleAddMovie = async () => {
            const { success } = await addMovie(formData);
            if (success) {
                  setIsAdding(false);
                  setFormData({
                        title: "",
                        time: "18:00",
                        seats: 50,
                        price: 8.99,
                  });
            }
      };

      const handleUpdateMovie = async (id) => {
            const { success } = await updateMovie(id, formData);
            if (success) {
                  setEditingId(null);
                  setFormData({
                        title: "",
                        time: "18:00",
                        seats: 50,
                        price: 8.99,
                  });
            }
      };

      const handleEditClick = (movie) => {
            setEditingId(movie.id);
            setFormData({
                  title: movie.title,
                  time: movie.time,
                  seats: movie.seats,
                  price: movie.price || 8.99,
            });
      };

      const handleCancel = () => {
            setIsAdding(false);
            setEditingId(null);
            setFormData({ title: "", time: "18:00", seats: 50, price: 8.99 });
      };

      return (
            <>
                  <AdminNavbar />
                  <div className="container mx-auto px-4 py-6">
                        <div className="flex justify-between items-center mb-6">
                              <h1 className="text-2xl font-bold text-gray-800">
                                    Movie Management
                              </h1>
                              <button
                                    onClick={() => setIsAdding(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                              >
                                    <FiPlus className="mr-2" />
                                    Add Movie
                              </button>
                        </div>

                        {/* Add New Movie Form */}
                        {isAdding && (
                              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                          Add New Movie
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                          <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Title
                                                </label>
                                                <input
                                                      type="text"
                                                      name="title"
                                                      value={formData.title}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      placeholder="Movie title"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Showtime
                                                </label>
                                                <select
                                                      name="time"
                                                      value={formData.time}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                      <option value="10:00">
                                                            10:00 AM
                                                      </option>
                                                      <option value="13:00">
                                                            1:00 PM
                                                      </option>
                                                      <option value="16:00">
                                                            4:00 PM
                                                      </option>
                                                      <option value="18:00">
                                                            6:00 PM
                                                      </option>
                                                      <option value="20:30">
                                                            8:30 PM
                                                      </option>
                                                      <option value="22:00">
                                                            10:00 PM
                                                      </option>
                                                </select>
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Seats
                                                </label>
                                                <input
                                                      type="number"
                                                      name="seats"
                                                      value={formData.seats}
                                                      onChange={
                                                            handleInputChange
                                                      }
                                                      className="w-full p-2 border border-gray-300 rounded"
                                                      min="1"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Price (₹)
                                                </label>
                                                <div className="relative rounded-md shadow-sm">
                                                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                      <MdCurrencyRupee className="text-gray-400" />
                                                      </div>
                                                      <input
                                                            type="number"
                                                            name="price"
                                                            value={
                                                                  formData.price
                                                            }
                                                            onChange={
                                                                  handleInputChange
                                                            }
                                                            className="block w-full pl-8 p-2 border border-gray-300 rounded"
                                                            min="0"
                                                            step="0.01"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                                    <div className="flex justify-end mt-4 space-x-2">
                                          <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 border border-gray-300 rounded flex items-center"
                                          >
                                                <FiX className="mr-2" />
                                                Cancel
                                          </button>
                                          <button
                                                onClick={handleAddMovie}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
                                          >
                                                <FiSave className="mr-2" />
                                                Save Movie
                                          </button>
                                    </div>
                              </div>
                        )}

                        {/* Movies Table */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                          <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Showtime
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Seats
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                      Actions
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                          {loading ? (
                                                <tr>
                                                      <td
                                                            colSpan="5"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            Loading movies...
                                                      </td>
                                                </tr>
                                          ) : movies.length === 0 ? (
                                                <tr>
                                                      <td
                                                            colSpan="5"
                                                            className="px-6 py-4 text-center"
                                                      >
                                                            No movies found
                                                      </td>
                                                </tr>
                                          ) : (
                                                movies.map((movie) => (
                                                      <tr key={movie.id}>
                                                            {editingId ===
                                                            movie.id ? (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="text"
                                                                                    name="title"
                                                                                    value={
                                                                                          formData.title
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <select
                                                                                    name="time"
                                                                                    value={
                                                                                          formData.time
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                              >
                                                                                    <option value="10:00">
                                                                                          10:00
                                                                                          AM
                                                                                    </option>
                                                                                    <option value="13:00">
                                                                                          1:00
                                                                                          PM
                                                                                    </option>
                                                                                    <option value="16:00">
                                                                                          4:00
                                                                                          PM
                                                                                    </option>
                                                                                    <option value="18:00">
                                                                                          6:00
                                                                                          PM
                                                                                    </option>
                                                                                    <option value="20:30">
                                                                                          8:30
                                                                                          PM
                                                                                    </option>
                                                                                    <option value="22:00">
                                                                                          10:00
                                                                                          PM
                                                                                    </option>
                                                                              </select>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <input
                                                                                    type="number"
                                                                                    name="seats"
                                                                                    value={
                                                                                          formData.seats
                                                                                    }
                                                                                    onChange={
                                                                                          handleInputChange
                                                                                    }
                                                                                    className="w-full p-1 border border-gray-300 rounded"
                                                                                    min="1"
                                                                              />
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="relative rounded-md shadow-sm">
                                                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                                    <MdCurrencyRupee className="text-gray-400" />
                                                                                    </div>
                                                                                    <input
                                                                                          type="number"
                                                                                          name="price"
                                                                                          value={
                                                                                                formData.price
                                                                                          }
                                                                                          onChange={
                                                                                                handleInputChange
                                                                                          }
                                                                                          className="block w-full pl-8 p-1 border border-gray-300 rounded"
                                                                                          min="0"
                                                                                          step="0.01"
                                                                                    />
                                                                              </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                                                                              <button
                                                                                    onClick={
                                                                                          handleCancel
                                                                                    }
                                                                                    className="text-gray-600 hover:text-gray-900"
                                                                              >
                                                                                    <FiX />
                                                                              </button>
                                                                              <button
                                                                                    onClick={() =>
                                                                                          handleUpdateMovie(
                                                                                                movie.id
                                                                                          )
                                                                                    }
                                                                                    className="text-green-600 hover:text-green-900"
                                                                              >
                                                                                    <FiSave />
                                                                              </button>
                                                                        </td>
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                              {
                                                                                    movie.title
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    movie.time
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              {
                                                                                    movie.seats
                                                                              }
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                              ₹
                                                                              {movie.price?.toFixed(
                                                                                    2
                                                                              ) ||
                                                                                    "8.99"}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              <div className="flex space-x-2">
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                handleEditClick(
                                                                                                      movie
                                                                                                )
                                                                                          }
                                                                                          className="text-blue-600 hover:text-blue-900"
                                                                                    >
                                                                                          <FiEdit />
                                                                                    </button>
                                                                                    <button
                                                                                          onClick={() =>
                                                                                                deleteMovie(
                                                                                                      movie.id
                                                                                                )
                                                                                          }
                                                                                          className="text-red-600 hover:text-red-900"
                                                                                    >
                                                                                          <FiTrash2 />
                                                                                    </button>
                                                                              </div>
                                                                        </td>
                                                                  </>
                                                            )}
                                                      </tr>
                                                ))
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </>
      );
};

export default AdminMovies;
