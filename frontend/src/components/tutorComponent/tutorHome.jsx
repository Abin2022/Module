// import Link from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
 import TutorListUserSide from "./TutorListUserSide";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"

const tutorHome = () => {
  const [tutor, setTutor] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/tutorList"
        );
        setTutor(response.data.tutor);

        console.log(tutor, "tutor");
        setLoading(false);
      } catch (error) {
        toast.error(error);
        console.error("Error fetching users:", error);
        console.log("Error response data:", error.response.data); 
        setLoading(false);
      }
    };
    fetchTutor();
  }, []);

  return (
    <>
      <div class="flex  right-32 mt-10 mb-10">
        <Link to="/tutor/login">
         
          <button className="bg-blue-500 hover:bg-gray-700 text-black hover:text-white font-bold py-4 px-6 rounded ml-9">
  Tutor Registration
</button>

          
        </Link>
       
      </div>
      {/* <h2 className="flex justify-center mt-10 mb-10">
        {" "}
        Video Available for Users....{" "}
      </h2> */}
      <div>
      <h1 className=" text-black font-bold flex items-center justify-center mb-4" >TUTOR LIST</h1>
      <br></br>
      {loading ? <Loader/>:null}
      <TutorListUserSide tutor={tutor}/>
    </div>
    </>
  );
};

export default tutorHome;


