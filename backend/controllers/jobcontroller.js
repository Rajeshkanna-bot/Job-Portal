import Job from "../models/job.js";


export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company || !location || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      createdBy: req.user.id
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob
    });

  } catch (error) {
     console.log(error)
    res.status(500).json({ message: "Server error" });
   
  }
};



export const getAllJobs = async (req, res) => {
  try {

    const { page = 1, limit = 5, keyword, location } = req.query;

    const filter = {};

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(filter)
      .populate("createdBy", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getSingleJob = async (req, res) => {
  try {

    const { id } = req.params;
    console.log(id)
 const job = await Job.findById(id)
      .populate("createdBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      job
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateJob = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
if(!req.body){
return res.status(400).json({ message:"Payload missing" });
}
  
    
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    

    res.json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own job"
      });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};