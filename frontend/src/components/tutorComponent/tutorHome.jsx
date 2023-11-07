

// import React from 'react';
// // import Link from 'react-router-dom';
// import { Link, useNavigate } from "react-router-dom";

// const tutorHome=()=> {

//   return (
//     <>
//     <div class="flex justify-center mt-10 mb-10">


// <Link to="/tutor/login">
//     <button class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" >  
//       Tutor Registration
//     </button>
//     </Link>
   

//   </div>
//   <h2 class="flex justify-center mt-10 mb-10"> Video Available for Users.... </h2>
//   </>
  
//   )
// }

// export default tutorHome

import React from "react";
import { Link } from "react-router-dom";
import {useTutorHomeMutation} from "../../slices/userApiSlice"
const TutorHome = () => {
  return (
    <>
      <div className="absolute left-0 mt-22 w-38  flex items-center justify-center z-50  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
        <Link to="/tutor/login">
          <button className="bg-blue-700 hover:bg-gray-700 text-black font-bold py-2 px-7 rounded">
            Tutor Registration
          </button>
        </Link>
      </div>
      <h2 className="flex justify-center mt-10 mb-10"> All tutors Available on this site.... </h2>
      
    </>
  );
};

export default TutorHome;

