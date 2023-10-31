import React from "react";
// import Link from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useViedoMutation } from "../../slices/userApiSlice";

const viedo = () => {
  return (
    <>
      <div class="flex justify-center mt-10 mb-10">
        <h2 class="flex justify-center mt-10 mb-10">
          {" "}
     
   
          ALL Course Video Which are Available for the specific Users{" "}
        </h2>
      </div>
    </>
  );
};

export default viedo;
