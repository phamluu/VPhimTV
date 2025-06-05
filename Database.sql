php artisan make:migration create_movie_types_table
php artisan make:migration create_movies_table
php artisan make:migration create_movie_views_table
php artisan make:migration create_movie_views_details_table
php artisan make:migration create_movie_comments_table
php artisan make:migration create_movie_comment_replies_table
php artisan make:migration create_movie_favorites_table
php artisan make:migration create_movie_histories_table
php artisan make:migration create_countries_table
php artisan make:migration create_categories_table
php artisan make:migration create_movie_categories_table
php artisan make:migration create_episodes_table

CREATE TABLE IF NOT EXISTS movie_types (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    original_name VARCHAR(255),
    content TEXT,
    type_id INTEGER NOT NULL, -- Foreign Key movie_types.id,
    status VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    poster_url TEXT,
    thumb_url TEXT,
    time VARCHAR(100),
    episode_current VARCHAR(100),
    episode_total VARCHAR(100),
    quality VARCHAR(50),
    language VARCHAR(50),
    year VARCHAR(50),
    actor VARCHAR(255),
    director VARCHAR(255),
    country_id INTEGER NOT NULL, -- Foreign Key countries.id,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_views (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER,
    episode_id INTEGER NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS movie_comments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    reply_to INTEGER,
    content TEXT,
    status VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_favorites (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL, -- Foreign Key users.id,
    movie_id INTEGER NOT NULL, -- Foreign Key movies.id,
    status VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_histories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL, -- Foreign Key users.id,
    movie_id INTEGER NOT NULL, -- Foreign Key movies.id,
    episode_id INTEGER, -- Foreign Key episodes.id,
    progress_seconds INTEGER DEFAULT 0,
    status VARCHAR(50),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_categories (
    movie_id INTEGER NOT NULL, -- Foreign Key movies.id,
    category_id INTEGER NOT NULL, -- Foreign Key categories.id,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS episodes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movie_id INTEGER, -- Foreign Key movies.id,
    server_name VARCHAR(100),
    episode_name VARCHAR(100),
    slug VARCHAR(255),
    file_name TEXT,
    link_embed TEXT,
    link_m3u8 TEXT,
    link_mp4 TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);