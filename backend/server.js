import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import the routes
import ratingRoutes from "./routes/ratingRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import coursesRoute from "./routes/coursesRoute.js";
import instructorRoutes from "./routes/instructorRoute.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminuser from "./routes/userAdminRoutes.js";
import countRoutes from "./routes/countRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/img/category", express.static(path.join(__dirname, "img/category")));
app.use("/img/courses", express.static(path.join("img", "courses")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", coursesRoute);
app.use("/api", ratingRoutes);
app.use("/api", instructorRoutes);
app.use("/api", enrollmentRoutes); 
app.use("/api", adminuser);
app.use("/api", countRoutes);


app.post("/api/image", (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    console.log("File uploaded: ", req.file);
    res.send({ success: true, message: "File uploaded successfully" });
  } catch (err) {
    console.error("Error during file upload: ", err.message);
    res.status(500).send({ error: true, message: "File upload failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
