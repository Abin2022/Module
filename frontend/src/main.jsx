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
import CourseList from "./components/userComponent/courseList.jsx";
import Viedo from "./components/userComponent/viedos.jsx";
import SubscriptionPlans from"./components/userComponent/subscriptionPlans.jsx";
import CourseListUserSide from "./components/userComponent/courseList.jsx";
import MyLearningPage from "./components/userComponent/MyLearningPage.jsx";


//admin
import AdminHomeScreen from "./screens/AdminHomeScreen.jsx";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import AdminRegisterScreen from "./screens/AdminRegisterScreen.jsx";
import UsersList from "./screens/usersList.jsx";
import TutorList from "./components/tutorComponent/tutorList.jsx";
import CourseLists from "./components/adminComponent/CourseList.jsx";
// import AddPlanModel from "./components/adminComponent/AddPlanModel.jsx"
import SubscriptionListAdminSide from "./components/adminComponent/SubcriptionPlan.jsx"

//tutor
import TutorLoginPage from "./components/tutorComponent/tutorLoginPage.jsx";
import TutorPage from "./components/tutorComponent/tutorHome.jsx";
import TutorSignPage from "./components/tutorComponent/TutorSignupPage.jsx";
import TutorProfilePage from "./components/tutorComponent/tutorProfile.jsx";
import DomainList from "./components/adminComponent/DomainList.jsx";
import TutorHomePage from "./components/tutorComponent/HomePage.jsx";
import AddCourse from "./components/tutorComponent/AddCourse.jsx";
import AllCoursesPage from "./components/tutorComponent/AllCoursesPage.jsx";




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* User side routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/single-course" element={<CourseList />} />
        <Route path="/videos" element={<Viedo />} />
        <Route path="/instructor" element={<TutorPage />} />
        <Route path="/getApprovedCourses" element={<CourseListUserSide/>}/>
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans/>} />


      </Route>
      


      {/* Tutor side routes */}
      <Route>
        <Route index={true} path="/tutor/login" element={<TutorLoginPage />} />
        <Route path="/tutor/signup" element={<TutorSignPage />} />
        <Route path="/tutor/home" element={<TutorHomePage />} />
        <Route path="/tutor/profile" element={<TutorProfilePage />} />
        <Route path="/tutor/add-course" element={<AddCourse />} />
        <Route path="/tutor/courses" element={<AllCoursesPage />} />
      </Route>



      {/* Admin side routes */}
      <Route path="/admin" element={<AdminHomeScreen />} />
      <Route path="/adminlogin" element={<AdminLoginScreen />} />
      <Route path="/adminregister" element={<AdminRegisterScreen />} />
      <Route path="/admin/usersList" element={<UsersList />} />
      <Route path="/admin/tutorList" element={<TutorList />} />
      <Route path="/admin/domain" element={<DomainList />} />
      <Route path="/admin/courseList" element={<CourseLists />} />
      {/* <Route path="/admin/add-plans" element={<AddPlanModel/>}/> */}
      <Route path="/admin/get-plans" element={<SubscriptionListAdminSide/>}/>

      
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
