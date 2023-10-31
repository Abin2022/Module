import React, { useState, useEffect } from 'react';
import { useDeleteUserMutation, useUpdateUserByAdminMutation, useBlockUserMutation, useUnblockUserMutation } from "../slices/adminAdminApiSlice";
import { toast } from "react-toastify";

function TableComponent({ users }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [actualData, setActualData] = useState([]);
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [updateUserName, setUpdateUserName] = useState("");
  const [updateUserEmail, setUpdateUserEmail] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserByAdmin] = useUpdateUserByAdminMutation();
  // const [blockUser] = useBlockUserMutation();
  // const [unblockUser] = useUnblockUserMutation();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const responseFromApiCall = await deleteUser({ userId: userIdToDelete });
      toast.success("User Deleted Successfully");
      setUserIdToDelete(null);
      setDeleteConfirmation(false);
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUpdateModal = (user) => {
    setUserIdToUpdate(user._id);
    setUpdateUserName(user.name);
    setUpdateUserEmail(user.email);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const responseFromApiCall = await updateUserByAdmin({
        userId: userIdToUpdate,
        name: updateUserName,
        email: updateUserEmail
      });
      toast.success("User Updated Successfully.");
      setUserIdToUpdate(null);
      setShowUpdateModal(false);
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleBlockUser = async (userId) => {
  //   const confirmBlock = window.confirm("Are you sure you want to block this user?");
  //   if (confirmBlock) {
  //     try {
  //       await blockUser({ userId });
  //       toast.success("User blocked");
  //       window.location.reload();
  //     } catch (err) {
  //       console.error("Error blocking user:", err);
  //       toast.error("An error occurred while blocking the user.");
  //     }
  //   }
  // };

  // const handleUnBlockUser = async (userId) => {
  //   const confirmUnblock = window.confirm("Are you sure you want to unblock this user?");
  //   if (confirmUnblock) {
  //     try {
  //       await unblockUser({ userId });
  //       toast.success("User unblocked successfully");
  //       window.location.reload();
  //     } catch (err) {
  //       console.error("Error unblocking user:", err);
  //       toast.error("An error occurred while unblocking the user.");
  //     }
  //   }
  // };

  
  const [isBlock] = useBlockUserMutation();  


  const [blockUser,setBlockUser ]=useState(false)
      const [userIdToBlock, setUserIdToBlock] = useState(null);  // Track the user ID to delete

  const handleBlockuser = async () =>{
      try{
          const responseFromApiCall = await isBlock( {userId : userIdToBlock});
          toast.success("User Blocked Successfully");
          setUserIdToBlock(null)
          setBlockUser(false)
          window.location.reload();
      }catch(err){
        toast.error(err?.data?.message || err?.error)
        // toast.success("User Blocked Successfully");
      }
  }
  //unblock user

  const [isUnblock] =useUnblockUserMutation();

  const [unBlockUser,setUnBlockUser]= useState(false);
  const [userIdToUnBlockUser,setUserIdToUnBlockUser] = useState(null);
  
   const handleUnBlockuser = async()=>{
    try{
      const responseFromApiCall = await isUnblock( {userId :userIdToUnBlockUser } );
      toast.success("user Unblocked Sucessfully");
      setUserIdToUnBlockUser(null);
      setUnBlockUser(false)
      window.location.reload();
    }catch(err){
      toast.error(err?.data?.message || err?.error)
    }
   }


  return (
    <div className="mt-6">
      <div className="mb-4">
        <input
          className="border rounded py-2 px-4 w-96"
          value={searchQuery}
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4">SL NO</th>
            <th className="py-2 px-4">NAME</th>
            <th className="py-2 px-4">EMAIL</th>
            <th className="py-2 px-4">ACTION</th>
            <th className="py-2 px-4">ACTION</th>
            <th className="py-2 px-4">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="py-3  px-6">{index + 1}</td>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => {
                    setUserIdToDelete(user._id);
                    setDeleteConfirmation(true);
                  }}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleOpenUpdateModal(user)}
                  disabled={isLoading}
                >
                  Update
                </button>
              </td>


        <td className="border px-4 py-2">
                {user.isBlocked ? (
                  <button className="mt-3" 
                  type="button"
                  variant="danger" 
                  onClick={()=>{
                    setUserIdToUnBlockUser(user_id);
                    setUnBlockUser(true)
                  }}
                  >
                    UnBlock
                  </button>
                ) : (
                  <button   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" type="button"
                  variant="danger"   onClick={()=>{
                    setUserIdToBlock(user._id); // Set the user ID to block
                    setBlockUser(true); // Open the confirmation dialog
                  }}>
                    Block 
                  </button>
                )}
                 
             
                
              </td> 
               <tbody>
            {actualData.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ?    "bg-white" :"bg-red-500"  }
              >
                <td className="py-2 px-4 text-center">{user._id}</td>
                <td className="py-2 px-4 text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">
                  {user.blocked ? (
                    <button
                      onClick={() => handleUnBlockUser(user._id)}
                      className="mt-3"
                      variant='danger'
                      type='button'                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="mt-3"
                      variant='danger'
                      type='button'
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody> 



              {/* <td className="py-2 px-4 text-center">
                {user.isBlocked ? (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => handleUnBlockUser(user._id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    onClick={() => handleBlockUser(user._id)}
                  >
                    Block
                  </button>
                )}
              </td> */}




            </tr>
          ))}
        </tbody>
      </table>

      {/* Add your modals here with Tailwind CSS styles */}


      <div className={`fixed inset-0 ${deleteConfirmation ? 'flex' : 'hidden'} items-center justify-center z-50`}>
  <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>

  <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-lg z-50">
    <div className="modal-content py-4 px-6">
      <h3 className="text-2xl font-semibold mb-4">Confirm Deletion</h3>
      <p className="text-gray-700 mb-6">Are you sure you want to delete this user?</p>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-4 hover:bg-gray-400"
          onClick={() => setDeleteConfirmation(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
</div>





<div className={`fixed inset-0 ${showUpdateModal ? 'flex' : 'hidden'} items-center justify-center z-50`}>
  <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>

  <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-lg z-50">
    <div className="modal-content py-4 px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Update User</h3>
        <button className="modal-close" onClick={() => setShowUpdateModal(false)}>
          <span>&times;</span>
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          value={updateUserName}
          onChange={(e) => setUpdateUserName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
          value={updateUserEmail}
          onChange={(e) => setUpdateUserEmail(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-4 hover:bg-gray-400"
          onClick={() => setShowUpdateModal(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
          onClick={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  </div>
</div>


<div className={`fixed inset-0 ${blockUser ? 'flex' : 'hidden'} items-center justify-center z-50`}>
  <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>

  <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-lg z-50">
    <div className="modal-content py-4 px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Confirm Block</h3>
        <button className="modal-close" onClick={() => setBlockUser(false)}>
          <span>&times;</span>
        </button>
      </div>
      <p className="text-gray-600 mb-6">Are you sure you want to Block this user?</p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-4 hover:bg-gray-400"
          onClick={() => setBlockUser(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
          onClick={handleBlockuser}
          disabled={isLoading}
        >
          {isLoading ? "Blocking..." : "Block"}
        </button>
      </div>
    </div>
  </div>
</div>



<div className={`fixed inset-0 ${unBlockUser ? 'flex' : 'hidden'} items-center justify-center z-50`}>
  <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>

  <div className="modal-container bg-white w-96 mx-auto rounded-lg shadow-lg z-50">
    <div className="modal-content py-4 px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold">Confirm Un-Block</h3>
        <button className="modal-close" onClick={() => setUnBlockUser(false)}>
          <span>&times;</span>
        </button>
      </div>
      <p className="text-gray-600 mb-6">Are you sure you want to UnBlock this user?</p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-4 hover:bg-gray-400"
          onClick={() => setUnBlockUser(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
          onClick={handleUnBlockuser}
          disabled={isLoading}
        >
          {isLoading ? "UnBlocking..." : "UnBlock"}
        </button>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}

export default TableComponent;
