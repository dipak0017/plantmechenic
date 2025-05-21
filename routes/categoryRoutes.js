const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,

  createCategoryWithPrompts,
  deleteCategory
} = require("../controller/categoryController");

router.get("/", getAllCategories); 
router.post("/",createCategoryWithPrompts)          
// router.post("/", createCategory);            
router.put("/:id", updateCategory);         
router.delete("/:id", deleteCategory);       

module.exports = router;





