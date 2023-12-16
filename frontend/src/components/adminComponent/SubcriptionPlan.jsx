import React, { useState, useEffect } from "react";
import AddPlanModal from "./AddPlanModel";
import { useGetAdminPlansMutation } from "../../slices/adminAdminApiSlice";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';


const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState("");

  const [getPlans]=useGetAdminPlansMutation();

  useEffect(()=>{
    fetchPlanData();
    setRefresher(false)
  },[refresher])

  const fetchPlanData=async ()=>{
    try {
        const response=await getPlans().unwrap()

         setPlans(response)
       
    } catch (error) {
        console.log(error);
        toast.error('something went wrong')

    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher("changed");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-start">

        <button
          onClick={openModal}
          className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Add new Plan
        </button> 
        </div>


        <div className="flex justify-end ">
        
        {/* <Link to="/admin/getsubscriptionlist">
        <button
          
          className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Get Subscribers List
        </button></Link> */}
       </div>
      
      </div>
      <h2 className="text-3xl font-bold text-gray-800">Subscription Plans</h2>
      <br></br>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Plan</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan, index) => (
              <tr key={plan._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 text-center">{plan?.plan} {plan?.lastName}</td>
                <td className="py-2 px-4 text-center">₹{plan?.price}</td>
                <td className="py-2 px-4 text-center">{plan?.duration}months</td>
                <td className="py-2 px-4 text-center">{plan?.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPlanModal isOpen={isModalOpen} onRequestClose={closeModal} setRefresher={setRefresher} />
    </div>
  );
};

export default SubscriptionPlans;
