// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import Form from "react-bootstrap/Form";
// import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
// import {
//   useUpdateUserByAdminMutation,
//   useDeleteUserMutation,
// } from "../slices/adminAdminApiSlice";
// import { toast } from "react-toastify";

// const TableComponent = ({ users }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showConfirmation, setShowConfirmation] = useState(false); // State for the confirmation dialog
//   const [userIdToDelete, setUserIdToDelete] = useState(null); // Track the user ID to delete

//   const [userIdToUpdate, setUserIdToUpdate] = useState("");
//   const [userNameToUpdate, setUserNameToUpdate] = useState("");
//   const [userEmailToUpdate, setUserEmailToUpdate] = useState("");
//   const [showUpdateModal, setShowUpdateModal] = useState(false); // State for the update modal

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const [deleteUser, { isLoading }] = useDeleteUserMutation();
//   const [updateUserByAdmin, { isLoading: isUpdating }] =
//     useUpdateUserByAdminMutation();

//   const handleOpenUpdateModal = (user) => {
//     setUserIdToUpdate(user._id);
//     setUserNameToUpdate(user.name);
//     setUserEmailToUpdate(user.email);
//     setShowUpdateModal(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       const responseFromApiCall = await updateUserByAdmin({
//         userId: userIdToUpdate,
//         name: userNameToUpdate,
//         email: userEmailToUpdate,
//       });
//       toast.success("User Updated Successfully.");
//       setUserIdToUpdate(null); // Clear the user ID to update
//       setShowUpdateModal(false); // Close the update modal

//       // Reload the page to reflect the updated data
//       window.location.reload();
//     } catch (err) {
//       toast.error(err?.data?.message || err?.error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const responseFromApiCall = await deleteUser({ userId: userIdToDelete });
//       toast.success("User Deleted Successfully.");
//       setUserIdToDelete(null); // Clear the user ID to delete
//       setShowConfirmation(false); // Close the confirmation dialog

//       // Reload the page to reflect the updated data
//       window.location.reload();
//     } catch (err) {
//       toast.error(err?.data?.message || err?.error);
//     }
//   };

//   return (
//     <>
//       <Form>
//         <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
//           <Form.Control
//             style={{ width: "500px" }}
//             value={searchQuery}
//             type="text"
//             placeholder="Search"
//             onChange={handleSearch}
//           />
//         </Form.Group>
//       </Form>
//       <br />
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>SL NO</th>
//             <th>NAME</th>
//             <th>EMAIL</th>
//             <th>ACTION</th>
//             <th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 {" "}
//                 <Button
//                   type="button"
//                   variant="primary"
//                   className="mt-3"
//                   onClick={() => handleOpenUpdateModal(user)}
//                 >
//                   Update
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   type="button"
//                   variant="danger"
//                   className="mt-3"
//                   onClick={() => {
//                     setUserIdToDelete(user._id); // Set the user ID to delete
//                     setShowConfirmation(true); // Open the confirmation dialog
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Update User Modal */}
//       <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update User</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <BootstrapForm>
//             <BootstrapForm.Group controlId="name">
//               <BootstrapForm.Label>Name</BootstrapForm.Label>
//               <BootstrapForm.Control
//                 type="text"
//                 value={userNameToUpdate}
//                 onChange={(e) => setUserNameToUpdate(e.target.value)}
//               />
//             </BootstrapForm.Group>
//             <BootstrapForm.Group controlId="email">
//               <BootstrapForm.Label>Email</BootstrapForm.Label>
//               <BootstrapForm.Control
//                 type="email"
//                 value={userEmailToUpdate}
//                 onChange={(e) => setUserEmailToUpdate(e.target.value)}
//               />
//             </BootstrapForm.Group>
//           </BootstrapForm>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleUpdate}
//             disabled={isUpdating}
//           >
//             {isUpdating ? "Updating..." : "Update"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Confirmation Dialog */}
//       <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowConfirmation(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
//             {isLoading ? "Deleting..." : "Delete"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default TableComponent;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../slices/adminApiSlice";
import ConfirmationModal from "../ConfirmationModal";

const UsersList = () => {
  const [actualData, setActualData] = useState([]);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [refresher, setRefresher] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setActualData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, [refresher]);

  const handleBlockUser = async (userId) => {
    const confirmBlock = window.confirm(
      "are you sure you want to block this user?"
    );
    if (confirmBlock) {
      try {
        await blockUser({ userId });

        toast.success("user blocked");

        setRefresher("blocked");
      } catch (err) {
        console.error("Error blocking user:", err);
        // Show an error toast
        toast.error("An error occurred while blocking the user.");
      }
    }
  };

  const handleUnBlockUser = async (userId) => {
    const confirmUnblock = window.confirm(
      "Are you sure you want to unblock this user?"
    );
    if (confirmUnblock) {
      try {
        await unblockUser({ userId });
        toast.success("User unblocked successfully");
        // Refetch user data and update state after unblocking
        setRefresher("unblocked");
      } catch (err) {
        console.error("Error unblocking user:", err);
        // Show an error toast
        toast.error("An error occurred while unblocking the user.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Users List</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actualData.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-center">{user._id}</td>
                <td className="py-2 px-4 text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">
                  {user.blocked ? (
                    <button
                      onClick={() => handleUnBlockUser(user._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
