



// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import _ from "lodash";

// const TutorListUserSide = ({ tutor }) => {
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTutor, setSelectedTutor] = useState({
//     id: "",
//     name: "",
//     email: "",
//   });
//   const [image, setImage] = useState(null);
//   const { tutorInfo } = useSelector((state) => state.tutorAuth);

  
//   const handleSearchDebounced = _.debounce((value) => {
//     setSearch(value);
//   }, 300);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     handleSearchDebounced(value);
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleSort = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };



//   const tutorfilter = tutor.filter(
//     (tutor) =>
//       tutor.name.toLowerCase().includes(search.toLowerCase()) ||
//       tutor.email.toLowerCase().includes(search.toLowerCase()) ||
//       tutor.qualification.toLowerCase().includes(search.toLowerCase()) 
//   );

//   const sortedTutors = [...tutorfilter].sort((a, b) => {
//     if (sortBy === "name") {
//       return a.name.localeCompare(b.name);
//     }
//         else if (sortBy === "email") {
//       return a.email.localeCompare(b.email);
//     }
//     else if (sortBy === "qualification"){
//       return a.qualification.localeCompare(b.qualification);
//     }
    
//     return 0;
//   });




//   const itemsPerPage = 4;
//   const totalPages = Math.ceil(sortedTutors.length / itemsPerPage);
//   const paginatedTutors = sortedTutors.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
// <div className="flex items-center justify-center mb-6">
//   <input
//     type="text"
//     placeholder="Search....."
//     value={search}
//     onChange={handleSearch} 
//     className="px-4 py-2 border w-64 focus:outline-none focus:ring focus:border-blue-300"
//   />
//   {/* {  console.log(search,"handleSearch")} */}
       
//   <select
//     value={sortBy}
//     onChange={handleSort}
//     className="px-4 py-2 border ml-4 focus:outline-none focus:ring focus:border-blue-300"
//   >
//     <option value="" className="text-gray-600">Sort By</option>
//     <option value="name" className="text-gray-600">Name</option>
//     <option value="email" className="text-gray-600">Email</option>
//     <option value="qualification" className="text-gray-600">Qualification</option>
//   </select>
// </div>
// <br />
// <br />

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   {paginatedTutors.map((tutor, index) => (
//     <div
//       key={index}
//       className="bg-white border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
//     >
//       <div className="p-4">
//         <h2 className="flex items-center font-bold justify-center mb-2 text-lg text-gray-800">
//           {tutor.name.toUpperCase()}
//         </h2>
//         <p className="text-gray-700 mb-2">Contact: {tutor.email}</p>
//         <p className="text-gray-700 mb-2">Experience: {tutor.experience}</p>
//         <p className="text-gray-700 mb-2">Qualification: {tutor.qualification}</p>
//       </div>
//     </div>
//   ))}
// </div>

// {/* Pagination Controls */}
// <div className="mt-8 flex justify-center space-x-2">
//   {[...Array(totalPages)].map((_, page) => (
//     <button
//       key={page}
//       onClick={() => setCurrentPage(page + 1)}
//       className={`px-4 py-2 border rounded-full ${
//         currentPage === page + 1 ? "bg-gray-700 text-white " : "text-gray-600 hover:bg-gray-200"
//       } focus:outline-none focus:ring focus:border-blue-300`}
//     >
//       {page + 1}
//     </button>
//   ))}
// </div>

//     </>
//   );
// };

// export default TutorListUserSide;



import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import _ from "lodash";

const TutorListUserSide = ({ tutor }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [image, setImage] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending
  const { tutorInfo } = useSelector((state) => state.tutorAuth);

  const handleSearchDebounced = _.debounce((value) => {
    setSearch(value);
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearchDebounced(value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tutorfilter = tutor.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.email.toLowerCase().includes(search.toLowerCase()) ||
      tutor.qualification.toLowerCase().includes(search.toLowerCase())
  );

  // const sortedTutors = [...tutorfilter].sort((a, b) => {
  //   const comparison = a[sortBy].localeCompare(b[sortBy]);

  //   return sortOrder === "asc" ? comparison : -comparison;
  // });

  const sortedTutors = [...tutorfilter].sort((a, b) => {
    const aValue = a[sortBy] || ""; 
    const bValue = b[sortBy] || ""; 
  
    const comparison = aValue.localeCompare(bValue);
  
    return sortOrder === "asc" ? comparison : -comparison;
  });
  

  const itemsPerPage = 4;
  const totalPages = Math.ceil(sortedTutors.length / itemsPerPage);
  const paginatedTutors = sortedTutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search....."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border w-64 focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={sortBy}
          onChange={handleSort}
          className="px-4 py-2 border ml-4 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" className="text-gray-600">
            Sort By
          </option>
          <option value="name" className="text-gray-600">
            Name
          </option>
          <option value="email" className="text-gray-600">
            Email
          </option>
          <option value="qualification" className="text-gray-600">
            Qualification
          </option>
        </select>
        <button
          onClick={handleSortOrderToggle}
          className="px-4 py-2 border ml-4 focus:outline-none focus:ring focus:border-blue-300"
        >
          {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>

      <br />
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedTutors.map((tutor, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="p-4">
              <h2 className="flex items-center font-bold justify-center mb-2 text-lg text-gray-800">
                {tutor.name.toUpperCase()}
              </h2>
              <p className="text-gray-700 mb-2">Contact: {tutor.email}</p>
              <p className="text-gray-700 mb-2">Experience: {tutor.experience}</p>
              <p className="text-gray-700 mb-2">Qualification: {tutor.qualification}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={`px-4 py-2 border rounded-full ${
              currentPage === page + 1
                ? "bg-gray-700 text-white "
                : "text-gray-600 hover:bg-gray-200"
            } focus:outline-none focus:ring focus:border-blue-300`}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default TutorListUserSide;
