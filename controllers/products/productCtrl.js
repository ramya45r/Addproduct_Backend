const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Product = require("../../models/product/Product");
const validateMongodbId = require("../../utils/validateMongodb");
const User = require("../../models/user/User");

const cloudinaryUploadImg = require("../../utils/cloudinary");

// create Product----------------------
const createProductCtrl = expressAsyncHandler(async (req, res) => {
  
  const { _id } = req.user;

  //1. get the path to img
  const localPath = `public/images/posts/${req.file.filename}`;
  //2.upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);

  try {
    const product = await Product.create({
      ...req.body,
      user: _id,
      image: imgUploaded?.url,
    });
    res.json(product);

  } catch (error) {
    res.json(error);
  }
});

//--------------Fetch all products --------------------------------//
const fetchProductsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.find({});
    res.json(product);
  } catch (error) {
    res.json(error);
  }
});
//--------------Fetch a single product --------------------------------//
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Product.findById(id);
    total= Math.round(post.MRP-(post.MRP*post.Discount/100)+post.ShippingCharge)
    post.Total = total;
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//--------------Update product--------------------------------//
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//--------------Delete product --------------------------------//
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Product.findOneAndDelete(id);
    res.json(post);
  } catch (error) {
    res.json(error);
  }
  res.json("Delete");
});

module.exports = {
  createProductCtrl,
  fetchProductsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
};
