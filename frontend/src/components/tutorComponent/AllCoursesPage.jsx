import axios from "axios";
import React, { useEffect, useState } from "react";
const  getCoursesUrl  = "http://localhost:5000/api/admin/get-courses"


import { ImBin2 } from "react-icons/im";
import { Link } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useDeleteCourseVideoMutation,
} from "../../slices/tutorApiSlice.js";
import AddVideoModal from "../tutorComponent/AddViedo.jsx";

import { FcApproval } from "react-icons/fc";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [err, setErr] = useState({});
  const getCourse = async () => {
    try {
      const res = await axios.get(getCoursesUrl, {
        withCredentials: true,
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);
  const [deleteVideos] = useDeleteCourseVideoMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const handleDeleteCourse = async (courseId) => {
    const res = await deleteCourse({ courseId });
    console.log(courseId,"courseId from allcoursepage 39");

    window.location.reload();
  };
  
  const handleVideoDelete = async (videoId, courseId) => {
    const res = await deleteVideos({ videoId, courseId });

    if (res.error) {
      setErr((prevErrors) => ({
        ...prevErrors,
        [courseId]: "Course must have at least one Video",
      }));
    } else {
      window.location.reload();
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const openModal = (courseId) => {
    setCurrentCourseId(courseId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">My Courses</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded shadow-lg">
                <div className="flex mb-4">
                  <div className="w-1/4 bg-slate-50 h-50">
                    <img src={course.thumbnail} alt="thumbnail" className="" />
                    <div className="text-sm mt-1">{course.caption}</div>
                  </div>
                  <div className="w-3/4 pl-4">
                    <div className="font-bold mb-2">{course.courseName}</div>
                    <p>{course.description}</p>
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-2">Course Details</div>
                  <div className="text-base font-medium">
                    <p>Price: {course.price}</p>
                    <p>
                      Created On: {new Date(course.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                {course.approved === true ? (
                  <div className="bg-green-400 text-lg font-semibold p-2 flex items-center justify-center">
                    Course Approved <FcApproval />
                  </div>
                ) : course.rejected === true ? (
                  <div className="bg-red-400 text-lg font-semibold p-2 flex items-center justify-center">
                    Course Rejected
                    <IoMdCloseCircleOutline />
                  </div>
                ) : (
                  <div className="bg-slate-100 text-lg font-semibold p-2 flex items-center justify-center">
                    Waiting for Verification from Admin <BsClockHistory />
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
                                handleVideoDelete(
                                  video.videoUniqueId,
                                  course._id
                                );
                              }}
                            /> */}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 ">
                    <button
                      className="bg-amber-300 p-1 text-sm font-medium"
                      onClick={() => openModal(course._id)}
                    >
                      Add new video
                    </button>

                    <AddVideoModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      courseId={currentCourseId}
                    />
                  </div>
                </div>
                {/* <div className="flex justify-center mt-6">
                  <button
                    className="bg-red-600  text-white hover:bg-gray-900 hover:text-red-500 hover:font-bold px-4 py-2  border-black"
                    onClick={(e) => handleDeleteCourse(course._id)}
                  >
                    Delete Course
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center">
          {" "}
          <div className="w-60 h-60">
            <img
              src="https://s.udemycdn.com/teaching/support-1-v3.jpg"
              alt="Right Image"
            />
          </div>
          <div className="text-4xl font-serif">Let's Create a Course</div>
          <div className="mt-4">
            <Link to="/tutor/add-course">
              <button className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 border-black">
                Click Here
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
