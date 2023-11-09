import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useBlockTutorMutation,
  useDeleteTutorMutation,
  useUnblockTutorMutation 
}from "../../slices/adminAdminApiSlice"


const TutorTable = ({ tutor }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [deleteTutor, {isLoading:isDeleting} ] = useDeleteTutorMutation() ;
  const [blockTutor ,{isBlocking}] = useBlockTutorMutation();
  const [unblockTutor , {isUnBlocking }] = useUnblockTutorMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSaveChanges = ( ) =>{
    const tutorData = {
      tutorId : selectedTutor._id,
      name:selectedTutor.name,
      email:selectedTutor.email
    }
    updateTutor(tutorData)

    handleCloseModal()
    window.location.reload();
  }

  const handleTutorDelete = async (tutorId) =>{
    await deleteTutor ({tutorId});
    toast.success("tutor deleted Succesfully");
    window.location.reload()
  }

  const handleBlocktutor = async (tutorId) => {
    await blockTutor ({tutorId});
    toast.success("tutor BLocked sucessfully");
    window.location.reload()
  }

  const handleUnBlocktutor = async (tutorId) => {
    await unblockTutor ({tutorId});
    toast.success("tutor BLocked sucessfully");
    window.location.reload()
  }

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
      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search....."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border w-64"
          />
        </div>
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-slate-400">
          <tr>
            <th className="px-4 py-2 ">Index</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Qualification</th>

            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutorfilter.map((tutor, index) => (
            <tr key={index} className=" hover:bg-slate-200 ">
              <td className="border px-4 py-2 ">{index + 1}</td>
              <td className="border px-4 py-2 ">{tutor.name}</td>
              <td className="border px-4 py-2 ">{tutor.email}</td>
              <td className="border px-4 py-2 ">{tutor.experience}</td>
              <td className="border px-4 py-2 ">{tutor.qualification}</td>


              {/* <td className="border px-4 py-2"></td> */}
              <td className="border px-4 py-2">
                {tutor.isBlocked ? (
                  <button className=" bg-green-600 w-16 rounded text-white ml-2"
                  onClick={() => handleUnBlocktutor(tutor._id)}
                  >
                    UnBlock
                  </button>
                ) : (
                  <button className=" bg-red-600 w-16 rounded text-white ml-2"
                  onClick={() => handleBlocktutor(tutor._id)}
                  >
                    Block
                  </button>
                )}
              </td>
              <td className="border px-4 py-2">
                <button className=" bg-red-600 w-16 rounded text-white ml-2"
                 onClick={() => handleTutorDelete(tutor._id)}
                >
                Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TutorTable;




