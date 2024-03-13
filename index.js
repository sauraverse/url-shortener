const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")

const connectMongoDB = require("./connection.js")
const {restrictToLoggedInUserOnly, checkAuth} = require("./middlewares/auth.js")

const urlRoute = require("./routes/url.js")
const staticRoute = require("./routes/staticRoute.js")
const userRoute = require("./routes/user.js")

const app = express();

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/url-shortner").then(()=>{console.log("Connected to MongoDB")})

//Views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
app.use("/url", restrictToLoggedInUserOnly,urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user", userRoute);

//Server
app.listen(1000, ()=>{console.log("Server Started at PORT:", 1000)})