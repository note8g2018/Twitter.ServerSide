const express = require('express');
const { logout } = require('../controllers/logout_C');

const router = express.Router();

router.route('/').post(logout);

module.exports = router;