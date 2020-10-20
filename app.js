const express = require('express');
const app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');
const cors = require("cors");

const UserRoutes = require('./routes/users-routes');

const _db = "users";
mongoose.connect('mongodb://localhost:27017/' + _db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => console.log(err.reason));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
});

app.use('/users', UserRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found!');
  res.status(404).json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;