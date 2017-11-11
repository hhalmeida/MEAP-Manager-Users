
const ProfileServices = require('../services').ProfileServices;

module.exports = {
	update(req, res){
		return ProfileServices().update(req.body)
			.then(data => res.send(data))
			.catch(err => res.status(400).send(err));
	},
};