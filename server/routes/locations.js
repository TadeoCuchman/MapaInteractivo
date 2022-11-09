const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/jwt-validate");


const pool = require("../db/index");


router.get('/workspaces', verifyToken, async (req, res) => {
	try{
		const array = await pool.query('SELECT * FROM workspaces WHERE private = false AND created_by = $1 ORDER BY created_date DESC', [req.user.id])
		if(array.rowCount > 0){
			return res.json({ success: true, message:'Espacio de trabajo:', workspace}).status(200)
		} else {
			return res.json({ success: false, message:'No se encontraron espacios de trabajo'}).status(400)
		}

	}catch (err) {
		return res.json({
			success: false,
			message: "Error with database registering a workspace" + JSON.stringify(err)
		}).status(400)
	}
})


router.post('/newWorkspace', verifyToken, async (req, res) => {
	try{
		console.log(req.body)

		if (
			req.body.name &&
			req.body.latlang &&
			req.body.created_date &&
			req.body.private != null
		  ) {

			const workspace = await pool.query('INSERT INTO workspaces (name, latlang, created_date, created_by, private, description) VALUES ($1, $2, $3, $4, $5, $6)', 
			[req.body.name, req.body.latlang, req.body.created_date, req.user.id, req.body.private, req.body.description])

			if(workspace){
				return res.json({ success: true, message:'Espacio de trabajo creado exitosamente', workspace}).status(200)
			} else {
				return res.json({ success: false, message:'No se creo el espacio trabajo.'}).status(400)
			}
	
		  } else {
			return res.json({ success: false, message:'Faltan rellenar campos.'}).status(400)
		  }
	} catch (err) {
		return res.json({
			success: false,
			message: "Error with database registering a workspace" + JSON.stringify(err),
		});
	}
})



//  workspaces (
// 	id BIGSERIAL NOT NULL PRIMARY KEY,
// 	name VARCHAR (150) NOT NULL,	
// 	latlang VARCHAR (255) NOT NULL,
// 	created_date DATE NOT NULL,
// 	created_by BIGINT NOT NULL REFERENCES users(id),
// 	private BOOL NOT NULL
//  );

// Point(
// 	id BIGSERIAL NOT NULL PRIMARY KEY,
// 	latlang VARCHAR (255) NOT NULL,
// 	date DATE NOT NULL,
// 	user_id BIGINT NOT NULL REFERENCES users(id)

// );	

// zones(
// 	id BIGSERIAL NOT NULL PRIMARY KEY,
// 	latlangs VARCHAR (255) NOT NULL,
//     color VARCHAR (30) NOT NULL,
// 	date DATE NOT NULL,
// 	user_id BIGINT NOT NULL REFERENCES users(id)

// );		
module.exports = router;