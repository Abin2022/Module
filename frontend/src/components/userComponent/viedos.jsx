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
      <input
        type="text"
        placeholder="Search....."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border w-64"
      />
      <br />
      <br />
      <br />
      {courses.length > 0 ? (
        <div className="ml-6">
          <div className="text-2xl font-bold mb-4">Videos Available</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {searchCourses().map((course, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded shadow-lg">
                <div>
                  <div className="font-bold mb-2 ">{course.courseName}</div>
                  <div className="mt-1">
                    {course?.videos.map((video, index) => (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        {/* <div className="w-16 h-16 bg-gray-300 mr-2 flex justify-center items-center rounded">
                          🎥
                        </div> */}
                        <div className="w-16 h-16 bg-gray-300 mx-auto mb-2 flex justify-center items-center rounded">
                          🎥
                        </div>
                        <p className="flex justify-center">{video.videoName}</p>
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
              src="https://s.udemycdn.com/teaching/support-1-v3.jpg"
              alt="Right Image"
            />
          </div>
          {searchTerm.trim() === "" ? (
            <div className="text-4xl font-serif">No Course Available</div>
          ) : (
            <div className="text-red-500">No matching courses found.</div>
          )}
          <div className="mt-4">
            {/* Add Link component or button to navigate to add-course page */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
