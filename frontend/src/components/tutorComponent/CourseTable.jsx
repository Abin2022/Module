import React, { useState } from 'react';
    import { useDeleteCourseMutation } from "../../slices/tutorApiSlice";
    import { toast } from "react-toastify";


const CourseTable = ({ course }) => {
  const [search, setSearch] = useState('');

   const [deleteCourse, {isLoading:isDeleting} ] = useDeleteCourseMutation(); ;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCourses = course.filter(
    (course) =>
      course.courseName.toLowerCase().includes(search.toLowerCase()) 
        );

        
        const handleCourseDelete = async (courseId) => {
          await deleteCourse({ courseId });
          toast.success("Course deleted successfully");
          window.location.reload();
        };
        
      

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border w-64"
        />
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-slate-400">
          <tr>
            <th className="px-4 py-2">Index</th>
            <th className="px-4 py-2">Domain</th>
            <th className="px-4 py-2">courseName</th>
            <th className="px-4 py-2">price</th>
            
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <tr key={index} className="hover:bg-slate-200">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{course.domain}</td>
                <td className="border px-4 py-2">{course.courseName}</td>
                <td className="border px-4 py-2">{course.price}</td>
                
                <td className="border px-4 py-2">{course.description}</td>
                <td className="border px-4 py-2">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleCourseDelete(course._id)}
                >
                  Delete
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4" >
                No matching courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CourseTable;
