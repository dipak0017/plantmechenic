const Category = require('../Model/Category');
const Prompt = require('../Model/prompt');

// GET /api/dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const categories = await Category.find().sort({ sort: 1 });

    const categoriesWithPrompts = await Promise.all(
      categories.map(async (cat) => {
        const prompts = await Prompt.find({ categories_id: cat._id });
        return { ...cat._doc, prompts };
      })
    );

    res.status(200).json({
      status: true,
      data: {
        categories: categoriesWithPrompts,
        totalPrompts: await Prompt.countDocuments(),
        totalCategories: categories.length,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
