const fs = require('fs');
const FoundProduct = require('../schema/foundSchema');

exports.getall = async (req, res, next) => {
  res.status(200).json({
    status: 'sucess',
    data: await FoundProduct.find(),
  });
};

exports.addFoundItem = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { Found_Product_Name, Found_Product_Discription, Found_Location } = req.body;

    const newItem = new FoundProduct({
      Found_Product_Name,
      Found_Product_Discription,
      Found_Location,
    });

    if (req.file) {
      newItem.Found_Product_Image.data = fs.readFileSync(req.file.path);
      newItem.Found_Product_Image.contentType = req.file.mimetype;
    }

    await newItem.save();
    res.status(201).json({
      status: 'sucess',
      message: 'Form submitted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
