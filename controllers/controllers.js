const movieModel = require('../models/models');

// Controller cho trang chi tiết phim
exports.getMovieDetail = (req, res) => {
    const movieId = req.query.id;
    // Gọi model để lấy thông tin phim (giả sử movieModel lấy từ cơ sở dữ liệu hoặc file)
    const movie = movieModel.getMovieById(movieId); // Model logic
    
    res.render('movie', { 
        movieId: movieId,
        movie: movie,
        isHome: false,
        isMovieDetail: true,
        isSearch: false,
    });
};

// Controller cho tìm kiếm phim
exports.searchMovies = (req, res) => {
    const searchQuery = req.query.query;
    const searchResults = movieModel.searchMovies(searchQuery); // Tìm kiếm trong model
    
    res.render('movie', { 
        query: searchQuery,
        searchResults: searchResults,
        isHome: false,
        isMovieDetail: false,
        isSearch: true,
    });
};
