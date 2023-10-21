 import TableComponent from "../components/TableComponet"
import React from "react";
  import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const UsersList = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/usersList ");
        
        setUser(response.data.users);
        
        setLoading(false); 
      } catch (error) {
        toast.error(error);
        console.error("Error fetching users:", error);
        console.log("Error response data:", error.response.data); // Log the response data if available

        setLoading(false); 
      }
    };
   

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>USER LIST</h1>
      {loading ? <Loader/> : null}
      <TableComponent users={user} />
    </div>
  );
};

export default UsersList;