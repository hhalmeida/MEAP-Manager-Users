const Profile = require('../models').Profile;

const HistoryService = require('./history');

const ProfileService = () =>{
	const update = (profile) =>{
		console.log(profile)
		return new Promise((resolve, reject) =>{
			updateProfile(profile).then(data => resolve(data)).catch(error => reject(error));
		});
	};	
	return { update };
};

module.exports = ProfileService;

updateProfile = (profile) =>{
	return new Promise((resolve, reject) =>{
		let findByUserId = {where:{userId:profile.userId}};

		Profile.find(findByUserId).then(profileItem => {
	        if (!profileItem) {
	          return reject({
	            message: 'TodoItem Not Found',
	          });
	        }

	        let title = {title: profile.profile};

	        profileItem.update(title)
	          	.then(updatedProfile => {
		        	let history = {userId:profile.userId, title:'Updating to '+profile.profile+' profile', description:'Updating profile: '+profile.profile+ ', for user with id: '+profile.userId};
					HistoryService().addHistory(history).then(dataHistory => {
						return resolve(updatedProfile.dataValues);
					});
		        })
	          	.catch(error => res.status(400).send(error));
     	}).catch(error => res.status(400).send(error));
	});
};