const fs = require('fs');
const LostProduct = require('../schema/lostSchema');

exports.getall = async (req, res, next) => {
  res.status(200).json({
    status: 'sucess',
    data: await LostProduct.find(),
  });
};

exports.addLostItem = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const { Product_Name, Discription, Lost_Location } = req.body;

    const newItem = new LostProduct({
      Product_Name,
      Discription,
      Lost_Location,
    });

    if (req.file) {
      newItem.Product_Image.data = fs.readFileSync(req.file.path);
      newItem.Product_Image.contentType = req.file.mimetype;
    }

    await newItem.save();

    res.status(201).json({
      status: 'success',
      message: 'Form submitted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
