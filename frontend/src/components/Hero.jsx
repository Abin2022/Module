import React from 'react'
// import { Container, Card, Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const PROFILE_URL = "http://localhost:5000/images/";
    return (
    <div className=' py-5'>
    <div className='d-flex justify-content-center'>
      <div className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        {userInfo ? (
        <>
          {userInfo.image && (
          <img 
              src={PROFILE_URL + userInfo.image} 
              alt={userInfo.name}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
              }} 
              />
            )}
        </>):("")}
        {/* <h1 className='text-center mb-4'>{userInfo ? `Welcome ${userInfo.name}` : '' }</h1> */}
        <p className='text-center mb-4'>
        {/* {userInfo ? `Email : ${userInfo.email}` : "Here is the home page Image" }  */}
        {userInfo ?  <div className="py-5 h-screen  bg-gray-100">
      <div className="container mx-auto flex justify-center">
        <div className="bg-white p-5 flex flex-col items-center rounded-lg shadow-lg w-3/4">
          <p className="text-xl font-bold mb-4">User Side Image</p>
         
        </div>
      </div>
     
    </div>
 : "Here is the home page Image" } 

        </p>
        <div className='d-flex'>
        {userInfo ? (
             ""
            ) : (
                <>
                {/* <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="secondary">Sign Up</Button>
                </LinkContainer> */}
              </>
            )}
          
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero