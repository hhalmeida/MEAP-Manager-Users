
const UserServices = require('../services').UserServices;

module.exports = {
	create(req, res){
		return UserServices().create(req.body)
			.then(data =>res.send({data}))
			.catch(err => res.send(400).send(err));
	},

	list(req, res){
		return UserServices().list(req.query.userId)
			.then(data =>res.send({data}))
			.catch(err => res.send(400).send(err));
	},


	update(req, res){
		return UserServices().update(req.params, req.body)
			.then(data => res.send(data))
			.catch(err => res.status(400).send(err));
	},

	delete(req, res){
		return UserServices().remove(req.params)
			.then(data => res.send(data))
			.catch(err => res.status(400).send(err));
	},


};
