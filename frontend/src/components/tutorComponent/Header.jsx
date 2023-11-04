


// // import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// // import { useSelector, useDispatch } from "react-redux";

// // // import { useAdminLogoutMutation } from "../slices/adminAdminApiSlice";
// // // import { adminLogout } from "../slices/adminAuthSlice";

// // import { useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";
// // import { FaRedhat } from "react-icons/fa";
// // import { tutorLogout } from "../../slices/tutorAuthSlice";


// // const TutorDropdown =() =>{
// //   const tutorInfo = useSelector((state) => state.tutorAuthSlice.tutorInfo)

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const logoutHandler = async() => {
// //     try{
// //       dispatch(tutorLogout());
// //       navigate("/tutor/login")
// //     }catch (err){
// //       console.log(err);
// //     }
// //   }
  
// //   return (
// //     <header className="flex justify-between items-center bg-gray-800 p-4">
// //     <Link
// //       to="/admin"
// //       className="flex items-center text-xl font-bold  text-white"
// //     >
// //       <FaRedhat className="mr-2" /> MODULE TUTOR
// //     </Link>

// //     <div className="flex justify-between items-center">
// //       {tutorInfo? (
// //         <>
// //           <Link
// //             to="/admin/usersList"
// //             className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
// //           >
// //             Profile
// //           </Link>

// //           <Link
// //             to="/admin/tutorList"
// //             className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
// //           >
// //             Viedo
// //           </Link>

// //           <div className="flex items-center">
// //             {/* <p className="text-white mr-2">User List</p> */}
// //             <button
// //               type="button"
// //               onClick={logoutHandler}
// //               className="text-white bg-red-700 hover:bg-red-700 rounded p-2"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </>
// //       ) : (
// //         <Link
// //           to="/tutor/login"
// //           className="hover:bg-gray-400 bg-gray-800 text-white font-bold py-2 px-2 rounded"
// //         >
// //           Sign In <FaSignInAlt />
// //         </Link>
// //       )}
// //     </div>
// //   </header>
// //   )


// // }

// // export default TutorDropdown;










// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";
// import { BiLogOut } from "react-icons/bi";
// import { useTutorlogoutMutation } from "../../slices/tutorApiSlice";
// import { tutorLogout } from "../../slices/tutorAuthSlice";

// const TutorDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const [tutorLogoutApi] = useTutorlogoutMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       await tutorLogoutApi().unwrap();
//       dispatch(tutorLogout());
//       navigate("/tutor/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="text-black hover:text-blue-600 cursor-pointer"
//       >
//         <FaUserCircle className="h-9 w-6 pb-2" />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-32 rounded-md hover:shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//           <div
//             className="py-1"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             <Link to="/tutor/profile">
//               <button
//                 className="block px-2 py-2 text-base text-black hover:text-blue-600"
//                 role="menuitem"
//               >
//                 Profile
//               </button>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className=" px-2 py-2 flex items-center text-base text-black hover:text-red-600"
//               role="menuitem"
//             >
//               Logout
//               <BiLogOut className="ml-2" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorDropdown;

