const express= require("express");
const router= express.Router();
const userModel= require("../models/user-model")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")


router.get("/", function(req,res){
    res.send("usersRouter");
})

router.post("/register", async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                req.flash('error', 'Error generating salt');
                return res.redirect('/');
            }
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash('error', 'Error hashing password');
                    return res.redirect('/');
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
                    res.cookie("token", token);
                    req.flash('success', 'Registration successful');
                    res.redirect('/shop'); // Ensure the path is correct
                }
            });
        });

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) {
            req.flash('error', 'User does not exist');
            return res.redirect('/');
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
                res.cookie("token", token);
                req.flash('success', 'Login successful');
                res.redirect('/shop'); // Ensure the path is correct
            } else {
                req.flash('error', 'Incorrect password');
                res.redirect('/');
            }
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.flash('success', 'Logout successful');
    res.redirect('/');
});



module.exports= router;