const express= require("express");
const router= express.Router();
const ownerModel= require("../models/owner-model");


const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin@123"; 

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        let token= "admin";
        res.cookie("token", token);
        res.render("createproducts");
    } else {
        let error= req.flash("u r not an admin");
        res.render("index", {error});
    }
});


module.exports= router;