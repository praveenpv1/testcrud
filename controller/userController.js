const mongoose = require('mongoose');
const User = require('../models/users');

exports.getUsers = (req, res, next) => {
  const id = req.params.id;
  if(id) {
    User.find({ _id: id, status: true}).exec().then(user => {
      if(user) {
        return res.status(200).json({
          status: true,
          data: user
        });
      } else {
        throw '500-User Not Found';
      }
    }).catch((err) => {
      return res.status(500).json({
        status: false,
        message: err.toString()
      });
    })
  } else {
    User.find({ status: true }).exec().then(users => {
      return res.status(200).json({
        status: true,
        data: users
      });
    }).catch((err) => {
      return res.status(500).json({
        status: false,
        message: err.toString()
      });
    })
  }
  
}

exports.addUser = (req, res, next) => {
  const { name, email } = req.body
  console.log(req.body)
  User.find({ email: email }).exec().then(result => {
    if (result.length >= 1) {
      return res.status(409).json({
          status: false,
          message: "email already exists"
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email
      })
      return user.save()
    }
  }).then((user) => {
    
    return res.status(200).json({
      status: true,
      data: user
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: false,
      message: err.toString()
    });
  })
}

exports.updateUser = (req, res, next) => {
  const id = req.params.id;
  
  if(id) {
    User.find({ _id: id, status: true }).exec().then(user => {
      console.log(user)
      if (user.length) {
        req.body.updated_at = Date.now();
        return User.updateOne({ _id: user[0]._id }, { 
          $set: req.body 
        }).exec()
      } else {
        throw 'Invalid user'
      }
    }).then(() => {
      return res.status(200).json({
        status: true,
        data: 'Modified successfully'
      });
    }).catch((err) => {
      return res.status(500).json({
        status: false,
        message: err.toString()
      });
    })
  } else {
    return res.status(500).json({
      status: false,
      message: 'Invalid User.'
    });
  }
}

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  if(id) {
    User.find({ _id: id, status: true }).exec().then(user => {
      if (user.length) {
        return User.updateOne({ _id: user[0]._id }, { $set: { status: false, updated_at: Date.now() } }).exec()
      } else {
        throw 'Invalid user'
      }
    }).then(() => {
      return res.status(200).json({
        status: true,
        data: 'User Removed Successfully'
      });
    }).catch((err) => {
      return res.status(500).json({
        status: false,
        message: err.toString()
      });
    })
  }
}

