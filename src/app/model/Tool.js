const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  link: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: []
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
