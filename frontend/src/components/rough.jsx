import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
//  import { RiFolderVideoLine } from "react-icons/ri";

// import { ImBin2 } from "react-icons/im";

const getCoursesUrl = "http://localhost:5000/api/admin/get-courses";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [err, setErr] = useState({});
  const [domainName, setDomainName] = useState("");

  const dispatch = useDispatch();

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
                  </div>
                </div>
                <div>
                  {/* <div className="font-bold mb-2">Course Details</div>
                  <div className="text-base font-medium">        
                    <p>Skills Required: {course.requiredSkills}</p>
                    <p>
                      Created On: {new Date(course.createdAt).toDateString()}
                    </p>
                  </div> */}
                </div>

                {/* <div className="border-[2px] p-3"> */}
                <div className="text-lg p-2 font-semibold"> Course Videos</div>

                {course?.videos.map((video, index) => (
                  <div
                    key={video.videoUniqueId}
                    className="bg-slate-50 mt-1 p-4 rounded shadow-lg hover:translate-y-1 hover:translate-x-2 hover:bg-white flex justify-between items-center"
                  >
                    <video width="220" height="140" controls className="mr-4">
                      <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    <span>{video.videoName}</span>
                  </div>
                ))}

                {/* <div className="pl-2">
                    <RiFolderVideoLine />

                  </div> */}

                <br></br>
                <br />
                <div className="font-bold mb-2">Course Details</div>
                <div className="text-base font-medium">
                  <p>Skills Required : {course.requiredSkills}</p>
                  <p>
                    Created On : {new Date(course.createdAt).toDateString()}
                  </p>
                </div>

                <div>
                  <h2 className=" hover:bg-slate-200   drop-shadow-lg">
                    Price :
                    <span className="text-red-500"> ₹ {course.price}</span>
                  </h2>
                </div>

              
                <br />
                <br />

                {/* {!courses.purchased && (
                  <div className=" flex justify-center items-center">
                    <Link to={`/order/${course?._id}`}>
                      <button className="bg-green-400 text-white text-lg font-semibold p-2 hover:bg-green-700 w-44 drop-shadow-lg">
                        Purchase
                      </button>
                    </Link>
                  </div>
                )} */}

                <button
                  id="rzp-button1"
                  onClick={() => handleSubscribeClick(plan)}
                  className="text-white bg-yellow-900 rounded mt-3 flex items-center justify-center"
                >
                  <span className="mr-2 text-4xl font-extrabold text-yellow-100 hover:text-yellow-700 w-12 h-12  ">
                    $
                  </span>
                  <span className="ml-9 mr-9 hover:text-red-100  flex items-center justify-center">Subscribe For Video Access</span>
                </button>
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
