const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    
    password: {
      type: String,
      required: [true, "Hei buddy Password is required"],
    },
  
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
); 



//Hash password

userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    next()
  }


  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//match password
userSchema.methods.isPasswordMatched = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;
