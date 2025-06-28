const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortId:{
        type : String,
        required: true,
        unique: true 
    },
    redirectUrl:{
        type: String,
        required: true
    },
    visitHistory: [{
       timestamp: {
            type : Number
        }
    }]
} 
, {timestamps: true } // Automatically adds createdAt and updatedAt fields
 
)

const Url = mongoose.model('url', urlSchema)
module.exports = Url;