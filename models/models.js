//import { dbProvider } from '../public/script/DBprovider';
const client = require('./db');

const movies = [
  { id: 1, title: 'Inception', description: 'A mind-bending thriller.' },
  { id: 2, title: 'The Dark Knight', description: 'Batman fights the Joker.' },
  { id: 3, title: 'Interstellar', description: 'Exploring space and time.' }
];

exports.getMovieById = (id) => {
  return movies.find(movie => movie.id === parseInt(id));
};

exports.getAllMovie  = async () =>  {
  try {
    const result = await client.query(`
        select * from s20319."Movie"
    `);
    console.log(result.rows);
    return result.rows;
} catch (error) {
  res.status(500).send('Error fetching data: ' + error.message);
}
};

exports.searchMovies = (query) => {
  return movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
};

exports.getTopRevenueMovies = () => {
  return movies.slice(0, 5); // Lấy 5 bộ phim doanh thu cao nhất
};

exports.getPopularMovies = () => {
  return movies.slice(0, 5); // Lấy 5 bộ phim phổ biến nhất
};

exports.getTopRatedMovies = () => {
  return movies.slice(0, 5); // Lấy 5 bộ phim đánh giá cao nhất
};
