const expressAsyncHandler = require("express-async-handler");
const fs = require("fs")
const generateToken = require("../../config/token/generateToken");
const User = require("../../models/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const validateMongodbId = require("../../utils/validateMongodb");

//=========================Register user ===========================================//
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.body);

  //User Exists
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");
  try {
    //Register user
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//=========================Login User ===========================================//
const loginUserCtl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const userFound = await User.findOne({ email });
  //check password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//=========================Get all users ===========================================//
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(1234567898765);
  try {
    const users = await User.find({}).populate('posts');
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});



module.exports = {
  userRegisterCtrl,
  loginUserCtl,
  fetchUsersCtrl,
 
};
