// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FcApproval } from "react-icons/fc";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import {
//   useDeleteCourseMutation,
//   useDeleteCourseVideoMutation,
// } from "../../slices/tutorApiSlice";
// import { ImBin2 } from "react-icons/im";
// import {
//   useApproveCourseMutation,
//   useRejectCourseMutation,
// } from "../../slices/adminAdminApiSlice";
// import {
//   removeVideoFromCourse,
//   setAllCourses,
//   setApproveCourse,
//   setRejectCourse,
// } from "../../slices/courseDetailsSlice";
// import { useDispatch, useSelector } from "react-redux";

// const CourseList = () => {
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     const getAllCourses = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/admin/get-courses",
//           { withCredentials: true }
//         );
//         const courses = res.data;
//         dispatch(setAllCourses(courses));
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };
//     getAllCourses();
//   }, [dispatch]);

//   const [deleteVideos] = useDeleteCourseVideoMutation();
//   const [approveCourse] = useApproveCourseMutation();
//   const [rejectCourse] = useRejectCourseMutation();

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleVideoDelete = async (videoId, courseId) => {
//     try {
//       const res = await deleteVideos({ videoId, courseId });
//       if (res.error) {
//         setErr((prevErrors) => ({
//           ...prevErrors,
//           [courseId]: "Course must have at least one Video",
//         }));
//       } else {
//         dispatch(removeVideoFromCourse({ courseId, videoId }));
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//     }
//   };

//   const handleApproveCourse = async (courseId) => {
//     try {
//       const res = await approveCourse({ courseId });
//       dispatch(setApproveCourse({ courseId }));
//     } catch (error) {
//       console.error("Error approving course:", error);
//     }
//   };

//   const handleRejectCourse = async (courseId) => {
//     try {
//       const res = await rejectCourse({ courseId, rejectionReason });
//       dispatch(setRejectCourse({ courseId }));
//     } catch (error) {
//       console.error("Error rejecting course:", error);
//     }
//   };

//   const courses = useSelector((state) => state.courses.allCourses);
//   const courseFilter = courses.filter(
//     (course) =>
//       course.courseName.toUpperCase().includes(search.toUpperCase()) ||
//       course.domain.domainName.toUpperCase().includes(search.toUpperCase())
//   );

//   return (
//     <div>
//       {courses ? (
//         <div className="ml-6">
//           <div className="flex">
//             <div className="text-2xl font-bold mb-4">Course List:- </div>
//             <div className="max-w-sm mx-auto">
//               <div className="relative text-gray-600 focus-within:text-gray-400 w-full">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle cx="11" cy="11" r="8"></circle>
//                     <path d="M21 21l-4.35-4.35"></path>
//                   </svg>
//                 </span>
//                 <input
//                   type="search"
//                   name="search"
//                   value={search}
//                   onChange={handleSearch}
//                   className="py-2 text-sm text-black border-b border-gray-300 pl-10 focus:outline-none focus:border-b focus:border-black w-full"
//                   placeholder="Search..."
//                   autoComplete="off"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//             {courseFilter.map((course, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded shadow-lg">
//                 <div className="flex mb-4">
//                   <div className="w-1/4 bg-slate-50 h-50">
//                     <img src={course.thumbnail} alt="thumbnail" className="" />
//                     <div className="text-sm mt-1">{course.caption}</div>
//                   </div>
//                   <div className="w-3/4 pl-4">
//                     <div className="font-bold mb-2">{course.courseName}</div>
//                     {course.approved ? (
//                       <div className="flex items-center">
//                         <span className="text-sm font-medium text-green-600">
//                           Approved
//                         </span>
//                         <FcApproval />
//                       </div>
//                     ) : (
//                       course.rejected && (
//                         <div className="flex items-center">
//                           <span className="text-sm font-medium text-red-600">
//                             Rejected
//                           </span>
//                           <IoMdCloseCircleOutline />
//                         </div>
//                       )
//                     )}
//                     <p>{course.description}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="font-bold mb-2">Course Details</div>
//                   <div className="text-base font-medium">
//                     <p className="text-green-600">
//                       Domain: {course.domain.domainName}
//                     </p>
//                     <p>
//                       Created On: {new Date(course.createdAt).toDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {rejectionReason &&  (
//                   <div className="bg-slate-100 text-lg font-semibold p-2 flex items-center justify-around">
//                     {/* <button
//                       className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover:bg-amber-400 hover:text-black"
//                       onClick={() => handleApproveCourse(course._id)}
//                     >
//                       Approve
//                     </button> */}
//                     {/* <button
//                       className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
//                       onClick={() => handleRejectCourse(course._id)}
//                     >
//                       Reject
//                     </button> */}

//                   </div>
//                 )}

//                 {  course.approved === true && course.rejected === false && (
//                   <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
//                     <button
//                       className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
//                       onClick={() => handleRejectCourse(course._id)}
//                     >
//                       Reject
//                     </button>

//                     <textarea
//                       value={rejectionReason}
//                       onChange={(e) => setRejectionReason(e.target.value)}
//                       placeholder="Enter rejection reason..."
//                       className="py-1 text-sm text-black border-b border-gray-300 pl-2 focus:outline-none focus:border-b focus:border-black w-full"
//                       rows={2}
//                     />
//                   </div>
//                 )}

//                 {course.rejected === true && course.approved === false && (
//                   <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
//                     <button
//                       className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-amber-400 hover-text-black"
//                       onClick={() => handleApproveCourse(course._id)}
//                     >
//                       Approve
//                     </button>
//                   </div>
//                 )}

//                 <div>
//                   <div className="font-bold mb-2">Course Videos</div>

//                   <div className="text-red-500 text-base mt-1">
//                     {err[course._id]}
//                   </div>
//                   <div className="mt-1">
//                     {course?.videos.map((video, index) => (
//                       <a
//                         href={video.videoUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         key={index}
//                       >
//                         <div className="bg-white mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
//                           {video.videoName}
//                           <div className="">
//                             {/* <ImBin2
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 handleVideoDelete(video.videoUniqueId, course._id);
//                               }}
//                             /> */}
//                           </div>
//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col h-screen justify-center items-center">
//           <div className="w-60 h-60">
//             <img
//               src="https://i.pinimg.com/564x/5b/32/d8/5b32d856779925e1168bf90a134f0b8f.jpg"
//               alt="Right Image"
//             />
//           </div>
//           <div className="text-4xl font-serif">
//             No courses have been uploaded
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseList;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcApproval } from "react-icons/fc";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  useDeleteCourseMutation,
  useDeleteCourseVideoMutation,
} from "../../slices/tutorApiSlice";
import { ImBin2 } from "react-icons/im";
import {
  useApproveCourseMutation,
  useRejectCourseMutation,
} from "../../slices/adminAdminApiSlice";
import {
  removeVideoFromCourse,
  setAllCourses,
  setApproveCourse,
  setRejectCourse,
} from "../../slices/courseDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const CourseList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [rejectionReason, setRejectionReason] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/get-courses",
          { withCredentials: true }
        );
        const courses = res.data;
        dispatch(setAllCourses(courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getAllCourses();
  }, [dispatch]);

  const [deleteVideos] = useDeleteCourseVideoMutation();
  const [approveCourse] = useApproveCourseMutation();
  const [rejectCourse] = useRejectCourseMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleVideoDelete = async (videoId, courseId) => {
    try {
      const res = await deleteVideos({ videoId, courseId });
      if (res.error) {
        setErr((prevErrors) => ({
          ...prevErrors,
          [courseId]: "Course must have at least one Video",
        }));
      } else {
        dispatch(removeVideoFromCourse({ courseId, videoId }));
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      const res = await approveCourse({ courseId });
      dispatch(setApproveCourse({ courseId }));
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      const res = await rejectCourse({ courseId, rejectionReason });
      dispatch(setRejectCourse({ courseId }));
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  const courses = useSelector((state) => state.courses.allCourses);
  const courseFilter = courses.filter(
    (course) =>
      course.courseName.toUpperCase().includes(search.toUpperCase()) ||
      course.domain.domainName.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div>
      {courses ? (
        <div className="ml-6">
          <div className="flex">
            <div className="text-2xl font-bold mb-4">Course List:- </div>
            <div className="max-w-sm mx-auto">
              <div className="relative text-gray-600 focus-within:text-gray-400 w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  className="py-2 text-sm text-black border-b border-gray-300 pl-10 focus:outline-none focus:border-b focus:border-black w-full"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courseFilter.map((course, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded shadow-lg">
                <div className="flex mb-4">
                  <div className="w-1/4 bg-slate-50 h-50">
                    <img src={course.thumbnail} alt="thumbnail" className="" />
                    <div className="text-sm mt-1">{course.caption}</div>
                  </div>
                  <div className="w-3/4 pl-4">
                    <div className="font-bold mb-2">{course.courseName}</div>
                    {course.approved ? (
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600">
                          Approved
                        </span>
                        <FcApproval />
                      </div>
                    ) : (
                      course.rejected && (
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-red-600">
                            Rejected
                          </span>
                          <IoMdCloseCircleOutline />
                        </div>
                      )
                    )}
                    <p>{course.description}</p>
                  </div>
                </div>

                <div>
                  <div className="font-bold mb-2">Course Details</div>
                  <div className="text-base font-medium">
                    <p className="text-green-600">
                      Domain: {course.domain.domainName}
                    </p>
                    <p>
                      Created On: {new Date(course.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

                {course.approved === false && course.rejected === false && (
                  <div className="bg-slate-100 text-lg font-semibold p-2 flex items-center justify-around">
                    <button
                      className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover:bg-amber-400 hover:text-black"
                      onClick={() => handleApproveCourse(course._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
                      onClick={() => handleRejectCourse(course._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {course.approved === true && course.rejected === false && (
                  <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
                    <button
                      className="bg-red-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-gray-900"
                      onClick={() => handleRejectCourse(course._id)}
                    >
                      Reject
                    </button>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter rejection reason..."
                      className="py-1 text-sm text-black border-b border-gray-300 pl-2 focus:outline-none focus:border-b focus:border-black w-full"
                      rows={2}
                    />
                  </div>
                )}

                {course.rejected === true && course.approved === false && (
                  <div className="bg-slate-300 text-lg font-semibold p-2 flex items-center justify-around">
                    <button
                      className="bg-green-600 text-white text-xs py-1 px-2 border-black rounded-sm hover-bg-amber-400 hover-text-black"
                      onClick={() => handleApproveCourse(course._id)}
                    >
                      Approve
                    </button>
                  </div>
                )}

                <div>
                  <div className="font-bold mb-2">Course Videos</div>

                  <div className="text-red-500 text-base mt-1">
                    {err[course._id]}
                  </div>
                  <div className="mt-1">
                    {course?.videos.map((video, index) => (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <div className="bg-white mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center">
                          {video.videoName}
                          <div className="">
                            {/* <ImBin2
                              onClick={(e) => {
                                e.preventDefault();
                                handleVideoDelete(video.videoUniqueId, course._id);
                              }}
                            /> */}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="w-60 h-60">
            <img
              src="https://i.pinimg.com/564x/5b/32/d8/5b32d856779925e1168bf90a134f0b8f.jpg"
              alt="Right Image"
            />
          </div>
          <div className="text-4xl font-serif">
            No courses have been uploaded
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
