const express       = require('express');
const { login }    = require('../controllers/login_C');

const router = express.Router();

router.route('/').post(login);

module.exports = router;