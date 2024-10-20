import AuthModel from "../models/authModel.js";


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await AuthModel.findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
