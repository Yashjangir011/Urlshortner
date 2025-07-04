const express = require('express');
const { createShortUrl } = require('../controllers/url');
const { getShortUrl } = require('../controllers/url');
const router = express.Router();

router.post('/shorter' , createShortUrl)
router.get('/:shortId',getShortUrl )

module.exports = router;