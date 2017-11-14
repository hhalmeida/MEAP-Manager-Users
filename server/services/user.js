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

	const list = (query) =>{
		return new Promise((resolve, reject)=>{
			if(query.userId){
				User.findById(query.userId).then(user => {
					Profile.findAll({where:{userId:user.id}}).then(profile =>{
						addHistory({userId:query.id, title:'List user', description:'User with ID: '+query.id+ ' listed user with id: '+query.userId+'.'})
						let myUser = {id: user.id, username: user.username, email: user.email, passwd:user.passwd, profile: profile[0].dataValues.title};
						return resolve(myUser);
					}).catch(e => reject(e));
	     		}).catch(e => reject(e));
			}else{
				User.findAll().then(users => {
					if(users.length > 0){
						addHistory({userId:query.id, title:'List all users', description:'User with ID: '+query.id+ ' listed users.'})
					}else{
						addHistory({userId:query.id, title:'System list all users', description:'There are no registered users'})
					}
					return resolve(users);
				}).catch(e=> reject(e));
			}
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
		        userItem.update({username: user.username, email:user.email, passwd:user.passwd}).then(updatedUser => {
		          		addHistory({userId:id.userId ,title:'Updated user' ,description:'User with ID: '+id.userId+ ' update yours informations.'});
		          		updateProfile(userItem.id, user.profile);
		          		return resolve(updatedUser);
			        })
		          	.catch(e => reject(e));
	     	}).catch(e => reject(e));
		});
	};

	const remove = (id) =>{
		return new Promise((resolve, reject) =>{
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

const updateProfile = (userId, profile) =>{
	return new Promise((resolve, reject) =>{
		Profile.findAll({
			where:{userId:userId}
		}).then(data => {
			let history = {userId:profile.userId, title:'Updated '+profile.title+' user profile', description:'User with id: '+profile.userId+ ' updated to profile: '+profile.title+ ' .'};
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