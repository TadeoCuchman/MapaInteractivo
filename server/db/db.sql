CREATE TABLE users(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (50) NOT NULL,
	mail VARCHAR (255) NOT NULL,
	birth_date DATE NOT NULL,
	country VARCHAR (30),
	password VARCHAR (255) NOT NULL,
	rol VARCHAR (30) NOT NULL
);

INSERT INTO users (id, name, mail, birth_date, country, password, rol) VALUES (0, 'Tadeo', 'tadeo.cuchman@gmail.com', '08-015-1996', 'Uruguay', '$2b$10$cnqLbIeQHPKuztLRgPxWsOprH9BsGpalMQx7oeKA8MGgZiaFdTdfi','admin')


CREATE TABLE workspaces (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (150) NOT NULL,
	latlang VARCHAR (255) NOT NULL,
	created_date DATE NOT NULL,
	created_by BIGINT NOT NULL REFERENCES users(id),
	private BOOL NOT NULL,
	description VARCHAR (300)
);

CREATE TABLE zones(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	latlangs VARCHAR (255) NOT NULL,
    color VARCHAR (30) NOT NULL,
	date DATE NOT NULL,
	workspace_id BIGINT NOT NULL REFERENCES workspaces(id)	

);									


CREATE TABLE Point (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	latlang VARCHAR (255) NOT NULL,
	date DATE NOT NULL,
	workspace_id BIGINT NOT NULL REFERENCES workspaces(id)
	
);		



