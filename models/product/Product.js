const mongoose = require('mongoose')




const productSchema = new mongoose.Schema({
    Name:{
        type:String,
       
        trim:true,
    },
    // Created by only category
     
    Description: {
        type: String,  
      },
      MRP: {
        type:Number,  
      },
      Discount: {
        type: Number,  
      },
      ShippingCharge:{
        type: Number, 
      },
        Total:{
          type: Number, 
        },
  
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please Author is required"]
    },
 
    image:{
        type:String,
       default:'https://images.pexels.com/photos/13862516/pexels-photo-13862516.jpeg?auto=compress&cs=tinysrgb&w=600',
    }, 
   
},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
       virtuals:true, 
    },
    timestamps:true,
}
);

//compile
const Product = mongoose.model("Post",productSchema);

module.exports =Product;


