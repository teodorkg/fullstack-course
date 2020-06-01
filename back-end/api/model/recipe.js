const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, match: /^.{1,80}$/ },
  shortDescription: { type: String, match: /^.{0,250}$/ },
  description: { type: String, match: /^.{0,2048}$/ },
  minutesNeeded: { type: Number, required: true },
  ingredients: [
    {
      name: String,
      amount: String,
    },
  ],
  pictureSrc: { type: String, required: true },
  tags: String,
  timeCreated: { type: Date, default: Date.now },
  timeLastMod: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);
