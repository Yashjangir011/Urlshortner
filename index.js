const express = require('express');
const connectDB = require('./connect.js');
const app = express();
const ejs = require('ejs');
const path = require('path');
const port = 3000;
const urlRouter = require('./routes/url2.js');
const shortRouter = require('./routes/short.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



connectDB('mongodb+srv://yashjangirr:0uywPi2VpLIe6WNQ@cluster0.aqezj7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/ShortUrl')
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((err) => {   
    console.error('Error connecting to MongoDB:', err);
});


app.get('/', (req, res) => {
    res.render('index', { title: 'URL Shortener' });
})

app.use('/url', urlRouter); 
app.use('/', shortRouter);


app.listen(port, () =>{
    console.log(`port is running on ${port}`)
} )