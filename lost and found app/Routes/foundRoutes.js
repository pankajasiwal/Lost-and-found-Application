const express = require('express');
const Router = express.Router();
const multer = require('multer');
const foundConntroller = require('../controllers/foundController');

const upload = multer({ dest: 'uploads/' });

Router.route('/addFoundItem').post(upload.single('Found_Product_Image'), foundConntroller.addFoundItem);
Router.route('/founditem').get(foundConntroller.getall);

module.exports = Router;
