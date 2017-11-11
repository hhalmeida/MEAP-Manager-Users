const User = require('../models').User;
const Profile = require('../models').Profile;
const History = require('../models').History;

const HistoryService = require('./history');

const userService = () =>{
	const create = (newUser) =>{
		return new Promise((resolve, reject) =>{
			User.create(newUser).then(data => {
				let userId = data.dataValues.id;
				addProfile({userId:userId, title:newUser.profile});
				addHistory({userId:userId, title:'User Created', description:'System Created new user with ID: '+userId})
				return resolve(data.dataValues);
			}).catch(e => reject(e));
		});
	};

	const list = (id) =>{
		console.log(id.userId);
		return new Promise((resolve, reject)=>{
			User.findAll().then(user => {
				addHistory({userId:userId, title:'Listed users', description:'User with ID: '+userId+ 'listed users.'})
				return resolve(user);
			}).catch(e=> reject(e));
		});
	};

	const update = (id, user) =>{
		return new Promise((resolve, reject) =>{
			User.findById(id.userId).then(userItem => {
		        if (!userItem) {
		          return reject({
		            message: 'userItem Not Found',
		          });
		        }
		        userItem.update({username: user.username, email:user.email, passwd:user.passwd})
		          	.then(updatedProfile => {
		          		addHistory({userId:id.userId ,title:'Updated user' ,description:'User with ID: '+id.userId+ ' update yours informations.'});
		          		return resolve(updatedProfile);
			        })
		          	.catch(e => reject(e));
	     	}).catch(e => reject(e));
		});
	};

	const remove = (id) =>{
		return new Promise((resolve, reject) =>{
			console.log(id);

			User.findById(id.userId).then(userItem => {
		        if (!userItem) {
		          return reject({
		            message: 'userItem Not Found',
		          });
		        }
		        userItem.destroy()
		          	.then(updatedProfile => {
		          		addHistory({userId:id.userId ,title:'User Deleted' ,description:'User with ID: '+id.userId+ ' deleted.'});
		          		return resolve(updatedProfile);
			        })
		          	.catch(e => reject(e));
	     	}).catch(e => reject(e));
		});
	};

	return { create, list, update, remove };
};

module.exports = userService;

const addProfile = (profile) =>{
	return new Promise((resolve, reject) =>{
		Profile.create(profile)
		.then(data => {
			let history = {userId:profile.userId, title:'Adding '+profile.title+' user profile', description:'System adding profile: '+profile.title+ ', for user with id: '+profile.userId};
			HistoryService().addHistory(history).then(dataHistory => {
				return resolve(data.dataValues);
			});
		})
		.catch(e => reject(e));
	});
};

const addHistory=(history)=>{
	return new Promise((resolve, reject)=>{
		HistoryService().addHistory(history).then(dataHistory => resolve(dataHistory));
	});
};