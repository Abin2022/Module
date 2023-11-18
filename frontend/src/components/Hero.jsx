{
  /* <video width="100%" autoPlay muted loop>
          <source src={bannerVideo}/>
        </video> */
}

import React, { useState, useEffect } from "react";
// const bannerVideo =  "https://www.youtube.com/watch?v=uJS0sBoxOMo&ab_channel=Preply";

import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Triggering the welcome animation after a delay (you can adjust the delay)
    const timeout = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {userInfo && (
        <div
          className={`h-auto md:h-60 bg-gray-200 flex flex-col justify-center items-center ${
            showWelcome ? "show-welcome" : ""
          }`}
        >
          <div className= "text-xl font-bold text-black font-mono">
            Trusted by over 15,000
          </div>
          <div className="text-black text-base font-mono  whitespace-normal">
          companies and millions of learners around the world
          </div>
          <div className="absolute top-52 left-32 transform -translate-y-1/2 text-white text-2xl">
            <h1 className="font-bold text-black font-mono">
              Walk your journey with Us
            </h1>
            
            <p className="text-black text-base font-mono  whitespace-normal">
              Become a student and <br /> change your lives
            </p>
          </div>
          <div className="absolute top-52 right-32 transform -translate-y-1/2 text-white text-2xl">
            <h4 className="font-bold text-black text-base font-mono  whitespace-normal">
               More than 100k  users | <br /> 
               <div>
                 <p className="text-black text-base font-mono  whitespace-normal" >choose to learn with Module App.</p>
                 </div>
            </h4>
            
          </div>
        </div>
      )}
      <div className="relative mt-1">
        <img
          // src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
          src="https://img-c.udemycdn.com/notices/home_carousel_slide/image/1a871a12-4289-4d90-90e8-641d10a73f69.jpg"
          alt="tutor-banner"
          className="w-full"
        />
      </div>

      <div className="h-auto md:h-96">
        <h3 className="text-3xl font-serif mt-10 text-center">
          Why MODULE ?
        </h3>
        <div className="flex flex-col md:flex-row m-4 md:m-6 mt-6">
          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6 mb-4 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-200">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg"
              alt="banner2"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Build your career</div>
            <div className="text-base">
             Watch the course you want, in the way you want.
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6 mb-4 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-200">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg"
              alt="banner3"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Inspire new Things</div>
            <div className="text-base">
              Comment what you know and help others explore their interests,
              gain new skills, and advance their careers along with your.
            </div>
          </div>

          <div className="text-center w-full md:w-1/3 mx-2 md:mx-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-200">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg"
              alt="banner4"
              className="mx-auto"
            />
            <div className="text-xl font-semibold">Get Certificate</div>
            <div className="text-base">
              There are many course which offers certification for specific courses 
            </div>
          </div>
        </div>
      </div>

      {/* {userInfo && (
                <div className="h-auto md:h-60 bg-gray-200 flex flex-col justify-center items-center">
                 
                  <div className="text-3xl font-serif leading-loose">
                    Explore, Create, Teach with us
                  </div>
                </div>
              )} */}
    </div>
  );
};

export default Hero;
