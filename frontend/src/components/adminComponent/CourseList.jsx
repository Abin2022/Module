import React, { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCourses } from "../../slices/courseDetailsSlice";

const CourseListing = () => {
  const [course, setCourse] = useState([]);
  const dispatch = useDispatch();



  const getCourse = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tutor/courselisting", {
        withCredentials: true,
      });
  
      // Check if the response data is in the expected format
      if (Array.isArray(res.data.course)) {
        setCourse(res.data.course);
        console.log(res.data, "dataaaaaaaaaaa");
  
        // Assuming that each course object contains properties like courseName, price, requiredSkills, description
        const courseList = res.data.course;
        console.log(courseList, "CourseList.....");
  
        dispatch(setCourses(courseList));
      } else {
        console.error("Invalid response format:", res.data);
        // Handle the unexpected response format appropriately
      }
    } catch (err) {
      console.error("Error fetching course data:", err);
    }
  };
  

  useEffect(() => {
    getCourse();
  }, []);

  return (
    // <div className="py-5 h-screen bg-gray-100">
    //   <div className="container mx-auto flex justify-center">
    //     <div className="bg-white p-5 flex flex-col items-center rounded-lg shadow-lg w-3/4">
    //       <h1 className="mb-5 font-semibold text-xl">Course List </h1>
    //       <CourseTable course={course} />
    //     </div>
    //   </div>
    // </div>
    <CourseTable course={course} />
  );
};

export default CourseListing;
