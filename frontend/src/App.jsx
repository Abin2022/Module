import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import TutorDropdown from "./components/tutorComponent/TutorDropdown";

import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
   const location = useLocation()
   const isAdminSide = location.pathname.startsWith("/admin" );
   const isTutorSide = location.pathname.startsWith("/tutor/login")
  return (
    <>
       {isAdminSide && <AdminHeader />}
      {!isAdminSide && !isTutorSide && <Header />}
      {isTutorSide && <TutorDropdown />}
      <ToastContainer />
      <div className="my-2">
        <Outlet />
      </div>
    </>
  );
};

export default App;







// import React from "react";
// import Header from "./components/userComponents/Header.jsx";
// import { Outlet, useLocation } from "react-router-dom";
// import Footer from "./components/userComponents/Footer.jsx";

// const App = () => {
//   const location = useLocation();

//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isAdminlogin = location.pathname.includes("/admin/login");
//   const isLoginTutor = location.pathname.includes("tutor");
//   return (
//     <>
//       {!isAdminlogin &&
//         (isAdminRoute ? "" : <Header isLoginTutor={isLoginTutor} />)}

//       <Outlet />
//       <Footer />
//     </>
//   );
// };

// export default App;