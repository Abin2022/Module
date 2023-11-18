

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
import { tutorLogout } from "../../slices/tutorAuthSlice";
import { FaRedhat } from "react-icons/fa";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";



const TutorDropdown = () => {
  const [tutorLogoutApi] = useTutorlogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await tutorLogoutApi().unwrap();
      dispatch(tutorLogout());
      navigate("/tutor/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (

<header className="flex justify-between items-center bg-gray-800 p-4">
<Link
  to="/tutor/home"
  className="flex items-center text-xl font-bold  text-white"
>
  <FaRedhat className="mr-2" /> MODULE  - TUTOR 
</Link>

<div className="flex justify-between items-center">
  
    <>
     
    <Link to="/tutor/home" className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">       Home    </Link>
         <Link to="/tutor/profile" className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
       Profile
     </Link>
     <Link to="/tutor/add-course" className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
       Add Course
     </Link>
     <Link to="/tutor/courses" className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
      Courses
     </Link>
     <div className="flex items-center">
          <button type="button"
       onClick={handleLogout}
       className="text-red-600 hover:text-red-800 transition duration-300"
     >
       Logout <BiLogOut className="inline-block ml-2" />
     </button>
     </div>

     
    </>
  
    {/* <Link
      to="/adminlogin"
      className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
    >
      Sign In <FaSignInAlt />
    </Link> */}

</div>
</header>

  );
};

export default TutorDropdown;
