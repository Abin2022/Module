import { FaSignInAlt, FaSignOutAlt,FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTutorLoginMutation } from "../slices/tutorApiSlice";
import { tutorLogout } from "../slices/tutorAuthSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRedhat } from "react-icons/fa";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [isDropdownOpen,setisDropdownOpen] =useState(false)
  const toggleDropdown = () =>{
    setisDropdownOpen(!isDropdownOpen)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto py-4">
        <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold">
      <FaRedhat className="mr-2" /> MODULE
    </Link>

          <div className="space-x-4">
          <div className="flex space-x-4">
  {/* <Link to="/courseList" className="text-white hover:text-gray-300 transition duration-300">
    Course
  </Link> */}
  < Link to="/courseList" class= " bg-gray-800   hover:bg-gray-400 text-white font-bold py-2 px-2 rounded">
    <i class="fas fa-play"></i> Course
</Link>

  <Link to="/tutor" class="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
    Tutors
  </Link>

  <Link to="/video" class="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
    Videos
  </Link>

  <Link to="/profile" class="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
    Profile
  </Link>

  {userInfo ? (
    <Link onClick={logoutHandler}  class="hover:bg-red-400 bg-gray-800 text-white font-bold py-2 px-2 rounded">
      Logout
    </Link>
  ) : (
    <div className="space-x-2">
      <Link to="/login" className="flex items-center text-white hover:text-gray-300 transition duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H5a1 1 0 010-2h9.586l-1.293-1.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Sign In
      </Link>

      <Link to="/register" className="flex items-center text-white hover:text-gray-300 transition duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 11V9h2V7h-2V5H7v2H5v2h2v2h2z"
            clipRule="evenodd"
          />
        </svg>
        Sign Up
      </Link>
    </div>
  )}
</div>

            
           
            {/* {userInfo ? (
  <div className="relative inline-block text-left cursor-pointer">
    
   
      <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded shadow-lg hidden">
    
        <div
          className="block px-4 py-2 text-gray-800 cursor-pointer"
          onClick={logoutHandler}
        >
          Logout
        </div>
      </div>
   
  </div>
) : (
  <div className="space-x-2">
    <Link to="/login" className="flex items-center">
      <FaSignInAlt className="mr-1" />
      Sign In
    </Link>
    <Link to="/register" className="flex items-center">
      <FaSignOutAlt className="mr-1" />
      Sign Up
    </Link>
  </div>
)} */}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
