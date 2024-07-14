const express = require('express');
const movieRoute = express.Router();
const Movies=require('../../schema/Movies');

movieRoute.post('/', async (req, res) => {
    try {
        const movie = new Movies(req.body);
        await movie.save();
        res.status(201).send(movie);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all movies
movieRoute.get('/', async (req, res) => {
    try {
        const movies = await Movies.find({});
        res.send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single movie by ID
movieRoute.get('/:id', async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send(movie);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a movie by ID
movieRoute.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'year', 'rating', 'type', 'poster'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).send();
        }
        res.send({Message:"Movie updated successfully"});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a movie by ID
movieRoute.delete('/:id', async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send();
        }
        res.send({Message:"Movie deleted successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = movieRoute;