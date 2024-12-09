const client = require('./db');

async function addMovie(movie) {
  const query = `
    INSERT INTO s20319."Movie" (id, full_title, year, release_date, runtime_mins, plot_full, image, awards, director, box_office, imdb_rating, ratings_json)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;
  const values = [
    movie.id, movie.fullTitle, movie.year, movie.releaseDate, movie.runtimeMins, movie.plotFull, movie.image, movie.awards, movie.director, movie.boxOffice, movie.imdbRating, movie.ratingsJson
  ];

  try {
    const res = await client.query(query, values);
    console.log('Movie added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding movie:', err);
  }
}

async function updateMovie(movieId, updatedData) {
    const query = `
      UPDATE s20319."Movie"
      SET 
        full_title = $1,
        year = $2,
        release_date = $3,
        runtime_mins = $4,
        plot_full = $5,
        image = $6,
        awards = $7,
        director = $8,
        box_office = $9,
        imdb_rating = $10,
        ratings_json = $11
      WHERE id = $12
      RETURNING *;
    `;
    const values = [
      updatedData.fullTitle, updatedData.year, updatedData.releaseDate, updatedData.runtimeMins, updatedData.plotFull, updatedData.image, updatedData.awards, updatedData.director, updatedData.boxOffice, updatedData.imdbRating, updatedData.ratingsJson, movieId
    ];
  
    try {
      const res = await client.query(query, values);
      console.log('Movie updated:', res.rows[0]);
    } catch (err) {
      console.error('Error updating movie:', err);
    }
}

async function deleteMovie(movieId) {
    const query = `
      DELETE FROM s20319."Movie" WHERE id = $1 RETURNING *;
    `;
    const values = [movieId];
  
    try {
      const res = await client.query(query, values);
      console.log('Movie deleted:', res.rows[0]);
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
}

module.exports = { addMovie };