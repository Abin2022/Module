



import React, { useState, useEffect } from "react";
import { useGetSubscriptionsMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetUserPlansMutation, useRemovePlanMutation } from "../../slices/userApiSlice";
import {Link} from "react-router-dom"

const SubscriptionHistory = ({ userId }) => {
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [refresher, setRefresher] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [plans, setPlans] = useState([]);
  const [getPlans] = useGetUserPlansMutation();
  const [getSubscriptions] = useGetSubscriptionsMutation();
  const [removeStatus] = useRemovePlanMutation();

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await getPlans().unwrap();
      setPlans(response);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
    setRefresher(false);
  }, [refresher]);

  const fetchSubscriptionData = async () => {
    try {
      const response = await getSubscriptions().unwrap();
      setUserSubscriptions(response);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.status === 401) {
      toast.error("There is no valid Plan to access this page");
    
    } else {
      console.error(error);
      // toast.error("Something went wrong");
    }
  };

  const removePlanStatus = async (subscription) => {
    try {
      const planStatus = await removeStatus({ userId: userInfo._id }).unwrap();
      console.log(planStatus, "planStatus in frontend");

      if (planStatus.status === false) {
               
        toast.success("Plan Removed Successfully");
      
        window.location.reload()
      } else {
        // toast.error("Plan still exists");
        toast.success("Plan Removed Successfully");

      }

    } catch (error) {
      console.error(error);
      toast.error("Plan is not removed");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
           Subscriptions Details
        </h2>
      </div>
      <div>
      {userSubscriptions?.length > 0 ? (
        userSubscriptions?.map((subscription, index) => (
          <div
            key={subscription._id}
            className={`transition duration-100 ease-in-out transform hover:scale-98 hover:shadow-lg ${
              index % 2 === 0 ? "bg-gray-200" : "bg-white"
            } p-4 rounded-lg mb-4`}
          >
            <p className="font-extrabold text-lg mb-2 text-gray-600 text-center hover:text-green-500">
              Plan Status: {subscription?.subscription_status}
            </p>
            <p className="font-normal text-lg mb-2 text-center">
              Current Plan: {subscription?.subscribed_plan}
            </p>
            {/* <p className="font-semibold text-gray-600 mb-1 text-center">
              Created On:{" "}
              {new Date(subscription?.createdAt).toLocaleString("en-IN", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              })}
            </p> */}
            <p className="font-semibold text-gray-600 mb-1 text-center">
              Plan Expires on:{" "}
              {new Date(subscription?.subscription_expire).toLocaleString(
                "en-IN",
                {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                }
              )}
            </p>
            <p className="font-semibold text-gray-600 mb-1 text-center">
              <button
                onClick={() => {
                  removePlanStatus(subscription);
                }}
                className="text-white bg-yellow-800 rounded mt-3 hover:bg-yellow-900 py-2 px-4 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Remove this plan
              </button>
            </p>
          </div>
        ))
      ):(
        <div className="text-center text-gray-600 hover:text-red-900">
        <h2 className=" text-red-600  hover:text-red-800">No Vaild Plan Available Currently</h2>
        <p className="font-semibold text-gray-600 mb-1 text-center">
          <Link to="/subscription-plans">
              <button
                
                className="text-white bg-yellow-800 rounded mt-3 hover:bg-yellow-900 py-2 px-4 text-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
               Buy a new plan
              </button>
              </Link>
            </p>

      </div>
      )}
      </div>
    </div>
  );
};

export default SubscriptionHistory;

