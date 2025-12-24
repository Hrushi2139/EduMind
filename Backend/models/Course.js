import mongoose from "mongoose";


const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ["video", "text", "pdf"],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number
  }
});


const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  lessons: [lessonSchema]
});


const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },
    language: {
      type: String,
      default: "English"
    },
    createdBy: {
      type: String,
      ref: "User",
      required: true
    },
    instructorName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft"
    },
    adminRemarks: {
      type: String
    },
    modules: [moduleSchema],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    enrollmentCount: {
      type: Number,
      default: 0
    },
    learningObjectives: [
      {
        type: String
      }
    ],
    aiGeneratedQuizzes: {
      type: Boolean,
      default: false
    },
    difficultyScore: {
      type: Number
    },
    tags: [
      {
        type: String
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Course", courseSchema);
