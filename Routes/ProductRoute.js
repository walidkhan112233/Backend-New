const express = require("express");
const ProductModel = require("../models/ProductModel");

const Route = express.Router();

Route.get("/", async (req, res) => {
  try {
    const result = await ProductModel.find({});
    res.status(200).json({
      isSuccefull: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccefull: false,
      error: error.message,
    });
  }
});

Route.post("/", (req, res) => {
  try {
    const requiredKeys = ["name", "description", "price", "category"];

    const body = req.body;

    let arr = [];

    requiredKeys.forEach((x) => {
      if (!body[x]) {
        arr.push(`Required ${x}`);
      }
    });

    if (arr.length > 0) {
      res.status(400).json({
        isSuccefull: false,
        error: "Validation Error, Some Fields are Missing",
        data: arr,
      });
    }

    const obj = {
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
    };

    const modelObj = new ProductModel(obj);
    modelObj
      .save()
      .then((result) => {
        res.status(201).json({
          isSuccefull: true,
          error: "Product Created Successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({
          isSuccefull: false,
          error: err.message,
          data: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccefull: false,
      error: error.message,
    });
  }
});

Route.put("/:id" ,  async (req,res) => {
  try{
      const id = req.params.id;
      const body = req.body;

      const result = await ProductModel.findByIdAndUpdate(id, body,{new:true});
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
      const deletedproduct = await ProductModel.findByIdAndDelete(id);
      res.status(200).json({
          isSuccessful: true,
          message: "product Deleted Successfully",
          data: deletedproduct
      });

  }catch(error){
      res.status(500).json({
          isSuccessful: false,
          error: error.message,
      });
    }
});

module.exports = Route;