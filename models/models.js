// Giả sử đây là nơi bạn xử lý dữ liệu, có thể từ file, cơ sở dữ liệu hoặc API

const movies = [
  { id: 1, title: 'Inception', description: 'A mind-bending thriller.' },
  { id: 2, title: 'The Dark Knight', description: 'Batman fights the Joker.' },
  { id: 3, title: 'Interstellar', description: 'Exploring space and time.' }
];

exports.getMovieById = (id) => {
  return movies.find(movie => movie.id === parseInt(id));
};

exports.searchMovies = (query) => {
  return movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
};
