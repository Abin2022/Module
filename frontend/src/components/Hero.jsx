import React from 'react'
import { Container, Card, Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const PROFILE_URL = "http://localhost:5000/images/";
    return (
    <div className=' py-5'>
    <Container className='d-flex justify-content-center'>
      <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
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
        {userInfo ? "Here is the home page Image" : "Here is the home page Image" } 

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
      </Card>
    </Container>
  </div>
  )
}

export default Hero