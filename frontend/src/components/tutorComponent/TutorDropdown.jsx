import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
import { tutorLogout } from "../../slices/tutorAuthSlice";

const TutorDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
    <div className="relative group">
      <button
       onClick={toggleDropdown}
        className="flex items-center justify-center p-2 space-x-2 text-black hover:text-blue-600 cursor-pointer rounded-full bg-white shadow-md"
      >
        <FaUserCircle className="h-10 w-10" />
        <span className="flex items-center justify-center text-lg font-semibold">
          Instructor
        </span>
      </button>

      {isOpen &&(
      // <div className=" fixed inset-2 flex items-center justify-center z-50">
        <div className="absolute left-0 mt-22 w-38  flex items-center justify-center z-50  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 " >
          <div className="py-2">
            <Link
              to="/tutor/home"
              className="block px-4 py-2 text-base font-semibold text-black hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/tutor/profile"
              className="block px-4 py-2 text-base font-semibold text-black hover:text-blue-600"
            >
              Profile
            </Link>
            <Link
              to="/tutor/add-course"
              className="block px-4 py-2 text-base font-semibold text-black hover:text-blue-600"
            >
              Add Course
            </Link>
            <Link
              to="/tutor/add-videos"
              className="block px-4 py-2 text-base font-semibold text-black hover:text-blue-600"
            >
              Add Video
            </Link>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-base font-semibold text-red-600 hover:text-red-800"
            >
              Logout <BiLogOut className="inline-block ml-2" />
            </button>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default TutorDropdown;
