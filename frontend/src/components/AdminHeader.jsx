// import { Navbar, Nav, div,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import {ss Link } from 'react-router-bootstrap';
import { useAdminLogoutMutation } from "../slices/adminAdminApiSlice";
import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRedhat } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";


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

  return (
    <header className="flex justify-between items-center bg-gray-800 p-4">
      <Link
        to="/admin"
        className="flex items-center text-xl font-bold  text-white"
      >
        <FaRedhat className="mr-2" /> MODULE
      </Link>

      <div className="flex justify-between items-center">
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
    </header>
  );
};

export default AdminHeader;
