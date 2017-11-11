
const UserServices = require('../services').UserServices;

module.exports = {
	create(req, res, next){
		return UserServices().create(req.body)
			.then(data =>res.send({data}))
			.catch(err => res.send(400).send(err));
	},

	list(req, res, next){
		return UserServices().list(req.params)
			.then(data =>res.send({data}))
			.catch(err => res.send(400).send(err));
	},


	update(req, res, next){
		return UserServices().update(req.params, req.body)
			.then(data => res.send(data))
			.catch(err => res.status(400).send(err));
	},

	delete(req, res, next){
		return UserServices().remove(req.params)
			.then(data => res.send(data))
			.catch(err => res.status(400).send(err));
	},


};
