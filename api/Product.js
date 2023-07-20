const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://diwaarvind6:Diwa@cluster0.jxw0na0.mongodb.net/Asset?retryWrites=true&w=majority"
);
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productDes:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    Manufacture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
})

const Addproduct = mongoose.model('Addproduct',productSchema)

module.exports=Addproduct;
