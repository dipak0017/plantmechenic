const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  sort: { type: Number, default: 0 },
  title: { type: String, default: null },
  desc: { type: String, default: null },
  image: { type: String,   }
}, {
  timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);
