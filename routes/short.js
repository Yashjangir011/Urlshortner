const express = require('express');
const { getShortUrl } = require('../controllers/url');

const router = express.Router();

router.get('/:shortId' , getShortUrl);


module.exports = router;