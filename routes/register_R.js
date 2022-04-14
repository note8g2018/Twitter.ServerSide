const express       = require('express');
const { register }    = require('../controllers/register_C');

const router = express.Router();

router.route('/').post(register);

module.exports = router;