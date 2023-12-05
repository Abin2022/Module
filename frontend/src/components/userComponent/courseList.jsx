import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
import {
  useCourseRatingMutation,
  useCourseRevewMutation,
} from "../../slices/userApiSlice";
import FeedbackModel from "./FeedbackModal";
import { toast } from "react-toastify";

const getCoursesUrl = "http://localhost:5000/api/admin/get-courses";

const CourseList = () => {
  const { courseId } = useParams();
  console.log(courseId, "courseId");
  const [courses, setCourses] = useState([]);
  const [err, setErr] = useState({});
  const [domainName, setDomainName] = useState("");
  // const [isListView, setIsListView] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  //rating
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const [courseRating] = useCourseRatingMutation();

  const handleStarClick = async (clickedRating) => {
    console.log(clickedRating, "click rating");
    setRating(clickedRating);
    console.log(rating, "rating");
    const res = await courseRating({ courseId, clickedRating }).unwrap();
    dispatch(setCourses(res));
  };

  // const courses = useSelector((state) => state.courses.courses);
  const course = courses?.course;
  const userId = useSelector((state) => state.auth.userInfo._id);

  const isRated = course?.rating.some((rate) => rate.userId._id === userId);
  console.log(course?.rating);
  console.log(userId);
  console.log(isRated, "sdhfsadjkfh");

  const [coursefeedback] = useCourseRevewMutation();
  const handleFeedbackSubmit = async (feedback) => {
    console.log("Feedback submitted:", feedback);

    const res = await coursefeedback({ feedback, courseId }).unwrap();
    dispatch(setCourses(res));
  };

  const getDomain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/domain", {
        withCredentials: true,
      });

      const domains = res.data;
      const domainNames = domains.map((domain) => domain.domainName);

      dispatch(setDomains(domainNames));
    } catch (err) {
      console.error("Error fetching domain data:", err);
    }
  };

  const getCourse = async () => {
    try {
      const res = await axios.get(getCoursesUrl, {
        withCredentials: true,
        params: { domain: domainName },
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // const toSubscribtionPage = async () => {
  //   try {
  //     res.redirect("/subscription-plans");
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  useEffect(() => {
    getDomain();
  }, []);

  useEffect(() => {
    getCourse();
  }, [domainName]);

  const domains = useSelector((state) => state.domains.domains);

  return (
    <div>
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">My Courses in user side</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courses.map((course, index) => (
              <div key={index} className="bg-black-90 p-4 rounded shadow-lg">
                <div className="flex mb-4">
                  <div className="w-1/4 bg-slate-50 h-50">
                    <img src={course.thumbnail} alt="thumbnail" className="" />
                    <div className="text-sm mt-1">{course.caption}</div>
                  </div>
                  <div className="w-3/4 pl-4">
                    <div className="font-bold mb-2">{course.courseName}</div>
                    <p>{course.description}</p>
                    <br />

                    <div className="text-base font-medium">
                      <p>Skills Required :</p>
                    </div>
                    {course.requiredSkills}
                  </div>
                </div>
                <div></div>

                <div className="text-lg p-2 font-semibold">
                  {" "}
                  Course Videos
                  <button
                    onClick={() => setShowVideos(!showVideos)}
                    className="text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded mt-2 flex items-center justify-center p-2 hover:shadow-lg"
                  >
                    {showVideos ? "Hide Videos" : "Show Videos"}
                  </button>
                </div>
                {showVideos && (
                  <div>
                    {course?.videos.map((video, index) => (
                      <div
                        key={video.videoUniqueId}
                        className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center"
                      >
                        <video
                          width="220"
                          height="140"
                          controls
                          className="mr-4"
                        >
                          <source src={video.videoUrl} type="video/mp4" />
                        </video>
                        <span>{video.videoName}</span>
                      </div>
                    ))}
                  </div>
                )}

                <br />

                <div
                  onClick={() => setIsModalOpen(true)}
                  // className="border-2 border-gray-700 "
                >
                  <div 
                  // className=" text-gray-700  w-2/4 
                  className="text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded mt-2 flex items-center justify-center p-2 hover:shadow-lg"

                  >
                    {" "}
                    Give a Feedback!
                  </div>
                </div>
                <FeedbackModel
                  isOpen={isModalOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  onSubmit={handleFeedbackSubmit}
                />
                <br />

                <div className="pr-3 text-center">Rate This Course</div>
                <div className="flex items-center justify-center">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <button
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className={`text-2xl ${
                        index <= rating ? "text-yellow-500" : "text-gray-300"
                      } focus:outline-none`}
                    >
                      ★
                    </button>
                  ))}
                </div>
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
          <div className="text-4xl font-serif">No Course Available</div>
          <div className="mt-4">
            {/* Add Link component or button to navigate to add-course page */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
