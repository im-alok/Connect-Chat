const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    Bio:{
        type:String,
        trim:true,
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        enum:["Male","Female","prefer not to say"]
    },
    phoneno:{
        type:String,
    }

})

module.exports = mongoose.model('Profile',profileSchema);