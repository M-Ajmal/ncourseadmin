import db from "../config/db.js";

// Retrieve all categories
export const getCategories = (result) => {
  db.query("SELECT * FROM category", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

// Retrieve category by ID
export const getCategoryById = (id, result) => {
  db.query("SELECT * FROM category WHERE category_id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, res[0]);
    }
  });
};

// Create a new category
export const createCategory = (categoryData, result) => {
  db.query("INSERT INTO category SET ?", categoryData, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      result(null, { category_id: res.insertId, ...categoryData });
    }
  });
};

// Update category by ID
export const updateCategoryById = (id, categoryData, result) => {
  db.query(
    "UPDATE category SET category_name = ?, cat_img = ? WHERE category_id = ?",
    [categoryData.category_name, categoryData.cat_img, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        result(null, { id, ...categoryData });
      }
    }
  );
};

// Delete category by ID (Cascading Delete)
export const deleteCategoryById = (id, result) => {
  // Deleting the category along with any dependent records (e.g., items linked to the category)
  db.query("DELETE FROM category WHERE category_id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      if (res.affectedRows == 0) {
        result({ message: "Category not found" }, null);
      } else {
        result(null, { message: "Category deleted successfully" });
      }
    }
  });
};
