const express       = require('express');
const testPrivate    = require('../controllers/testPrivate_C');

const router = express.Router();

router.route('/').get(testPrivate);

module.exports = router;