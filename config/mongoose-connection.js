const mongoose= require("mongoose");
const dbgr= require("debug")("development:mongoose");
const config= require("config");


mongoose.connect(`${config.get("MONGODB_URI")}/ShopSphere`).
then(function(){
    dbgr("connected");
}).
catch(function(err){
    dbgr(err);
});


module.exports= mongoose.connection;

//this will connect all the mongoose files of models folder to the database