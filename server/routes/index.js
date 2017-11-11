const usersCtrl = require('../controllers').users;

module.exports = (app) =>{
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Wellcome to the Manager users API!',
	}));

	//POST :: Create users
	//app.post('/api/users', usersCtrl.create);

	//GET  :: List all users
	//app.get('/api/users', usersCtrl.list);

	app.post('/api/users', (req, res) => {
		usersCtrl.create(req.body).then((data) => {
		    res.send({data})
		}, (e) => {
		  	console.log(e);
		    res.status(400).send(e);
		});
	});
};