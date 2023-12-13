import User from "../models/userModel.js";
import Plan from "../models/plans.js";
import Payment from "../models/Payments.js";

const findByEmail = async (email) => {
  return await User.findOne(email);
};

const findUserByIdForMiddleWare = async (userId) => {
  return await User.findById(userId).select("-password");

};


const findActivePlans = (async () => {
  try {
    const activePlans = await Plan.find({
      status: "active",
    });

    return { statusCode: 200, plans: activePlans };
  } catch (error) {
    console.error(error);
    throw error;
  }
});


const  addPayment=(paymentDetails)=> {
  try {
    const payment = {
      razorpay_order_id: paymentDetails.razorpay_order_id,
      razorpay_payment_id: paymentDetails.razorpay_payment_id,
      razorpay_signature: paymentDetails.razorpay_signature,
      user_id: paymentDetails.userId,
      user_name: paymentDetails.user_name,
      amount: paymentDetails.price,
      subscribed_plan: paymentDetails.plan,
      subscribed_plan_id: paymentDetails.planId,
    };
     Payment.create(payment);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save payment details");
  }
}


const  addSubscription = async(userId, plan, duration)=> {
  try {
    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(currentDate.getMonth() + duration);

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          subscribed_plan: plan,
          subscription_status: "active",
          subscription_expire: expiryDate,
        },
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error saving OTP: ${error.message}`);
  }
}





const userHelper = {
  findByEmail,
  findUserByIdForMiddleWare,
  findActivePlans,
  addPayment,
  addSubscription,

};

export default userHelper;
