const express = require("express");
const router = express.Router();

const pool = require("../db/index");

module.exports = router;


Point(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	latlang VARCHAR (255) NOT NULL,
	date DATE NOT NULL,
	user_id BIGINT NOT NULL REFERENCES users(id)

);	

zones(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	latlangs VARCHAR (255) NOT NULL,
    color VARCHAR (30) NOT NULL,
	date DATE NOT NULL,
	user_id BIGINT NOT NULL REFERENCES users(id)

);		