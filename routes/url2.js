const express = require('express');
const { createShortUrl } = require('../controllers/url');

const router = express.Router();

router.post('/shorter' , createShortUrl)


module.exports = router;