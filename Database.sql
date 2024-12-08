-- Đặt schema mặc định là s20319
SET search_path TO s20319;

-- Xóa bảng nếu tồn tại trước khi tạo
DROP TABLE IF EXISTS s20319."MovieActor" CASCADE;
DROP TABLE IF EXISTS s20319."PopularMovie" CASCADE;
DROP TABLE IF EXISTS s20319."TopMovie" CASCADE;
DROP TABLE IF EXISTS s20319."Actor" CASCADE;
DROP TABLE IF EXISTS s20319."MovieGenre" CASCADE;
DROP TABLE IF EXISTS s20319."Genre" CASCADE;
DROP TABLE IF EXISTS s20319."Movie" CASCADE;

-- Bảng Actor
CREATE TABLE s20319."Actor" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255), -- Đường dẫn tới ảnh của diễn viên
    asCharacter VARCHAR(255) -- Tên nhân vật diễn viên thủ vai (có thể dùng mảng nếu cần)
);

-- Bảng Movie
CREATE TABLE s20319."Movie" (
    id VARCHAR(255) PRIMARY KEY,
    full_title VARCHAR(255) NOT NULL,
    year INTEGER,
    release_date DATE,
    runtime_mins INTEGER,
    plot_full TEXT,
    image VARCHAR(255), -- Đường dẫn tới ảnh của bộ phim
    awards VARCHAR(255),
    director VARCHAR[], -- Danh sách đạo diễn
    box_office NUMERIC,
    imdb_rating NUMERIC(3, 1),
    ratings_json JSONB -- Nếu muốn lưu thêm các hệ thống đánh giá như IMDB, RottenTomatoes...
);

-- Bảng Genre
CREATE TABLE s20319."Genre" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Bảng MovieGenre - Liên kết giữa bộ phim và thể loại
CREATE TABLE s20319."MovieGenre" (
    movie_id VARCHAR(255) REFERENCES s20319."Movie"(id) ON DELETE CASCADE,
    genre_id INTEGER REFERENCES s20319."Genre"(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, genre_id)
);

-- Bảng MovieActor - Liên kết giữa bộ phim và diễn viên
CREATE TABLE s20319."MovieActor" (
    movie_id VARCHAR(255) REFERENCES s20319."Movie"(id) ON DELETE CASCADE,
    actor_id VARCHAR(255) REFERENCES s20319."Actor"(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, actor_id)
);

-- Bảng TopMovies
CREATE TABLE s20319."TopMovie" (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    rank INTEGER,
    rating NUMERIC(3, 1)
);

-- Bảng PopularMovies
CREATE TABLE s20319."PopularMovie" (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    popularity NUMERIC(5, 2)
);

-- Cài đặt liên kết Movie-Popular-Top
ALTER TABLE s20319."TopMovie" ADD COLUMN movie_id VARCHAR(255) REFERENCES s20319."Movie"(id);
ALTER TABLE s20319."PopularMovie" ADD COLUMN movie_id VARCHAR(255) REFERENCES s20319."Movie"(id);
