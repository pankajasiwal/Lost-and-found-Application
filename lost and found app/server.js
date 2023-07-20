const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const lostRouter = require('./Routes/lostRoutes');
const foundRouter = require('./Routes/foundRoutes');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./schema/userSchema');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/', lostRouter);
app.use('/', foundRouter);

//static files
const homePage = fs.readFileSync(`${__dirname}/views/homePage.html`, 'utf-8');
const mainPage = fs.readFileSync(`${__dirname}/views/main.html`, 'utf-8');
const signup_loginPage = fs.readFileSync(`${__dirname}/views/signup_login.html`, 'utf-8');

//Connect mongodb database
mongoose
  .connect('mongodb://localhost:27017/Products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database is connected'));

app.get('/main', (req, res) => {
  res.send(mainPage);
});
app.get('/signup_login', (req, res) => {
  res.send(signup_loginPage);
});
app.get('/homepage', (req, res) => {
  res.status(200);
  res.send(homePage);
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });

    res.status(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // res.status(200).json({ message: 'Login successful' });
    res.redirect('/homepage');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//SERVER START
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}...`);
});
