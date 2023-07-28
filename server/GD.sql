/*
This is a prototype schema for the  psql database,
DO NOT RUN. the schema has incomplete restraints and contains some errors.
I will add tables individually for now
*/


CREATE TABLE player (
    player_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(254),
    password VARCHAR(100) NOT NULL,
    registration_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE game (
    game_id BIGSERIAL PRIMARY KEY,
    game_name VARCHAR(100),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('inprogress', 'completed', 'canceled')),
    map_id INTEGER REFERENCES map(map_id)
);

CREATE TABLE map (
    map_id BIGSERIAL PRIMARY KEY,
    map_name VARCHAR(100),
    map_image_url VARCHAR(255),
    generated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE player_game (
    game_player_id BIGSERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES player(player_id),
    game_id INTEGER REFERENCES game(game_id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE solar_system (
    system_id BIGSERIAL PRIMARY KEY,
    system_name VARCHAR(50),
    x_coordinate REAL,
    y_coordinate REAL,
    occupied BOOLEAN
);

CREATE TABLE planet (
    planet_id BIGSERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES solar_system(system_id),
    planet_name VARCHAR(50),
    occupied BOOLEAN
);

CREATE TABLE occupied_locations(
    occupied_id BIGSERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES player(player_id),
    location_type VARCHAR(20) CHECK (location_type IN ('planet', solar_system)),
    location_id INTEGER CHECK (location_type= 'solar_system' AND location_id IN (SELECT system_id FROM solar_system))
                            OR
                            (location_type='planet' AND location_id IN (SELECT planet_id FROM planet))
);

CREATE TABLE player_game_map (
    player_game_map_id BIGSERIAL PRIMARY KEY,
    player_game_id INTEGER REFERENCES player_game(player_game_id),
    map_id INTEGER REFERENCES map(map_id),
);