const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    title: String,
    description: String
})

const nodeModel = mongoose.model('Node', nodeSchema);
module.exports = nodeModel;