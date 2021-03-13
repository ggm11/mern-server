const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

/* POST /api/users  */
router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Enter a valid mail').isEmail(),
    check('password', 'Password must be a minimum of 6 characters').isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

module.exports = router;
