import React, { useState, useEffect } from "react";
import { useGetUserPlansMutation } from "../../slices/userApiSlice";
import { useCreateOrderMutation } from "../../slices/userApiSlice";
import { useVerifyPaymentMutation } from "../../slices/userApiSlice";
import { useCheckPlanStatusMutation } from "../../slices/userApiSlice";
import { redirect, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";

const SubscriptionPlans = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [plans, setPlans] = useState([]);
  // const [price, setPrice] = useState("");
  const [plan, setPlan] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // New state



  const [getPlans] = useGetUserPlansMutation();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [checkStatus] = useCheckPlanStatusMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await getPlans().unwrap();
      setPlans(response);
    } catch (error) {
      if (error.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/login");
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  const checkPlanStatus = async (plan) => {
    try {
      const planStatus = await checkStatus({ userId: userInfo._id }).unwrap();

      console.log(planStatus, "planStatus");
      if (planStatus.status === false) {
        initiatePayment(plan);
      } else {
        toast.error("already a plan exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verifypayment = async (response, planId, plan, price, duration) => {
    // console.log(response, planId, plan, price, duration,"verifyPayment");
    const result = await verifyPayment({
      ...response,
      plan,
      planId,
      price,
      duration,
      userId: userInfo._id,
      user_name: userInfo.name,
    }).unwrap();

    if (result.success === true) {
      toast.success(result.message);
      setIsSubscribed(true); // Update the subscription status
      navigate("/get-subscriptions");
    } else if (result.success === false) {
      toast.error(result.message);
    }
  };

  const initiatePayment = async (plan) => {
    try {
      const response = await createOrder({ price: plan.price }).unwrap();
      // console.log(response.order.id,'response');
      setPlan(plan);

      const options = {
        key: "rzp_test_vohNN97b9WnKIu",
        amount: plan.price * 100,
        currency: "INR",
        name: "Module",
        description: "Test Transaction",
        //  image: { logo },
        image: "img",

        order_id: response.order.id,
        handler: (paymentResponse) => {
          // console.log(paymentResponse,'gyhij');
          verifypayment(
            paymentResponse,
            plan._id,
            plan.plan,
            plan.price,
            plan.duration
          );
        },

        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response) {
        toast.error(response.error.description);
        toast.error(response.error.reason);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order. Please try again later.");
    }
  };

  return (
    <div>
      <section className="bg-gray-900 dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl h-full lg:py-16 lg:px-6 ">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-14 ">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-red-700 bg-opacity-75 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {plan.plan}
                </h3>
                <div className="flex justify-center items-baseline my-6">
                  <span className="mr-2 text-4xl font-extrabold text-yellow-800">
                    ₹ {plan.price}
                  </span>
                  {/* <span className="text-white dark:text-gray-400"></span> */}
                </div>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 my-6">
                  Purchase This Plan and have a duration for {plan.duration}{" "}
                  Month
                </p>

                {/* <button
                  id="rzp-button1"
                  onClick={() => {
                    checkPlanStatus(plan);
                  
                  }}
                  className="text-white bg-yellow-800 rounded mt-3 hover:bg-yellow-900 py-2 px-4 text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Subscribe
                </button> */}
                 <button
            id="rzp-button1"
            onClick={() => {
              checkPlanStatus(plan);
            }}
            className={`text-white bg-yellow-800 rounded mt-3 hover:bg-yellow-900 py-2 px-4 text-lg transition duration-300 ease-in-out transform hover:scale-105 ${
              isSubscribed ? 'cursor-not-allowed' : ''
            }`}
            disabled={isSubscribed}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
                
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
