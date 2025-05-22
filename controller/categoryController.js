const Category = require("../Model/Category");
const Prompt = require("../Model/prompt");


// GET all categories with prompts
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ sort: 1 });

    // Join each category with its prompts
    const categoriesWithPrompts = await Promise.all(
      categories.map(async (cat) => {
        const prompts = await Prompt.find({ categories_id: cat._id });
        return { ...cat._doc, prompts };
      })
    );

    res.status(200).json({
      status: true,
      data: categoriesWithPrompts,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// POST new category
exports.createCategory = async (req, res) => {
  try {  
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      status: true,
      message: "Category created",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid data" });
  }
};

// PUT update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category)
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    res
      .status(200)
      .json({ status: true, message: "Category updated", data: category });
  } catch (error) {
    res.status(400).json({ status: false, message: "Update failed" });
  }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    res.status(200).json({ status: true, message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Delete failed" });
  }
};




// Create Category with Prompts in one request
exports.createCategoryWithPrompts = async (req, res) => {
  try {
    const { title, desc, image, sort = 0, prompts = [] } = req.body;

    // 1. Create the category
    const newCategory = new Category({ title, desc, image, sort });
    const savedCategory = await newCategory.save();

    // 2. Create prompts if provided
    const promptDocs = prompts.map((p) => ({
      ...p,
      categories_id: savedCategory._id,
    }));

    await Prompt.insertMany(promptDocs);

    res.status(201).json({
      status: true,
      message: "Category and prompts created successfully",
      data: savedCategory,
    });
  } catch (err) {
    console.error("❌ createCategoryWithPrompts error:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
