import React from "react";
// import Link from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useCourseMutation } from "../../slices/userApiSlice";

const courseList = () => {
  return (
    <>
      <div className="flex justify-center mt-10 mb-10">
        <h2 className="flex justify-center mt-10 mb-10">
          {" "}
         
              <Link to="/">
    <button class="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded" >  
      Live Viedo
    </button>
    <br></br>
    </Link>
         
        </h2>
      </div>
       <h2 className="flex justify-center mt-10 mb-10">ALL Course list available for the Student </h2>   {" "}
    </>
  );
};

export default courseList;
