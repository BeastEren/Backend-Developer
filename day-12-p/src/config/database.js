const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("The DataBase is collected...")
        })
}

module.exports = connectToDB;