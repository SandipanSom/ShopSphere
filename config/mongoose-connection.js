const mongoose= require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/ShopSphere").
then(() => console.log("mongo connected") //this part is only to check if mongo is connected or not
).
catch((err)=>console.log(err))


module.exports= mongoose.connection;

//this will connect all the mongoose files of models folder to the database