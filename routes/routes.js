const express = require('express');
const router = express.Router();
const movieController = require('../controllers/controllers');

// Route cho trang chi tiết phim
router.get('/movies', movieController.getMovieDetail);

// Route cho tìm kiếm phim
router.get('/searchs', movieController.searchMovies);

module.exports = router;
