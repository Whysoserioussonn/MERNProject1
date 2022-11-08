// Here is where we define our schema which is going to be the field for this particular resource
// for goals, we are going to have a text field, time stamps and ID and user after user model is created

const mongoose = require("mongoose");

const goaslSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goaslSchema);   //import to goalController
