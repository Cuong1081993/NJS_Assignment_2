const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const roomSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    maxPeople: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    roomNumbers: [Number],
  },
  { timestamps: true }
);

module.exports = moongoose.model("Room", roomSchema);
