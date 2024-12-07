const express = require("express");
const BookModel = require("../models/bookmodel")
const Route = express.Router();

Route.get("/", async (req,res) => {
    try{
        const result = await BookModel.find({});
        res.status(200).json({
            isSuccessfull: true,
            data:result, 
        });
    }catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessfull: false,
            error:error.message, 
        })
    }
});

Route.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const result = await BookModel.find(id);
        res.status(200).json({
            isSuccessfull: true,
            data:result, 
        });
    }catch (error) {
        console.log(error);
        res.status(400).json({
            isSuccessfull: false,
            error:error.message, 
        })
    }
});

Route.post("/",(req,res) => {
    try{
        const body = req.body;
        const obj = {
            title: body.title,
            description:body.description,
            author: body.author,
            noOfPages: Number(body.noOfPages)
        };
        const modelObj = new BookModel (obj);

        modelObj.save()
        .then((result) => {
            res.status(201).json({
                isSuccessfull:true,
                message: "Book Added Successfully",
            });
        }).catch((err) => {
            throw err;
        });
    }catch(error) {
        console.log(error); 
      res.status(400).json({
      isSuccessful:false,
      error:error.message,
    });
    }
});

Route.put("/:id" ,  async (req,res) => {
    try{
        const id = req.params.id;
        const body = req.body;

        const result = await BookModel.findByIdAndUpdate(id, body,{new:true});
        res.status(200).json({
            isSuccessful:true,
            message: "Record Updated Successfully",
            data: result,
        });
    }catch(error) {
        console.log(error);
        res.status(400).json({
            isSuccessful:false,
            error:error.message,
        });
    }
});

Route.delete("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const deletedBook = await BookModel.findByIdAndDelete(id);
        res.status(200).json({
            isSuccessful: true,
            message: "Book Deleted Successfully",
            data: deletedBook
        });

    }catch(error){
        res.status(500).json({
            isSuccessful: false,
            error: error.message,
        });
    }
});

module.exports = Route;