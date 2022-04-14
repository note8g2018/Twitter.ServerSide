const express       = require('express');
const { forgotPassword }    = require('../controllers/forgotPassword_C');

const router = express.Router();

router.route('/').post(forgotPassword);

module.exports = router;