import axios from "axios";
import React, { useEffect, useState } from "react";
import TutorTable from "./TutorTable";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"

const TutorList = () => {
  const [tutor, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() =>{
    const fetchTutor = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/tutorList")
          setTutor(response.data.tutor);

          console.log(tutor, 'tutor');
          setLoading(false)
        }catch(error){
          toast.error(error)
          console.error("Error fetching users:", error);
        console.log("Error response data:", error.response.data); // Log the response data if available
       setLoading(false)
        }
      
    }
    fetchTutor();
  },[])
  
   return (
    <div>
      <h1>TUTOR LIST</h1>
      {loading ? <Loader/>:null}
      <TutorTable tutor={tutor}/>
    </div>
   ) 

}
export default TutorList
