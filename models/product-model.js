const mongoose= require("mongoose")

const productSchema= mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    price:{
        type: Number,
    },
})

//we will insert our schema into a model and export the final schema at the name of user
module.exports= mongoose.model("product", productSchema);