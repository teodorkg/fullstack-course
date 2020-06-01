const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    match: /^\w{1,15}$/,
  },
  nickname: String,
  password: {
    // at least 8 chars with at least one letter, one number and one special char
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female", ""],
    default: "",
  },
  avatarSrc: String,
  aboutme: { type: String, match: /^.{0,512}$/ },
  isAdmin: { type: Boolean, required: true, default: false },
  status: {
    type: String,
    required: true,
    enum: ["active", "suspended", "disabled"],
    default: "active",
  },
  timeCreated: { type: Date, default: Date.now },
  timeLastMod: { type: Date, default: Date.now },
  recipes: { type: [mongoose.Schema.Types.ObjectId], ref: "Recipe" },
});

module.exports = mongoose.model("User", userSchema);
