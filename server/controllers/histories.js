
const HistoryServices = require('../services').HistoryServices;

module.exports = {
	listAll(req, res, next){
		return HistoryServices().listAll(req.params)
			.then(data => res.send({data}))
			.catch(err => res.status(400).send(err));
	},
	listByUserId(req, res, next){
		return HistoryServices().listByUserId(req.params)
			.then(data => res.send({data}))
			.catch(err => res.status(400).send(err));
	},
};