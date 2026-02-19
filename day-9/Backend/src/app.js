const express = require('express');
const nodeModel = require('./models/node.models');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // to allow cross-origin requests from the frontend
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", 'public'))); // to serve static files from the public directory
// app.use(express.static('./public')); //same same but !different :p

app.post('/api/nodes', async (req, res) => {

    const { title, description } = req.body;

    const node = await nodeModel.create({ title, description });

    res.status(201).json({
        message: 'Node created successfully',
        node
    })
})

app.get('/api/nodes', async (req, res) => {
    const node = await nodeModel.find();

    res.status(200).json({
        message: 'Nodes fetched successfully',
        node
    })
});

app.delete('/api/nodes/:id', async (req, res) => {
    const id = req.params.id; // we can also write const { id } = req.params;

    const node = await nodeModel.findByIdAndDelete(id);

    res.status(200).json({
        message: 'Node deleted successfully',
        node
    })
})

app.patch('/api/nodes/:id', async (req, res) => {
    const id = req.params.id; // we can also write const { id } = req.params;
    const { title, description } = req.body;
    const node = await nodeModel.findByIdAndUpdate(id, { title, description });

    res.status(200).json({
        message: 'Node updated successfully',
        node
    })
});


// This route will catch all requests that do not match any of the above routes and serve the index.html file. This is useful for client-side routing in a single-page application (SPA).
app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'public', 'index.html'));
})
module.exports = app; 