import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
  sap: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
  },
  courseName: {
    type: String,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  room: {
    type: String,
  },
  attendance: {
    type: String,
    default: "absent",
  },
});

export const Exam = new mongoose.model("Exam", examSchema);
