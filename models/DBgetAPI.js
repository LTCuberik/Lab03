const axios = require('axios'); // Cài đặt axios
const { addMovie } = require('./MovieHandle'); // Đảm bảo bạn import hàm addMovie từ file MovieHandle.js

function calculateRevenue(boxOffice) {
  const parseAmount = (amount) => parseInt(amount.replace(/[\$,]/g, "")) || 0; // Loại bỏ ký tự $ và , để chuyển thành số
  let gross;
  if (!boxOffice){ return 0 }
  else {
    gross = parseAmount(boxOffice.cumulativeWorldwideGross);
  }
  return gross;
}

async function fetchMoviesAndAdd() {
  try {
    // Gửi yêu cầu GET đến API để lấy dữ liệu
    const response = await axios.get('http://matuan.online:2422/api/Movies');
    
    // Lặp qua các bộ phim và gọi addMovie để lưu vào cơ sở dữ liệu
    for (const movie of response.data) {
      const movieData = {
        id: movie.id,
        fullTitle: movie.fullTitle,
        year: movie.year,
        releaseDate: movie.releaseDate,
        runtimeMins: movie.runtimeMins,
        plotFull: movie.plotFull,
        image: movie.image,
        awards: movie.awards,
        director: JSON.stringify(movie.directorList || {}),
        boxOffice: calculateRevenue(movie.boxOffice),
        ratingsJson: JSON.stringify(movie.ratings || {})
      };
      // Gọi hàm addMovie để thêm bộ phim vào cơ sở dữ liệu
      await addMovie(movieData);
    }

    console.log('Movies added successfully.');
  } catch (err) {
    console.error('Error fetching movies:', err);
  }
}



module.exports = { fetchMoviesAndAdd, calculateRevenue};