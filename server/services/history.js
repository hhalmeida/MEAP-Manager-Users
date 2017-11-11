const History = require('../models').History;

const historyService = () =>{
	const addHistory = (history) =>{
		return new Promise((resolve, reject) =>{
			History.create(history)
				.then(data => resolve(data.dataValues))
				.catch(error => reject(error));
		});
	};

	

	return { addHistory };
};

module.exports = historyService;


