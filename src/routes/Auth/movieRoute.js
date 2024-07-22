const express = require('express');
const movieRoute = express.Router();
const multer = require('multer');
const Movies=require('../../schema/Movies');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/'); // Uploads will be stored in './uploads/' directory
    },
    filename: function (req, file, cb) { 
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with original extension
    }
});

const upload = multer({ storage: storage });


movieRoute.post('/', upload.single('poster'), async (req, res) => {
    try {
        const { title, year, rating, type } = req.body;
        const movie = new Movies({
            title,
            year,
            rating,
            type,
            poster: req.file.path
        });
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
movieRoute.put('/:id', upload.single('poster'), async (req, res) => {
    try {
        const { title, year, rating, type } = req.body;
        const movieId = req.params.id;

        // Find the movie by ID
        const movie = await Movies.findById(movieId);

        if (!movie) {
            return res.status(404).send({ error: 'Movie not found' });
        }

        // Update movie details
        movie.title = title;
        movie.year = year;
        movie.rating = rating;
        movie.type = type;

        // Update poster if a new one is uploaded
        if (req.file) {
            movie.poster = req.file.path;
        }

        // Save updated movie
        await movie.save();

        res.status(200).send({"message":"Movie details updated successfully",
            data:movie
        });
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