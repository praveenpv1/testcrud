const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/userController');

router
  .route('/:id?')
  .get(userCtrl.getUsers)
  .post(userCtrl.addUser)
  .patch(userCtrl.updateUser)
  .delete(userCtrl.deleteUser)

module.exports = router;