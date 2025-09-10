const mongoose= require("mongoose")


const userSchema= mongoose.Schema({
    fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
})

//we will insert our schema into a model and export the final schema at the name of user
module.exports= mongoose.model("user", userSchema);