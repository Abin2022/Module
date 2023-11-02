import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
// import HomeScreenAdmin from "./screens/HomeScreenAdmin.jsx";
 import CourseList from "./components/userComponent/courseList.jsx"
import Viedo from "./components/userComponent/viedos.jsx"



//admin
import AdminHomeScreen from "./screens/AdminHomeScreen.jsx"
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx"
import AdminRegisterScreen from "./screens/AdminRegisterScreen.jsx"
 import UsersList from "./screens/usersList.jsx"
import TutorList from "./components/tutorComponent/tutorList.jsx";

 //tutor 
 import TutorLoginPage from "./components/tutorComponent/tutorLoginPage.jsx";
 import TutorPage from "./components/tutorComponent/tutorHome.jsx";
import TutorSignPage from "./components/tutorComponent/TutorSignupPage.jsx"
import TutorProfilePage from "./components/tutorComponent/tutorProfile.jsx"

import TutorHomePage from "./components/tutorComponent/HomePage.jsx"
import AddCourse from "./components/tutorComponent/AddCourse.jsx";
import AddVideo from "./components/tutorComponent/AddViedo.jsx"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* User side routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/courseList" element={<CourseList />} />
        <Route path="/viedo" element={<Viedo/>}/>
       
        <Route path="/tutor" element={<TutorPage />} />

       
       </Route>

       <Route>
        <Route   index={true} path="/tutor/login" element={<TutorLoginPage />} />
        <Route path="/tutor/signup" element={<TutorSignPage />} />
        <Route path="/tutor/home" element={<TutorHomePage />} />
        <Route path="/tutor/profile" element= {<TutorProfilePage/>}/>
        <Route path="/tutor/add-course" element= {<AddCourse/>}/>
        <Route path="/tutor/add-viedo" element={<AddVideo/>}/>
        
      </Route>
  
      {/* Admin side routes */}
      <Route path="/admin" element={<AdminHomeScreen />} />
      <Route path="/adminlogin" element={<AdminLoginScreen />} />
      <Route path="/adminregister" element={<AdminRegisterScreen />} />
      <Route path="/admin/usersList" element={<UsersList />} />
      <Route path="/admin/tutorList" element={<TutorList />} />
      
    </Route>
  )
  
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </Provider>
);
