const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  title:        { type: String, default: null },
  desc:         { type: String, default: null },
  categories_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  image:        { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model("Prompt", promptSchema);
