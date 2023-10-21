

import React from 'react';
// import Link from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

const tutorHome=()=> {

  return (
    <div class="flex justify-center mt-10 mb-10">


<Link to="/tutor/login">
    <button class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" >  
      Tutor Registration
    </button>
    </Link>
   

  </div>
  
  
  )
}

export default tutorHome


