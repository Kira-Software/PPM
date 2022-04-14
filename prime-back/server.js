const express = require("express");
const bodyparser = require("body-parser");

const dontenv = require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const loginapi = require("./Api/login");
const signupapi = require("./Api/signup");

const postapi = require("./Api/post");
const contactapi = require("./Api/contact")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.json());
var cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // Use this after the variable declaration

app.use("/uploads", express.static("uploads"));

app.use("/api/login", loginapi);
app.use("/api/signup", signupapi); 
app.use("/api/post", postapi);
app.use("/api/contact", contactapi);


// const mongoDBstore = new MongoDBStore({
//   uri: process.env.MONGO_URI, 
//   collection: "mySessions",
// });

// // Express-Session

// app.use(
//   session({
//     name: process.env.COOKIE_NAME, //name to be put in "key" field in postman etc
//     secret: process.env.SECRET,
//     resave: true,

//     saveUninitialized: false,
//     store: mongoDBstore,
//     cookie: {
//       maxAge: 5000000,
//       httpOnly: true,
//       sameSite: false,
//       secure: false,
//     },
//   })
// );

const url =
  "mongodb+srv://Kirubel:Kirubel21@cluster0.majbm.mongodb.net/Prime?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log("server is listening on Port ", process.env.PORT);
});
 