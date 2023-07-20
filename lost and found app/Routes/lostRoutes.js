const express = require('express');
const Router = express.Router();
const multer = require('multer');
const lostConntroller = require('../controllers/lostController');

const upload = multer({ dest: 'uploads/' });

Router.route('/addLostItem').post(upload.single('Product_Image'), lostConntroller.addLostItem);
Router.route('/lostitem').get(lostConntroller.getall);

module.exports = Router;
