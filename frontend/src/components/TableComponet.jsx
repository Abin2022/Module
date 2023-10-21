import React,{useState,useEffect}  from 'react';
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import { Button, Modal,  Form as BootstrapForm } from "react-bootstrap";
import { useDeleteUserMutation,useUpdateUserByAdminMutation,  useBlockUserMutation,
  useUnblockUserMutation, } from "../slices/adminAdminApiSlice"
import { toast } from "react-toastify";


function TableComponent({ users }) {
       //to handle search
      const [searchQuery, setSearchQuery] = useState('');
      const [actualData, setActualData] = useState([]);

      //delete things
      const [deleteConfirmation,setDeleteConfirmation ]=useState(false)
      const [userIdToDelete, setUserIdToDelete] = useState(null); // Track the user ID to delete

    

      //to handle search
      const handleSearch = (event) => {
        setSearchQuery(event.target.value);
      };
      
      //to handle search
      const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
   

    //delete things
    const [deleteUser, { isLoading }] = useDeleteUserMutation();  
    

    const handleDelete = async () =>{
        try{
            const responseFromApiCall = await deleteUser( {userId : userIdToDelete});
            toast.success("User Deleted Successfully");
            setUserIdToDelete(null)
            setDeleteConfirmation(false)
            window.location.reload();
        }catch(err){
          toast.error(err?.data?.message || err?.error)
        }
    }
   //update
   const [updateUserByAdmin, { isLoading: isUpdating }] = useUpdateUserByAdminMutation();

   const [userIdToUpdate, setUserIdToUpdate] = useState("");
    const [updateUserName, setUpdateUserName]=useState("");
    const [updateUserEmail, setUpdateUserEmail] = useState("");
   const [ showUpdateModal, setShowUpdateModal ] = useState(false);

   const handleOpenUpdateModal = (user) => {
    setUserIdToUpdate(user._id)
    setUpdateUserName(user.name);
    setUpdateUserEmail(user.email);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      const responseFromApiCall = await updateUserByAdmin({
        userId: userIdToUpdate,
        name: updateUserName,
        email: updateUserEmail
      });
      toast.success("User Updated Successfully.");
      setUserIdToUpdate(null); // Clear the user ID to update
      setShowUpdateModal(false); // Close the update modal

      // Reload the page to reflect the updated data
      window.location.reload();
      
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };



  //ss
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [refresher, setRefresher] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users");
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


  // const [isBlock] = useBlockUserMutation();  


  // const [blockUser,setBlockUser ]=useState(false)
  //     const [userIdToBlock, setUserIdToBlock] = useState(null);  // Track the user ID to delete

  // const handleBlockuser = async () =>{
  //     try{
  //         const responseFromApiCall = await isBlock( {userId : userIdToBlock});
  //         toast.success("User Blocked Successfully");
  //         setUserIdToBlock(null)
  //         setBlockUser(false)
  //         window.location.reload();
  //     }catch(err){
  //       toast.error(err?.data?.message || err?.error)
  //       // toast.success("User Blocked Successfully");
  //     }
  // }
  // //unblock user

  // const [isUnblock] =useUnblockUserMutation();

  // const [unBlockUser,setUnBlockUser]= useState(false);
  // const [userIdToUnBlockUser,setUserIdToUnBlockUser] = useState(null);
  
  //  const handleUnBlockuser = async()=>{
  //   try{
  //     const responseFromApiCall = await isUnblock( {userId :userIdToUnBlockUser } );
  //     toast.success("user Unblocked Sucessfully");
  //     setUserIdToUnBlockUser(null);
  //     setUnBlockUser(false)
  //     window.location.reload();
  //   }catch(err){
  //     toast.error(err?.data?.message || err?.error)
  //   }
  //  }


  return (
    <>
    <Form>
    <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
   
      <Form.Control style={{width:"500px"}} value={searchQuery} type="text" placeholder="Search" onChange={handleSearch} />
    </Form.Group>
  </Form>
  <br/>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>SL NO</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ACTION</th>
        <th>ACTION</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.map((user, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          
          <td><Button
                type="button"
                variant="danger"
                className="mt-3"
                onClick={() => {
                    setUserIdToDelete(user._id); // Set the user ID to delete
                    setDeleteConfirmation(true); // Open the confirmation dialog
                  }}
               
              >
                Delete
              </Button></td>
              <td>  <Button
                type="button"
                variant="primary"
                className="mt-3"
                onClick={() => handleOpenUpdateModal(user)}
               
              >
                Update
              </Button></td>

              <td className="py-2 px-4 text-center">
                  {user.isBlocked ? (
                    <Button
                      
                      type='button'  
                      className="mt-3"
                      variant='danger'
                      onClick={() => handleUnBlockUser(user._id)}         >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleBlockUser(user._id)}
                      className="mt-3"
                      variant='danger'
                      type='button'
                    >
                      Block
                    </Button>
                  )}
                </td>


              {/* <td className="border px-4 py-2">
                {user.isBlocked ? (
                  <Button className="mt-3" 
                  type="button"
                  variant="danger" 
                  onClick={()=>{
                    setUserIdToUnBlockUser(user_id);
                    setUnBlockUser(true)
                  }}
                  >
                    UnBlock
                  </Button>
                ) : (
                  <Button className="mt-3" type="button"
                  variant="danger"   onClick={()=>{
                    setUserIdToBlock(user._id); // Set the user ID to block
                    setBlockUser(true); // Open the confirmation dialog
                  }}>
                    Block
                  </Button>
                )}
              </td> */}
               {/* <tbody>
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
          </tbody> */}
        </tr>
      ))}
    </tbody>
  </Table>
 

   {/* update user model */}
   <Modal show={showUpdateModal} onHide={()=>setShowUpdateModal(false)}>
   <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm>
            <BootstrapForm.Group controlId="name">
              <BootstrapForm.Label>Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                value={updateUserName}
                onChange={(e) =>
                    setUpdateUserName(e.target.value)
                }
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                value={updateUserEmail}
                onChange={(e) =>
                    setUpdateUserEmail(e.target.value)
                }
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>

   </Modal>
      
   

    {/* Confirmation Dialog */}
    <Modal show={deleteConfirmation} onHide={() => setDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

       {/* block confirmation*/}
      {/* <Modal show={blockUser} onHide={() => setBlockUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Block this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setBlockUser(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleBlockuser} disabled={isLoading}>
            {isLoading ? "Blocking..." : "Block"}
          </Button>
        </Modal.Footer>
      </Modal> */}


         {/* Unblock confirmation*/}
         {/* <Modal show={unBlockUser} onHide={() => setUnBlockUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Un-Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to UnBlock this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUnBlockUser(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUnBlockuser} disabled={isLoading}>
            {isLoading ? "UnBlocking..." : "UnBlock"}
          </Button>
        </Modal.Footer>
      </Modal> */}


  </>
  );
}

export default TableComponent;
