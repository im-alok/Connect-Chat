const mongoose = require('mongoose');
require('dotenv').config();

function dbConnect() {
    mongoose.connect(process.env.DATABASE_URL, {
        // useNewURLParser: true,
        // useUnifiedTopology: true
    }).then(() => console.log('DataBase connection successfully'))
        .catch((error) => console.log('Something occur during Database connectivity'));
}

module.exports = dbConnect