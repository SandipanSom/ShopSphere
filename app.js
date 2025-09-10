const express= require("express");
const app= express();
const cookieParser= require("cookie-parser");
const path= require("path");
const expressSession= require("express-session")
const flash= require("connect-flash")

const ownersRouter= require("./routes/ownersRouter");
const productsRouter= require("./routes/productsRouter");
const usersRouter= require("./routes/usersRouter");
const indexRouter= require("./routes/index");
require("dotenv").config();


const db= require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "MySecretKey@#$%123",
}));
app.use(flash());

// now make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success = req.flash("success")[0] || null;
    res.locals.error = req.flash("error")[0] || null;
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(4000);