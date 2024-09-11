import { Router } from "express";
import { getExams, markAttendance } from "../controllers/exam.controller.js";

const router = Router();

router.route("/get-exams/:sap").get(getExams);
router.route("/attendance").post(markAttendance);

export default router;
