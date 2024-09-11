import { Exam } from "../models/exam.model.js";
import jwt from "jsonwebtoken";

const getExams = async (req, res) => {
  try {
    const { sap } = req.params;

    const exams = await Exam.find({ sap });

    const examsQR = exams.map((exam) => {
      const qrString = jwt.sign({ exam }, process.env.TOKEN_SECRET);
      return {
        _id: exam._id,
        sap: exam.sap,
        courseId: exam.courseId,
        courseName: exam.courseName,
        startTime: exam.startTime,
        endTime: exam.endTime,
        room: exam.room,
        qrString,
      };
    });

    return res.status(200).json(examsQR);
  } catch (e) {
    console.log(e);
  }
};

const markAttendance = async (req, res) => {
  try {
    const { qrString } = req.body;
    const decoded = jwt.verify(qrString, process.env.TOKEN_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    const exam = decoded.exam;

    if (new Date(exam.startTime) > new Date()) {
      return res
        .status(401)
        .json({ success: false, message: "Exam not started" });
    }

    if (new Date(exam.endTime) < new Date()) {
      return res.status(401).json({ success: false, message: "Exam over" });
    }

    const updateExam = await Exam.findOneAndUpdate(
      { _id: exam._id },
      { attendance: "present" }
    );

    const updatedExam = await Exam.findById(updateExam._id);

    return res.status(200).json(updatedExam);
  } catch (e) {
    console.log(e);
  }
};

export { getExams, markAttendance };
