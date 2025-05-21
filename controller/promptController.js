const Prompt = require('../Model/prompt');

// GET all prompts
exports.getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().populate("categories_id");
    res.status(200).json({ status: true, data: prompts });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// POST new prompt
exports.createPrompt = async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body);
    await newPrompt.save();
    res.status(201).json({ status: true, message: "Prompt created", data: newPrompt });
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid data" });
  }
};

// PUT update prompt
exports.updatePrompt = async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prompt) return res.status(404).json({ status: false, message: "Prompt not found" });
    res.status(200).json({ status: true, message: "Prompt updated", data: prompt });
  } catch (error) {
    res.status(400).json({ status: false, message: "Update failed" });
  }
};

// DELETE prompt
exports.deletePrompt = async (req, res) => {
  try {
    const deleted = await Prompt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: false, message: "Prompt not found" });
    res.status(200).json({ status: true, message: "Prompt deleted" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Delete failed" });
  }
};
