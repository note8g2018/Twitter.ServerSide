const express       = require('express');
const { resetPassword }    = require('../controllers/resetPassword_C');

const router = express.Router();

router.route('/').post(resetPassword);

module.exports = router;