import { Navbar, Nav, Container,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
// import {ss Link } from 'react-router-bootstrap';
import { useAdminLogoutMutation } from '../slices/adminAdminApiSlice';
import { adminLogout } from '../slices/adminAuthSlice'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const AdminHeader = () => {

  const { adminInfo } = useSelector((state)=>state.adminAuth)

  const dispath = useDispatch()
  const navigate = useNavigate()

  const [logoutApi]= useAdminLogoutMutation()
    
  const logoutHandler =async()=>{
    try {
       await logoutApi().unwrap()
       dispath(adminLogout())
       navigate('/adminlogin')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <Link to='/admin'>
            <Navbar.Brand>MODULE</Navbar.Brand>
            </Link>
            {/* <Link to = '/admin/usersList'>
             <Navbar.Brand>User List</Navbar.Brand>
            </Link> */}
            
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    {adminInfo ? (
                        <>
                        <Link to = '/admin/usersList'>
                                <Navbar.Brand>
                                User List
                                </Navbar.Brand>
                        </Link>
                        
                        <Link to = '/admin/tutorList'>
                                <Navbar.Brand>
                                Tutor List
                                </Navbar.Brand>
                        </Link>

                        <NavDropdown title={adminInfo.name} id = 'username'>
                            <Link to = '/admin/usersList'>
                                <NavDropdown.Item>
                                User List
                                </NavDropdown.Item>
                            </Link>
                           
                            <Link to = '/admin/logout'>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </Link>
                        </NavDropdown>
                        </>
                    )  : (
                <>
                 <Link to='/adminlogin'>
                            
                                <FaSignInAlt/>Sign In
                            
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

export default AdminHeader;