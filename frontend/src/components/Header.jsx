import { FaSignInAlt, FaSignOutAlt,FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTutorLoginMutation } from "../slices/tutorApiSlice";
import { tutorLogout } from "../slices/tutorAuthSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

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
          <Link to="/" className="text-xl font-bold">
            MODULE
          </Link>

          <div className="space-x-4">
            {/* <Link to="/courseList" className="text-white">
              Course
            </Link> */}

            <Link to="/tutor" className="text-white">
              Tutor
            </Link>

            <Link to="/profile" className="text-white">
              Profile
            </Link>
             
             {userInfo ? (
              <Link onClick={logoutHandler} className="text-white">
              Logout
            </Link>
             ):(
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
             )}
            
           
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
