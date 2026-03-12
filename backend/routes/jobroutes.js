import express from "express";
import { createJob, deleteJob, getAllJobs, getSingleJob, updateJob } from "../controllers/jobcontroller.js";
import { verifytoken } from "../middleware/authmiddleware.js";
import  authroles  from "../middleware/rolemiddleware.js";

const router = express.Router();

router.post("/create", [verifytoken,authroles], createJob);
router.get("/getall",[verifytoken,authroles],getAllJobs);
router.get("/getsingle/:id",[verifytoken,authroles],getSingleJob);
router.put("/updatejob/:id",[verifytoken,authroles],updateJob)
router.delete("/deletejob/:id",[verifytoken,authroles],deleteJob)


export default router;