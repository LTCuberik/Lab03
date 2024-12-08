const axios = require('axios'); // Cài đặt axios
const { addMovie } = require('./MovieHandle'); // Đảm bảo bạn import hàm addMovie từ file MovieHandle.js

async function fetchMoviesAndAdd() {
  try {
    // Gửi yêu cầu GET đến API để lấy dữ liệu
    const response = await axios.get('http://matuan.online:2422/api/Movies');
    
    // Lặp qua các bộ phim và gọi addMovie để lưu vào cơ sở dữ liệu
    console.log(response.data);
    for (const movie of response.data) {
      const movieData = {
        id: movie.id,
        fullTitle: movie.full_title,
        year: movie.year,
        releaseDate: movie.release_date,
        runtimeMins: movie.runtime_mins,
        plotFull: movie.plot_full,
        image: movie.image,
        awards: movie.awards,
        director: movie.director,
        boxOffice: movie.box_office,
        imdbRating: movie.imdb_rating,
        ratingsJson: movie.ratings_json
      };

      // Gọi hàm addMovie để thêm bộ phim vào cơ sở dữ liệu
      await addMovie(movieData);
    }

    console.log('Movies added successfully.');
  } catch (err) {
    console.error('Error fetching movies:', err);
  }
}

// Gọi hàm fetchMoviesAndAdd để thực hiện
fetchMoviesAndAdd();
