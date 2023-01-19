const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtl,
  fetchUsersCtrl,
 
  
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();
userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtl);
userRoutes.get("/", fetchUsersCtrl);




module.exports = userRoutes;
