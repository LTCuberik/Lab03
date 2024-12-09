const client = require('./db');

async function addMovie(movie) {
  const checkQuery = `
    SELECT 1 FROM s20319."Movie" WHERE id = $1;
  `;
  const checkValues = [movie.id];

  try {
    // Check if the movie ID already exists
    const checkRes = await client.query(checkQuery, checkValues);

    if (checkRes.rows.length > 0) {
      console.log('Movie with this ID already exists.');
      return; // Skip the insert if the movie ID already exists
    }

    // Proceed with the insertion if the movie ID does not exist
    const query = `
      INSERT INTO s20319."Movie" (id, full_title, year, release_date, runtime_mins, plot_full, image, awards, director, box_office, ratings_json)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const values = [
      movie.id, movie.fullTitle, movie.year, movie.releaseDate, movie.runtimeMins, movie.plotFull, movie.image, movie.awards, movie.director, movie.boxOffice, movie.ratingsJson
    ];

    const res = await client.query(query, values);
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