const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const adventuresSchema = new Schema ({

    adventureTitle: {
        type: String, 
        required: true
    },

    adventureText: {
        type: String, 
        required: true
    }, 

    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },

    siteId: {
        type: Number, 
        required: true
    },

    adventurePics: {
        type: [String],
        required: false //for Cloudinary imageURL
    },

    adventureComments: {
        type: [String],
        required: false 
    },

    adventureLikes: {
        type: Number,
        required: false
    }

}, {

    timestamps: true, 
    collection: 'adventures'

});

module.exports = mongoose.model('Adventures', adventuresSchema)