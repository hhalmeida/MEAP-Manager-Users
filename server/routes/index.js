const usersCtrl = require('../controllers').users;
const historyCtrl = require('../controllers').histories;
const profileCtrl = require('../controllers').profiles;

module.exports = (app) =>{
	const BASEURL = '/API/';

	app.get('/api', (req, res, next) => res.status(200).send({
		message: 'Wellcome to the Manager users API!',
	}));


	// Users
	app.get(BASEURL+'users',usersCtrl.list);

	app.post(BASEURL+'users',usersCtrl.create);
	app.put(BASEURL+'users/:userId',usersCtrl.update);
	app.delete(BASEURL+'users/:userId',usersCtrl.delete);

	// Profiles
	app.put(BASEURL+'profiles',profileCtrl.update);

	//histories
	app.get(BASEURL+'histories',historyCtrl.listAll);
	app.get(BASEURL+'histories/:userId',historyCtrl.listByUserId);

	// app.post('/api/users', (req, res) => {
	// 	usersCtrl.create(req.body).then((data) => {
	// 	    res.send({data})
	// 	}, (e) => {
	// 	  	console.log(e);
	// 	    res.status(400).send(e);
	// 	});
	// });
};