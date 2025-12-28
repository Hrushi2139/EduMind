import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
      index: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    completedLessons: [
      {
        type: String 
      }
    ],

    lastAccessedLesson: {
      type: String
    },

    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    isCompleted: {
      type: Boolean,
      default: false
    },

    startedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Progress", progressSchema);
