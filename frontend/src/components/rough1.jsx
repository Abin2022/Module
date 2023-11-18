


import React from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const HOME_URL =
  
    "https://img-c.udemycdn.com/notices/home_carousel_slide/image/1a871a12-4289-4d90-90e8-641d10a73f69.jpg";
    // "https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg";

  return (
    <div className="py-5">
      <div className="d-flex justify-content-center">
        <div className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? <></> : ""}
          <div className="text-center mb-4">
            {userInfo ? (
              <div className="py-2 h-screen bg-white">
                <img
                  src={HOME_URL}
                  alt={<p className="text-xl font-bold mb-4">User Side Image</p>}
                  style={{
                    width: "1879px",
                    height: "900px",
                  }}
                />
                <div className="container mx-auto flex justify-center">
                  {/* Additional content if needed */}
                </div>
              </div>
            ) : (
              <img
                src={HOME_URL}
                alt={<p className="text-xl font-bold mb-4">User Side Image</p>}
                style={{
                  width: "2100px",
                  height: "900px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <div className="d-flex">
            {userInfo ? (
              ""
            ) : (
              <>
                {/* Additional content if needed */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;