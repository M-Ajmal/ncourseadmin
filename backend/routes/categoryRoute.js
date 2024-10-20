import express from "express";
import multer from "multer";
import path from "path";
import { showCategories, showCategoryById, createNewCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img/category'); 
  },
  filename: (req, file, cb) => {
  
    const categoryName = req.body.category_name.replace(/\s+/g, '_');
    const fileExtension = path.extname(file.originalname); 
    const newFileName = `${categoryName}_${Date.now()}${fileExtension}`; 
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

router.get("/category", showCategories);
router.get("/category/:id", showCategoryById);
router.post("/category", upload.single("cat_img"), createNewCategory); 
router.put("/category/:id", upload.single("cat_img"), updateCategory); 
router.delete("/category/:id", deleteCategory);

export default router;
