const express = require('express');
const router = express.Router();
const {check,body,validationResult} = require('express-validator');
const db = require('../db');


router.get('/', async function (req, res, next) {
    let rsp = await db.query('SELECT email FROM users');
	//router.get('/:id', function(req,res,next) {
	//id = parseInt(req.params.id)	
		
    res.render('register', {
        title: 'Register',
        err: undefined,
        users: rsp.rows,
        user: req.session.user
    });
});

router.post('/', [
body('email').trim().isEmail(),
body('pass').trim().isLength({ min:3, max:20 })
//body('employedsince').toInt().isInt({min:1970,max:2021}),
],
async function (req, res, next) {
const errors = validationResult(req);
if (!errors.isEmpty()) {
	res.render('register', {
		title: 'Register',
		err: "Invalid input!",
		users: [],
		user: req.session.user
	});
} else {
	try {
		await db.query('INSERT INTO users(email, password) VALUES ($1, $2)',
			[req.body.email, req.body.pass]);
		req.session.user = {email: req.body.email};
		res.redirect('/register');
	} catch (err) {
		console.log(err);
		res.render('register', {
			title: 'Register',
			err: "Database error!",
			users: [],
			user: req.session.user
		});
	}
}
});

module.exports = router;