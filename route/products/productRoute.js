const express = require('express');
const { createProductCtrl,fetchProductsCtrl ,fetchPostCtrl,updatePostCtrl,deletePostCtrl} = require('../../controllers/products/productCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { PhotoUpload,postImgResize } = require('../../middlewares/upload/profilePhotoUpload');


const postRoute =express.Router();

postRoute.post("/",authMiddleware, PhotoUpload.single('image'),
postImgResize,
createProductCtrl);

postRoute.get('/',fetchProductsCtrl);
postRoute.get('/:id',fetchPostCtrl);
postRoute.put('/:id',authMiddleware,updatePostCtrl);
postRoute.delete('/:id',authMiddleware,deletePostCtrl);






module.exports= postRoute;