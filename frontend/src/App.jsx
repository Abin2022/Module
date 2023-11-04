// import Header from "./components/Header";
// import AdminHeader from "./components/AdminHeader";
// import TutorDropdown from "./components/tutorComponent/TutorDropdown";

// import React from "react";
// import { Outlet,useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//    const location = useLocation()
//    const isAdminSide = location.pathname.startsWith("/admin" );
//    const isTutorSide = location.pathname.startsWith("/tutor/login")
//   return (
//     <>
//        {isAdminSide && <AdminHeader />}
//       {!isAdminSide && !isTutorSide && <Header />}
//       {isTutorSide && <TutorDropdown />}
//       <ToastContainer />
//       <div className="my-2">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default App;

import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import TutorDropdown from "./components/tutorComponent/TutorDropdown";

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const isAdminSide = location.pathname.startsWith("/admin");
  const isTutorSide = location.pathname.startsWith("/tutor/login");
  
  // State variable to keep track of tutor side
  const [isTutor, setIsTutor] = useState(isTutorSide);
+-
  // Update isTutor state when location changes
  useEffect(() => {
    setIsTutor(location.pathname.startsWith("/tutor"));
  }, [location.pathname]);

  return (
    <>
      {isAdminSide && <AdminHeader />}
      {!isAdminSide && isTutor && <TutorDropdown />}
      {!isAdminSide && !isTutor && <Header />}
      <ToastContainer />
      <div className="my-2">
        <Outlet />
      </div>
    </>
  );
};

export default App;

