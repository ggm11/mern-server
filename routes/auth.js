const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

/* POST /api/auth  */
router.post('/', [
  check('email', 'Enter a valid mail').isEmail(),
  check('password', 'Password must be a minimum of 6 characters').isLength({
    min: 6,
  }),
  authController.userAuthentication,
]);

module.exports = router;
