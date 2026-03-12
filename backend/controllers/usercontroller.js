import User from "../models/user.js";

export const uploadResume = async (req, res) => {
  try {

    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { resume: req.file.path },
      { new: true }
    );

    res.json({
      message: "Resume uploaded successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};