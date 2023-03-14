const mongoose = require("mongoose");

// account which stores user information
const accountSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: "auth" },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
