import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTutorLoginMutation } from "../slices/tutorApiSlice";
import { tutorLogout } from "../slices/tutorAuthSlice";

import { Link } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
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
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>MODULE</Navbar.Brand>
          </Link>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                <Link to = '/courseList'>
                <Navbar.Brand>
                Course
                </Navbar.Brand>
               </Link>


               <Link to = '/tutor'>
                <Navbar.Brand>
                Tutor
                </Navbar.Brand>
               </Link>

               
               <Link to = '/profile'>
               <Navbar.Brand>
                Profile
                </Navbar.Brand>
               </Link>

               

                <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ) : (
                <>
                <Link to = '/courseList'>
                <Navbar.Brand>
                Course
                </Navbar.Brand>
               </Link>


               <Link to = '/tutor'>
                <Navbar.Brand>
                Tutor
                </Navbar.Brand>
               </Link>

               
               <Link to = '/profile'>
               <Navbar.Brand>
                Profile
                </Navbar.Brand>
               </Link>

                  <Link to="/login">
                   
                      <FaSignInAlt /> Sign In
                   
                  </Link>

                  <Link to="/register">
                   
                      <FaSignOutAlt /> Sign up
                    
                  </Link>
                
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
