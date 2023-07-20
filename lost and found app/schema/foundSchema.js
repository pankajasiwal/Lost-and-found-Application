const mongoose = require('mongoose');

const foundSchema = mongoose.Schema({
  Found_Product_Name: {
    type: String,
  },
  Found_Product_Discription: {
    type: String,
  },
  Found_Location: {
    type: String,
  },
  Found_Product_Image: { data: Buffer, contentType: String },
});

const FoundProduct = new mongoose.model('FoundProduct', foundSchema);
module.exports = FoundProduct;
