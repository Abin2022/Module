import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";
// import { usePrefetch } from "../../slices/userApiSlice"

const getCoursesUrl = "http://localhost:5000/api/admin/get-courses";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [domainName, setDomainName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const searchCourses = () => {
    if (searchTerm.trim() === "") {
      // If search term is empty, return all courses
      return courses;
    }

    const filteredCourses = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredCourses;
  };

  useEffect(() => {
    getDomain();
  }, []);

  useEffect(() => {
    getCourse();
  }, [domainName]);

  useEffect(() => {
    const filteredCourses = searchCourses();
    setCourses(filteredCourses);
  }, [searchTerm, courses]);

  return (
    <div>
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">Viedo Avaliable</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {courses.map((course, index) => (
              <div key={index} className="bg-black-90 p-4 rounded shadow-lg">
               
                <div></div>


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

export default AllCoursesPage;
