// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import TutorTable from "./TutorTable";

// const TutorList = () => {
//   const [tutor, setTutor] = useState([]);

//   const getTutor = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/tutor", {
//         //url
//         withCredentials: true,
//       });
//       console.log(res.data);
//       setTutor(res.data);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     }
//   };

//   useEffect(() => {
//     getTutor();
//   }, []);

//   return (
//     <div>
//       <h1 className="mb-5 font-semibold">Tutors List</h1>
//       <TutorTable tutor={tutor} />
//     </div>
//   );
// };

// export default TutorList;




// import TableComponent from "../../components/tutorComponent/TutorTable"
import TableComponent from "../../components/TableComponet";
import React from "react";
  import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
 import Loader from "../../components/Loader";


const TutorsList = () => {
  const [tutor, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchTutor = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/tutorList ");
        
        setTutor(response.data.tutor);
        
        setLoading(false); 
      } catch (error) {
        toast.error(error);
        console.error("Error fetching users:", error);
        console.log("Error response data:", error.response.data); // Log the response data if available

        setLoading(false); 
      }
    };
   

    fetchTutor();
  }, []);

  return (
    <div>
      <h1>TUTOR LIST</h1>
      {loading ? <Loader/> : null}
      <TableComponent users={tutor} />
    </div>
  );
};

export default TutorsList;