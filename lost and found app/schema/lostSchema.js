const mongoose = require('mongoose');

const lostSchema = mongoose.Schema({
  Product_Name: {
    type: String,
  },
  Lost_Location: {
    type: String,
  },
  Discription: {
    type: String,
  },
  Product_Image: { data: Buffer, contentType: String },
});

const LostProduct = new mongoose.model('LostProduct', lostSchema);

module.exports = LostProduct;
