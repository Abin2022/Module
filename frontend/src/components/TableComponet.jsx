

import React, { useState } from "react";
import {
  useUpdateUserByAdminMutation,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../slices/adminAdminApiSlice";
import { toast } from "react-toastify";

const TableComponent = ({ users }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  

  const [UpdateUser, { isLoading }] = useUpdateUserByAdminMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [blockUser, { isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isUnBlocking }] = useUnblockUserMutation();

  const handleSaveChanges = () => {
    const userData = {
      userId: selectedUser._id,
      name: selectedUser.name,
      email: selectedUser.email,
    };
    UpdateUser(userData);

    handleCloseModal();
    window.location.reload();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUserDelete = async (userId) => {
    await deleteUser({ userId });
    toast.success("user deleted successfully");
    window.location.reload();
  };

  const handleBlockuser = async (userId) => {
    await blockUser({ userId });
    toast.success("user blocked successfully");
    window.location.reload();
  };

  const handleUnBlockuser = async (userId) => {
    await unblockUser({ userId });
    toast.success("user unblocked successfully");
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const userfilter = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mt-4">
        <input
          className="w-48 mb-7 p-2 border rounded"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 ">Index</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userfilter.map((user, index) => (
            <tr key={index}>
              <td className="border p-2  ">{index + 1}</td>
              <td className="border p-2 ">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              {/* <td className="border p-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </button>
              </td> */}
              <td className="border p-2">
                {user.isBlocked ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUnBlockuser(user._id)}
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleBlockuser(user._id)}
                  >
                    Block
                  </button>
                )}
              </td>
              <td className="border p-2">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUserDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 p-4">
            <div className="modal-header text-xl font-semibold mb-4">
              Edit User
              <button
                className="float-right text-gray-700 hover:text-gray-900"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="Enter email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableComponent;
