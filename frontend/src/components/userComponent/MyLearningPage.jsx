import axios from "axios";
import React, { useEffect, useState } from "react";
 const getMyCoursesUrl  ="http://localhost:5000/api/my-courses";
// export const getMyCoursesUrl = "http://localhost:5000/api/my-courses";

import { Link } from "react-router-dom";

const MyLearningPage = () => {
  const [courses, setcourses] = useState([]);

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(getMyCoursesUrl, {
        withCredentials: true,
      });

      setcourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // const navigateHandler = async (courseId) => {};

  return (
    <>
      <div className="text-2xl font-semibold font-serif text-slate-800 mt-10 flex justify-center">
        My Courses
      </div>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mb-10 mt-10">
          {courses.map((order) => (
            <div key={order._id} className="flex justify-evenly ">
              {order.purchasedCourses.map((myCourse) => (
                <Link to={`/course/${myCourse.courseId._id}`}>
                  <div
                    key={myCourse.courseId._id}
                    className=" mb-4"
                    // onClick={(e) => navigateHandler(myCourse.courseId._id)}
                  >
                    <div className="p-4 shadow-md w-full">
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src={myCourse.courseId.thumbnail}
                          alt="course thumbnail"
                          className="w-40 h-40"
                        />
                        <div className="px-4">
                          <div className="text-lg text-green-600 font-semibold">
                            {myCourse.courseId.courseName}
                          </div>
                          <div className="text-base font-medium">
                            Tutor:{" "}
                            {myCourse.courseId.tutorId.name.toUpperCase()}
                          </div>
                          <div className="text-base font-medium">
                            Created On:{" "}
                            {new Date(
                              myCourse.courseId.createdAt
                            ).toDateString()}
                          </div>
                          <div>
                            <span className="text-sm font-semibold">
                              {myCourse.courseId.videos.length} videos
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-6 justify-center items-center">
          {" "}
          <div className="w-80 h-80">
            <img
              src="https://i.pinimg.com/564x/e0/fa/9e/e0fa9e12a918dc11792cd678a881a7a9.jpg"
              alt="Right Image"
            />
          </div>
          <div className="text-4xl font-serif">Let's Learn! Let's Ignite!</div>
          <div className="text-xl font-serif underline underline-offset-4 p-3 text-blue-700 hover:text-2xl">
            <Link>Find courses</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLearningPage;
