import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
import { tutorLogout } from "../../slices/tutorAuthSlice";
import { FaRedhat } from "react-icons/fa";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react"
import { FaBars } from "react-icons/fa";


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

  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center bg-gray-800 p-4">
      <nav className="container mx-auto py-4 flex items-center justify-between flex-wrap">

      <Link
        to="/tutor/home"
        className="flex items-center text-sm font-bold text-white"
      >
        <FaRedhat className="mr-2 text-lg" /> MODULE
      </Link>
      <div className="block lg:hidden">
          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleDropdown}
            className="text-white hover:text-green-400 focus:outline-none"
          >
          
            <FaBars className="h-6 w-6" />
          </button>
        </div>

      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:w-auto w-full`}
       >

        <>
          <Link
            to="/tutor/home"
            className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
          >
            {" "}
            Home{" "}
          </Link>
          <Link
            to="/tutor/profile"
            className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
          >
            Profile
          </Link>
          <Link
            to="/tutor/add-course"
            className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
          >
            Add Course
          </Link>
          <Link
            to="/tutor/courses"
            className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
          >
            Courses
          </Link>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-800 transition duration-300"
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
      </nav>
    </header>
  );
};

export default TutorDropdown;
