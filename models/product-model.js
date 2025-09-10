const mongoose= require("mongoose")

const productSchema = mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: { type: String,
                 default: "black" },
});

//we will insert our schema into a model and export the final schema at the name of user
module.exports= mongoose.model("product", productSchema);