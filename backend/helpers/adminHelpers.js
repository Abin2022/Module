import User from "../models/userModel.js";
import Tutor from "../models/tutorModel.js"

const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, _id: 1, isBlocked:1 });

    // console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


const fetchAllTutors = async () => {
  try {
      const tutor = await Tutor.find({} ,{name:1, email:1, qualification:1, experience:1, rating:1, isBlocked:1, tutorImage:1});
      return tutor;

  }catch (error){
      console.error("Error fetching tutor:",error)
      throw error;
  }
}

const updateUser = async (userData) => {

  try {

    const user = await User.findById(userData.userId);

    if (!user) {

      // If the user wasn't found, return a status indicating failure
      return { success: false, message: "User not found." };
      
    }

    // Update user.name and user.email with the new values
    user.name = userData.name;
    user.email = userData.email;
    user.profileImage = userData.profileImage;

    // Save the updated user data
    await user.save();

    return { success: true, message: "User updated successfully." };

  } catch (error) {

    console.error("Error updating user:", error);
    throw error;

  }

};


const deleteUser = async (userId) => {

  try {

    // Attempt to delete the user by their _id
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {

      // If the user wasn't found (already deleted or never existed), return a status indicating failure
      return { success: false, message: "User not found." };

    }

    // If the user was successfully deleted, return a status indicating success
    return { success: true, message: "User deleted successfully." };

  } catch (error) {

    console.error("Error deleting user:", error);

    throw error;

  }

};



//tutor edit in admin side 


const deleteTutor = async (tutorId) => {

  try {

    // Attempt to delete the user by their _id
    const deletedTutor = await Tutor.findByIdAndDelete(tutorId);

    if (!deletedTutor) {
      return { success: false, message: "Tutor not found." };
    }
    return { success: true, message: "Tutor deleted successfully." };

  } catch (error) {

    console.error("Error deleting Tutor:", error);

    throw error;

  }

};







export { fetchAllUsers ,updateUser, deleteUser, fetchAllTutors  ,deleteTutor};