// import { Navbar, Nav, div,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import {ss Link } from 'react-router-bootstrap';
import { useAdminLogoutMutation } from "../slices/adminAdminApiSlice";
import { adminLogout } from "../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <Link to="/admin" className="text-white">
        MODULE
      </Link>

      <div className="flex justify-between items-center">
        {adminInfo ? (
          <>
            <Link to="/admin/usersList" className="text-white" ml-4>
              User List
            </Link>

            <Link to="/admin/tutorList" className="text-white" ml-4>
              Tutor List
            </Link>

            <div className="flex items-center">
              {/* <p className="text-white mr-2">User List</p> */}
              <button
                type="button"
                onClick={logoutHandler}
                className="text-white bg-red-500 hover:bg-red-700 rounded p-2"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link to="/adminlogin" className="text-white">
            <FaSignInAlt />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
