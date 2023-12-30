

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setDomains } from "../../slices/domainSlice";
// import {
//   useCourseRatingMutation,
//   useCourseRevewMutation,
// } from "../../slices/userApiSlice";
// import FeedbackModel from "./FeedbackModal";
// import { toast } from "react-toastify";
// import { useCheckPlanStatusMutation } from "../../slices/userApiSlice";

// const getCoursesUrl = "http://localhost:5000/api/admin/get-courses";

// const CourseList = () => {
//   const { courseId } = useParams();

//   const [courses, setCourses] = useState([]);
//   const [domainName, setDomainName] = useState("");
//   const [showVideos, setShowVideos] = useState(false);
//   const [checkStatus] = useCheckPlanStatusMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   const [rating, setRating] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [videoProgress, setVideoProgress] = useState({});

//   const dispatch = useDispatch();
//   const [courseRating] = useCourseRatingMutation();

//   const videoRef = useRef(null);

//   const handleStarClick = async (clickedRating) => {
//     setRating(clickedRating);
//     const res = await courseRating({ courseId, clickedRating }).unwrap();
//     dispatch(setCourses(res));
//   };

//   const handleVideoWatched = (courseId, videoUniqueId, duration) => {
//     const videoKey = `${courseId}-${videoUniqueId}`;
//     const currentTime = Math.floor(
//       (videoRef.current.currentTime / duration) * 100
//     );

//     setVideoProgress((prevProgress) => ({
//       ...prevProgress,
//       [videoKey]: { watched: true, progress: currentTime },
//     }));
//   };

//   const [coursefeedback] = useCourseRevewMutation();
//   const handleFeedbackSubmit = async (feedback) => {
//     const res = await coursefeedback({ feedback, courseId }).unwrap();
//     dispatch(setCourses(res));
//   };

//   const getDomain = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/domain", {
//         withCredentials: true,
//       });

//       const domains = res.data;
//       const domainNames = domains.map((domain) => domain.domainName);

//       dispatch(setDomains(domainNames));
//     } catch (err) {
//       console.error("Error fetching domain data:", err);
//     }
//   };

//   const getCourse = async () => {
//     try {
//       const res = await axios.get(getCoursesUrl, {
//         withCredentials: true,
//         params: { domain: domainName, courseId },
//       });

//       setCourses(res.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   const checkPlanStatus = async () => {
//     try {
//       const planStatus = await checkStatus({ userId: userInfo._id }).unwrap();
//       toast.success("Plan is valid ");

//       if (planStatus.status === false) {
//         toast.error("Please Subscribe To Watch Video");
//       } else {
//         setShowVideos(!showVideos);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getDomain();
//   }, []);

//   useEffect(() => {
//     getCourse();
//   }, [domainName, courseId]);

//   return (
//     <div>
//       {courses.length > 0 ? (
//         <div className="ml-6">
//           <div className="text-2xl font-bold mb-4">My Courses in user side</div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
//             {courses.map((course, _id) => (
//               <div key={_id} className="bg-black-90 p-4 rounded shadow-lg">
//                 <div className="flex mb-4">
//                   <div className="w-1/4 bg-slate-50 h-50">
//                     <img src={course.thumbnail} alt="thumbnail" className="" />
//                     <div className="text-sm mt-1 bg-gray-600 text-white text-center">
//                       {course.caption}
//                     </div>
//                   </div>
//                   <div className="w-3/4 pl-4">
//                     <div className="font-bold mb-2">{course.courseName}</div>
//                     <p>{course.description}</p>
//                     <br />
//                     <div className="text-base font-medium">
//                       <p>Skills Required :</p>
//                     </div>
//                     {course.requiredSkills}
//                   </div>
//                 </div>
//                 <div className="text-lg p-2 font-semibold text-center">
//                   {" "}
//                   <button
//                     onClick={checkPlanStatus}
//                     className={`text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-full py-2 px-4 hover:shadow-lg focus:outline-none ${
//                       showVideos ? "bg-red-500" : ""
//                     }`}
//                   >
//                     {showVideos ? "Hide Videos" : "Show Videos"}
//                   </button>
//                 </div>
//                 {showVideos && (
//                   <div>
//                     {course?.videos.map((video, videoUniqueId) => (
//                       <div
//                         key={videoUniqueId}
//                         className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center"
//                       >
//                         <video
//                           ref={videoRef}
//                           width="220"
//                           height="140"
//                           controls
//                           className="mr-4"
//                           onTimeUpdate={(e) =>
//                             handleVideoWatched(
//                               course._id,
//                               videoUniqueId,
//                               e.target.duration
//                             )
//                           }
//                         >
//                           <source src={video.videoUrl} type="video/mp4" />
//                         </video>
//                         <span>{video.videoName}</span>
//                         {videoProgress[`${course._id}-${videoUniqueId}`]?.watched && (
//                           <div className="text-green-500 font-bold">
//                             Watched: {videoProgress[`${course._id}-${videoUniqueId}`]?.progress}%
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <div onClick={() => setIsModalOpen(true)}>
//                       <div className="text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded mt-2 flex items-center justify-center p-2 hover:shadow-lg">
//                         {" "}
//                         Give a Feedback!
//                       </div>
//                     </div>
//                     <FeedbackModel
//                       isOpen={isModalOpen}
//                       onRequestClose={() => setIsModalOpen(false)}
//                       onSubmit={handleFeedbackSubmit}
//                     />
//                     <div className="pr-3 text-center">Rate This Course</div>
//                     <div className="flex items-center justify-center">
//                       {[1, 2, 3, 4, 5].map((index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleStarClick(index)}
//                           className={`text-2xl ${
//                             index <= rating
//                               ? "text-yellow-500"
//                               : "text-gray-300"
//                           } focus:outline-none`}
//                         >
//                           ★
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col h-screen justify-center items-center">
//           <div className="w-60 h-60">
//             <img
//               src="https://s.udemycdn.com/teaching/support-1-v3.jpg"
//               alt="Right Image"
//             />
//           </div>
//           <div className="text-4xl font-serif">No Course Available</div>
//           <div className="mt-4">
//             {/* Add Link component or button to navigate to add-course page */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseList;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
import {
  useCourseRatingMutation,
  useCourseRevewMutation,
} from "../../slices/userApiSlice";
import FeedbackModel from "./FeedbackModal";
import { toast } from "react-toastify";
import { useCheckPlanStatusMutation } from "../../slices/userApiSlice";

const getCoursesUrl = "http://localhost:5000/api/admin/get-courses";

const CourseList = () => {
  const { courseId } = useParams();

  const [courses, setCourses] = useState([]);
  const [domainName, setDomainName] = useState("");
  const [showVideos, setShowVideos] = useState(false);
  const [checkStatus] = useCheckPlanStatusMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const [loadedVideoProgress, setLoadedVideoProgress] = useState(false);

  const dispatch = useDispatch();
  const [courseRating] = useCourseRatingMutation();

  const videoRef = useRef(null);

  const handleStarClick = async (clickedRating) => {
    setRating(clickedRating);
    const res = await courseRating({ courseId, clickedRating }).unwrap();
    dispatch(setCourses(res));
  };

  const handleVideoWatched = (courseId, videoUniqueId, duration) => {
    const videoKey = `${courseId}-${videoUniqueId}`;
    const currentTime = Math.floor(
      (videoRef.current.currentTime / duration) * 100
    );
  
    setVideoProgress((prevProgress) => ({
      ...prevProgress,
      [videoKey]: { watched: true, progress: currentTime },
    }));
  };
  

  const [coursefeedback] = useCourseRevewMutation();
  const handleFeedbackSubmit = async (feedback) => {
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
        params: { domain: domainName, courseId },
      });

      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const checkPlanStatus = async () => {
    try {
      const planStatus = await checkStatus({ userId: userInfo._id }).unwrap();
      toast.success("Plan is valid ");

      if (planStatus.status === false) {
        toast.error("Please Subscribe To Watch Video");
      } else {
        setShowVideos(!showVideos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDomain();
  }, []);

  useEffect(() => {
    getCourse();
  }, [domainName, courseId]);

  useEffect(() => {
    if (!loadedVideoProgress) {
      // Load video progress from local storage
      const storedVideoProgress = JSON.parse(localStorage.getItem("videoProgress")) || {};
      setVideoProgress(storedVideoProgress);
      setLoadedVideoProgress(true);
    }
  }, [loadedVideoProgress]);

  useEffect(() => {
    // Save video progress to local storage whenever it changes
    localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
  }, [videoProgress]);

  return (
    <div>
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">My Courses in user side</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courses.map((course, _id) => (
              <div key={_id} className="bg-black-90 p-4 rounded shadow-lg">
                <div className="flex mb-4">
                  <div className="w-1/4 bg-slate-50 h-50">
                    <img src={course.thumbnail} alt="thumbnail" className="" />
                    <div className="text-sm mt-1 bg-gray-600 text-white text-center">
                      {course.caption}
                    </div>
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
                <div className="text-lg p-2 font-semibold text-center">
                  {" "}
                  <button
                    onClick={checkPlanStatus}
                    className={`text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-full py-2 px-4 hover:shadow-lg focus:outline-none ${
                      showVideos ? "bg-red-500" : ""
                    }`}
                  >
                    {showVideos ? "Hide Videos" : "Show Videos"}
                  </button>
                </div>
                {showVideos && (
                  <div>
                    {course?.videos.map((video, videoUniqueId) => (
                      <div
                        key={videoUniqueId}
                        className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center"
                      >
                        <video
                          ref={videoRef}
                          width="220"
                          height="140"
                          controls
                          className="mr-4"
                          onTimeUpdate={() => {
                            const duration = videoRef.current.duration;
                            handleVideoWatched(courseId, videoUniqueId, duration);
                          }}
                        >
                          <source src={video.videoUrl} type="video/mp4" />
                        </video>
                        <span>{video.videoName}</span>
                        {videoProgress[`${courseId}-${videoUniqueId}`]?.watched && (
                          <div className="text-sm text-green-500">
                            Watched: {videoProgress[`${courseId}-${videoUniqueId}`]?.progress}%
                          </div>
                        )}
                      </div>
                    ))}
                    <br />
                    <div onClick={() => setIsModalOpen(true)}>
                      <div className="text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded mt-2 flex items-center justify-center p-2 hover:shadow-lg">
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
                            index <= rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          } focus:outline-none`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen justify-center items-center">
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
