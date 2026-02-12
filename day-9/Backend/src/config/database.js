const mongoose = require('mongoose');

function connectToDB() {
    const DB_UID = process.env.DB_UID;
    mongoose.connect(DB_UID)
        .then(() => {
            console.log('Connected to DB successfully');
        })
}

module.exports = connectToDB;