import express from "express";
import upload from "../middleware/uploade";
import { uploadResume } from "../controllers/usercontroller";



const router=express.Router();

router.post("/upload-resume",upload.single("resume"),uploadResume);

export default router;