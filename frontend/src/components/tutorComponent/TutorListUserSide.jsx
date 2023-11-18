


import React, { useState } from "react";
import { toast } from "react-toastify";
import {  useSelector } from "react-redux";


const TutorListUserSide = ({ tutor }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const { tutorInfo } = useSelector((state) => state.tutorAuth);


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };





  const handleCloseModal = () =>{
    setShowModal(false)
  }

  const tutorfilter = tutor.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.email.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <>
    <div className="flex items-center justify-center mb-4">
      <input
        type="text"
        placeholder="Search....."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border w-64"
      />
    </div>
    <br></br>
    <br></br>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tutorfilter.map((tutor, index) => (
        <div
          key={index}
          className="bg-white border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
        
          
  {/* <img
     src={tutor.image}
    alt={tutor.name}
    
    className=" justify-center w-40 h-40 border-gray-700 mx-auto shadow-xl inline-block"
  /> */}


          <div className="p-4">
          <h2 className="flex items-center font-bold justify-center mb-2">{tutor.name.toUpperCase()}</h2>
            <p className="text-gray-700 mb-2">Contact     : {tutor.email}</p>
            <p className="text-gray-700 mb-2">Experience: {tutor.experience}</p>
            <p className="text-gray-700 mb-2">Qualification: {tutor.qualification}</p>
            

          </div>
        </div>
      ))}
    </div>
  </>
  
  );
};

export default TutorListUserSide;



