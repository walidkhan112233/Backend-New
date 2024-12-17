require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const BookRoute = require("./Routes/BookRoute");
const ProductRoute = require("./Routes/ProductRoute");
const UsersRoute = require("./Routes/authuserRoute");
const OrderRoute = require("./Routes/OrderRoute");
const AuthController = require("./contollers/AuthController")
const App = express();
App.use(express.json());

App.get("/", (req,res)=> {
    res.send("Server Started ONG");
});

App.use("/book" ,AuthController.Protected, BookRoute);
App.use("/products" ,AuthController.Protected,ProductRoute);
App.use("/auth"  ,AuthController.Protected, UsersRoute);
App.use("/orders" ,AuthController.Protected , OrderRoute);



mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(3000, () => {
        console.log("DB Connected , Server is Running");
    });
}).catch((err) => {
    console.log(err);
});

