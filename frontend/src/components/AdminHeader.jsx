import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useAdminLogoutMutation } from "../slices/adminAdminApiSlice";
import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRedhat } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import {  useState } from "react";


const AdminHeader = () => {
  const adminInfo = useSelector((state) => state.adminAuth.adminInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      dispatch(adminLogout());
      navigate("/adminlogin");
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
        to="/admin"
        className="flex items-center text-xl font-bold  text-white"
      >
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
      // className="flex justify-between items-center"
      >
        {adminInfo ? (
          <>

          
            <Link
              to="/admin/usersList"
              className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
            >
              User 
            </Link>

            <Link
              to="/admin/tutorList"
              className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
            >
              Tutor 
            </Link>

              <Link to="/admin/domain"
               className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
                 
              >
                Domain
              </Link>

              
              <Link to="/admin/courseList"
               className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
                 
              >
                Course
              </Link>

               
              <Link to="/admin/get-plans"
               className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
                 
              >
               Plans
              </Link>  


              {/* <Link to="/admin/get-subscriptions"
               className="hover:text-green-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
                 
              >
               subscription List
              </Link> */}
 
            <div className="flex items-center">
              {/* <p className="text-white mr-2">User List</p> */}
              <button
                type="button"
                onClick={logoutHandler}
                className="text-red  hover:text-red-700  text-white font-bold py-2 px-2 rounded"
              >
                Logout <BiLogOut className="inline-block ml-2" />
              </button>
            </div>
          </>
        ) : (
          <Link
            to="/adminlogin"
            className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
          >
            Sign In <FaSignInAlt />
          </Link>
        )}
      </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
