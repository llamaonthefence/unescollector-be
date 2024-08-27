const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      }, 
    salt: {
      type: String,
      required: true,
    },
    iterations: {
      type: Number,
      required: true,
    },
    token: {
      type: String
    },
    expire_at: {
      type: Number
    },  
    is_admin: {
      type: Boolean,
      default: false
    },
    likes: {
      type: [Number], // Array of liked site IDs 
      default: []
    },
    beenTo: {
      type: [Number], // Array of beenTo site IDs 
      default: []
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);