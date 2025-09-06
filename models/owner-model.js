const mongoose= require("mongoose")


const ownerSchema= mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})

//we will insert our schema into a model and export the final schema at the name of user
module.exports= mongoose.model("owner", ownerSchema);