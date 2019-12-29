const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  tags: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ToolSchema.statics = {
  searchByTag(tags) {
    return this.find({ tags: { $all: tags } });
  }
};

module.exports = mongoose.model("Tool", ToolSchema);
