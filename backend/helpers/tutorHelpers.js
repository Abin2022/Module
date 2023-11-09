
 import Course from "../models/courseModel.js";
import Tutor from "../models/tutorModel.js";

const fetchAllCoursesList = async () => {
    try {
        const course = await Course.find({}, {courseName:1,domain:1, price:1,requiredSkills:1,description:1} )
        console.log("Course list");
    return course;
    } catch (error) {
console.log(error)
    }
}


const deleteCourse = async (tutorId) => {

    try {
  
      // Attempt to delete the user by their _id
      const deleteCourse = await Tutor.findByIdAndDelete(tutorId);
  
      if (!deleteCourse) {
        return { success: false, message: "course not found." };
      }
      return { success: true, message: "course deleted successfully." };
  
    } catch (error) {
  
      console.error("Error deleting course:", error);
  
      throw error;
  
    }
  
  };
  


export {fetchAllCoursesList,deleteCourse}