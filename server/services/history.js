const History = require('../models').History;

const historyService = () =>{
	const addHistory = (history) =>{
		return new Promise((resolve, reject) =>{
			History.create(history)
				.then(data => resolve(data.dataValues))
				.catch(error => reject(error));
		});
	};

	const listAll = (id) =>{

		return new Promise((resolve, reject) =>{
			History.findAll().then(histories => { 
				addHistory({userId:id.userId, title:'Listed All Histories', description:'User with ID: '+id.userId+ ' listed all histories.'})
				return resolve(histories);
			}).catch(e=> reject(e));
		});
	};

	const listByUserId = (id, userId) =>{
		return new Promise((resolve, reject) =>{

			History.findAll({
				where:{userId:id.userId},
			}).then(historyUser => {
		        if (!historyUser) {
		          return reject({
		            message: 'History Not Found',
		          });
		        }

		       	addHistory({userId:id.userId, title:'Listed User Histories', description:'User with ID: '+id.userId+ ' listed histories for user .'})
				return resolve(historyUser);
	     	}).catch(error => reject(error));
		});
	};

	return { addHistory, listAll, listByUserId };
};

module.exports = historyService;


