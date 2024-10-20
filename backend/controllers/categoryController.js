import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../models/categoryModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const showCategories = (req, res) => {
  getCategories((err, categories) => {
    if (err) {
      res.send({ error: true, message: err.message });
    } else {
      res.send(categories);
    }
  });
};


export const showCategoryById = (req, res) => {
  const { id } = req.params;
  getCategoryById(id, (err, category) => {
    if (err) {
      res.send({ error: true, message: err.message });
    } else {
      res.send(category);
    }
  });
};

export const createNewCategory = (req, res) => {
  const { category_name } = req.body;
  const category_id = Math.floor(1000 + Math.random() * 9000);

  
  console.log("File uploaded: ", req.file); 


  const cat_img = req.file ? req.file.filename : 'no-image.png';


  const categoryData = { category_id, category_name, cat_img };

  createCategory(categoryData, (err, category) => {
    if (err) {
      res.send({ error: true, message: err.message });
    } else {
      res.send(category);
    }
  });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  getCategoryById(id, (err, existingCategory) => {
    if (err) {
      return res.send({ error: true, message: err.message });
    }

    
    const categoryData = {
      category_name: category_name || existingCategory.category_name, 
      cat_img: req.file ? req.file.filename : existingCategory.cat_img 
    };

    if (req.file && existingCategory.cat_img && existingCategory.cat_img !== 'no-image.png') {
      const oldImagePath = path.join(__dirname, "../img/category/", existingCategory.cat_img);
     
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    updateCategoryById(id, categoryData, (err, category) => {
      if (err) {
        return res.send({ error: true, message: err.message });
      }
      res.send(category);
    });
  });
};


// Delete a category
export const deleteCategory = (req, res) => {
  const { id } = req.params;

  getCategoryById(id, (err, category) => {
    if (err) {
      res.send({ error: true, message: err.message });
    } else {
      const imagePath = path.join(
        __dirname,
        "../img/category/",
        category.cat_img
      );

      // Proceed to delete the category from the database
      deleteCategoryById(id, (err) => {
        if (err) {
          res.send({ error: true, message: err.message });
        } else {
          // Delete the image file from the server only if it's not 'no-image.png'
          if (category.cat_img && category.cat_img !== "no-image.png") {
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }

          res.send({ success: true, message: "Category deleted successfully" });
        }
      });
    }
  });
};

