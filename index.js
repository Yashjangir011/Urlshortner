const express = require('express');
const connectDB = require('./connect.js');
const app = express();

const port = 3000;
const urlRouter = require('./routes/url2.js');
const Url = require('./models/url.js');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectDB('PASTE YPOUR MONGODB CONNECTION STRING HERE')
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((err) => {   
    console.error('Error connecting to MongoDB:', err);
});

app.use('/url', urlRouter); 

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    if(!shortId) {
        return res.status(400).json({ error: 'Short ID is required' });
    }

    const entry = await Url.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
    )
    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.redirect(entry.redirectUrl);
})



app.listen(port, () =>{
    console.log(`port is running on ${port}`)
} )