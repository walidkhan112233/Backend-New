require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const BookModel = require("./models/bookmodel");
const BookRoute = require("./Routes/BookRoute");
const ProductRoute = require("./Routes/ProductRoute")
const App = express();
App.use(express.json());

App.get("/", (req,res)=> {
    res.send("Server Started ONG");
});

// App.get("/book", async (req,res) => {
//     try{
//         const result = await BookModel.find({});
//         res.status(200).json({
//             isSuccessfull: true,
//             data:result, 
//         });
//     }catch (error) {
//         console.log(error);
//         res.status(400).json({
//             isSuccessfull: false,
//             error:error.message, 
//         })
//     }
// });

// App.get("/book/:id", async (req,res) => {
//     try{
//         const id = req.params.id;
//         const result = await BookModel.find(id);
//         res.status(200).json({
//             isSuccessfull: true,
//             data:result, 
//         });
//     }catch (error) {
//         console.log(error);
//         res.status(400).json({
//             isSuccessfull: false,
//             error:error.message, 
//         })
//     }
// });

// App.post("/book", (req,res) => {
//     try{
//         const body = req.body;
//         const obj = {
//             title: body.title,
//             description:body.description,
//             author: body.author,
//             noOfPages: Number(body.noOfPages)
//         };
//         const modelObj = new BookModel (obj);

//         modelObj.save()
//         .then((result) => {
//             res.status(201).json({
//                 isSuccessfull:true,
//                 message: "Book Added Successfully",
//             });
//         }).catch((err) => {
//             throw err;
//         });
//     }catch(error) {
//         console.log(error); 
//       res.status(400).json({
//       isSuccessful:false,
//       error:error.message,
//     });
//     }
// });

// App.put("/book/:id", async (req,res) => {
//     try{
//         const id = req.params.id;
//         const body = req.body;

//         const result = await BookModel.findByIdAndUpdate(id, body,{new:true});
//         res.status(200).json({
//             isSuccessful:true,
//             message: "Record Updated Successfully",
//             data: result,
//         });
//     }catch(error) {
//         console.log(error);
//         res.status(400).json({
//             isSuccessful:false,
//             error:error.message,
//         });
//     }
// });

App.use("/book" , BookRoute);
App.use("/products" ,ProductRoute);




mongoose.connect(process.env.MONGO_URI).then(() => {
    App.listen(3000, () => {
        console.log("DB Connected , Server is Running");
    });
}).catch((err) => {
    console.log(err);
});