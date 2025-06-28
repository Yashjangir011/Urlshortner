const shortid = require('shortid');
const Url = require('../models/url.js');


async function createShortUrl(req ,res ,next) {
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

async function getShortUrl(req, res) {
    const shortId = req.params.shortId;

    if(!shortId){
        res.status(400).json({
            message : "short id is required"
        })
    }

    const entry = await Url.findOneAndUpdate(
        {shortId},
        {$push:{
            visitHistory:{
                timestamp : Date.now()
            }
        }}
    )
  if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    req.user = entry;
    console.log(req.user.redirectUrl)
    return res.redirect(entry.redirectUrl);
}

module.exports = {
    createShortUrl ,
    getShortUrl
}
