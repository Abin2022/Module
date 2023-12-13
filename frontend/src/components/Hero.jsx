import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const showWelcome = true; // Set your logic to determine if you want to show the welcome section

  return (
    <div>
      {userInfo && (
        <div
          className={`h-auto md:h-60 bg-gray-200 flex flex-col justify-center items-center ${
            showWelcome ? "show-welcome" : ""
          }`}
        >
          <div className="text-lg md:text-xl font-bold text-black font-mono text-center">
            Trusted by over 15,000 companies and millions of 
            <br/>
            learners around the world
          </div>
         
          <div className="absolute top-52 left-4 md:left-32 transform -translate-y-1/2 text-white text-2xl text-center">
            <h1 className="font-bold text-black font-mono">Walk your journey with Us</h1>
            <p className="text-black text-base font-mono whitespace-normal">
              Become a student and change your lives
            </p>
          </div>
          <div className="absolute top-52 right-4 md:right-32 transform -translate-y-1/2 text-white text-2xl text-center">
            <h4 className="font-bold text-black text-base font-mono whitespace-normal">
              More than 100k users |
              <br/>
               choose to learn with Module App.
            </h4>
          </div>
        </div>
      )}
      <div className="relative mt-1">
        <img
          src="https://img-c.udemycdn.com/notices/home_carousel_slide/image/1a871a12-4289-4d90-90e8-641d10a73f69.jpg"
          alt="tutor-banner"
          className="w-full"
        />
      </div>

      <div className="h-auto md:h-96">
        <h3 className="text-xl md:text-3xl font-serif mt-6 md:mt-10 text-center">
          Why MODULE ?
        </h3>
        <div className="flex flex-col md:flex-row m-4 md:m-6 mt-6">
          <div className="text-center w-full md:w-1/2 mx-2 md:mx-6 mb-4 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-200">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg"
              alt="banner2"
              className="mx-auto"
            />
            <div className="text-lg md:text-xl font-semibold">Build your career</div>
            <div className="text-sm md:text-base">
              Watch the course you want, in the way you want.
            </div>
          </div>

          <div className="text-center w-full md:w-1/2 mx-2 md:mx-6 mb-4 md:mb-0 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-200">
            <img
              src="https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg"
              alt="banner3"
              className="mx-auto"
            />
            <div className="text-lg md:text-xl font-semibold">Inspire new Things</div>
            <div className="text-base">
              Comment what you know and help others explore their interests,
              gain new skills, and advance their careers along with your.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
