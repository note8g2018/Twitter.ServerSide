const express       = require('express');
const { articleSave }    = require('../controllers/article_C');

const router = express.Router();

router.route('/').post(articleSave);

module.exports = router;