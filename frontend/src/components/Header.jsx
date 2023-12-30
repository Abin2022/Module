import { FaSignInAlt, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTutorLoginMutation } from "../slices/tutorApiSlice";
import { tutorLogout } from "../slices/tutorAuthSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRedhat } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

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
      <nav className="container mx-auto py-4 flex items-center justify-between flex-wrap">
        <Link to="/" className="flex items-center text-xl font-bold">
          <FaRedhat className="mr-2" /> MODULE
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
          <div className="flex flex-wrap items-center space-x-4">
            <Link to="/instructor" className="nav-link hover:text-green-500">
              Tutors
            </Link>

            {/* <Link to="/getApprovedCourses/${courseId}" className="nav-link"> */}
            <Link to="/getApprovedCourses" className="nav-link hover:text-green-500">

              Course
            </Link>

            <Link to="/subscription-plans" className="nav-link hover:text-green-500">
              {/* <span className="hover:text-yellow-700">₹</span>  */}
              Subscribe
            </Link>

            <Link to="/profile" className="nav-link hover:text-green-500">
              Profile
            </Link>

            <Link to="/getrooms/:userId" className="nav-link hover:text-green-500">
              Message
            </Link>

            {userInfo ? (
              <Link onClick={logoutHandler} className="nav-link hover:text-red-500">
                Logout
              </Link>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {/* Sign In Icon SVG Path */}
                    <path
                      fillRule="evenodd"
                      d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H5a1 1 0 010-2h9.586l-1.293-1.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign In
                </Link>

                <Link to="/register" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {/* Sign Up Icon SVG Path */}
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
