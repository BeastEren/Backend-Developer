const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connectde to DB");
        }).catch((err) => {
            console.log('Error', err);
            throw err;
        })

}

module.exports = connectToDB;