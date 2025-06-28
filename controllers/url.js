const shortid = require('shortid');
const Url = require('../models/url.js');


async function createShortUrl(req ,res) {
    const body = req.body;
    if (!body.redirectUrl) {
        return res.status(400).json({ error: 'Redirect URL is required' });
    }
    const shortId = shortid()

    await Url.create({
        shortId,
        redirectUrl: body.redirectUrl,
        visitHistory: []
    })
    return res.json({ id : shortId})
}

module.exports = {
    createShortUrl    
}