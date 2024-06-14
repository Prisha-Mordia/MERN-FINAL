const express = require('express');

const routes = express.Router();

const Product = require('../models/productModel')
const Cart = require('../models/cartsModel')

const {verifyToken} = require('../middleware/verifyToken');

routes.get('/product-single-record',verifyToken,async(req,res)=>{
    let id = req.query.id; 
    try{
        let single = await Product.findById(id);
        return res.status(200).send({
            success : true,
            message : "Record successfully fetched",
            product : single
        })
    }catch(err){
        console.log(err);
        return false
    }
})

routes.post('/addcarts',verifyToken,async(req,res)=>{
    try{
        const {categoryId , productId , name , price , qty , description , image ,userId } = req.body
        let cart = await Cart.create({
            categoryId , productId , name , price , qty , description , image ,userId
        })
        return res.status(200).send({
            success : true,
            message : "Product added into cart successfully",
            cart
        })
    }catch(err){
        console.log(err);
        return false;
    }
})


routes.get('/usercart',verifyToken,async(req,res)=>{
    try{
        let userid = req.query.userId;
        let carts = await Cart.find({userId : userid});
        return res.status(200).send({
            success : true,
            message : "User's cart fetched successfully",
            carts
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.delete('/deletecart',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let data = await Cart.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Cart deleted successfully",
        })
    }catch(err){
        console.log(err);
        return false;
    }
})

routes.put('/editcart',verifyToken,async(req,res)=>{
    try{
        let id = req.query.id;
        let qty = req.body.qty;
        let data = await Cart.findByIdAndUpdate(id,{
            qty : qty
        })
        return res.status(200).send({
            success : true,
            message : "Cart updated successfully",
        })
        
    }catch(err){
        console.log(err);
        return false;
    }
})

module.exports = routes



