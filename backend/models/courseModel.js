import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
  },
  videoName: {
    type: String,
  },
  duration: {
    type: Number,
  },
  
  //new
  viewers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

});
const courseSchema = mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
    },
    courseName: {
      type: String,
    },
    description: {
      type: String,
    },
    requiredSkills: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default: false,
    },

    rejectionReason:{
    type: String,
    },
    
    caption: {
      type: String,
    },
    isEdited:{
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
    },
    previewVideo: {
      type: String,
    },
    previewVideoName: {
      type: String,
    },

    rating: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rate: {
          type: Number,
          default: 0,
        },
      },
    ],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        review: {
          type: String,
        },
      },
    ],



    caption: {
      type: String,
    },
    videos: [videoSchema],
  },
 
  {
    timestamps: true,
  }
);
const Courses = mongoose.model("Courses", courseSchema);
export default Courses;