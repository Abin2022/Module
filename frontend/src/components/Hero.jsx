import React from 'react'
import { useSelector } from 'react-redux';

const Hero = () => {
  const {userInfo} = useSelector((state)=> state.auth)
 
  // const  HOME_URL = "https://thumbs.dreamstime.com/b/online-learning-composition-homeschooling-isometric-student-watching-lecture-laptop-library-timetable-d-vector-241465997.jpg";
  const HOME_URL = "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg"
    return (
    <div className=' py-5'>
    <div className='d-flex justify-content-center'>
      <div className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        {userInfo ? (
        <>
         
        </>):("")}
        {/* <h1 className='text-center mb-4'>{userInfo ? `Welcome ${userInfo.name}` : '' }</h1> */}
        <p className='text-center mb-4'>
        {/* {userInfo ? `Email : ${userInfo.email}` : "Here is the home page Image" }  */}
        {userInfo ?  <div className="py- 2 h-screen  bg-white">
        <img 
              src={HOME_URL} 
              alt={<p className="text-xl font-bold mb-4">User Side Image</p>}
              style={{
                width: '2100px',
                height: '900px',
               
                objectFit: 'cover',
              }} 
            
              />
      <div className="container mx-auto flex justify-center">
        {/* <div className="bg-white p-5 flex flex-col items-center rounded-lg shadow-lg w-3/4"> */}
          {/* <p className="text-xl font-bold mb-4">User Side Image</p> */}
         
         
        {/* </div> */}
      </div>
     
    </div>
 :  
 <img 
 src={HOME_URL} 
 alt={<p className="text-xl font-bold mb-4">User Side Image</p>}
 style={{
   width: '2100px',
   height: '900px',
  
   objectFit: 'cover',
 }} 

 />
 } 

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