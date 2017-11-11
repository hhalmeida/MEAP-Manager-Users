const User = require('../models').User;
const Profile = require('../models').Profile;
const History = require('../models').History;

const HistoryService = require('./history');

const userService = () =>{
	const create = (newUser) =>{
		return new Promise((resolve, reject) =>{
			User.create(newUser).then(data => {
				let userId = data.dataValues.id;
				let history = {userId:userId, title:'User Created', description:'System Created new user with ID: '+userId};
				let profile = {userId:userId, title:newUser.profile};

				addProfile(profile);
				
				HistoryService().addHistory(history).then(dataHistory => {
					return resolve(data.dataValues);
				});

			}).catch(error => reject(error));
		});
	};

	return { create };
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
		.catch(error => reject(error));
	});
};

// module.exports = {
// 	create(newUser) {


//     	User.create({
// 				username: newUser.username,
// 				email: newUser.email,
// 				passwd : newUser.passwd
// 		}).then(userCreted =>{
// 			this.user = userCreted;

// 			console.log("Controller :: newUser");
// 	  		console.log(user);
// 			console.log("---------------------");


// 		});
// 			// .then(user => res.status(200).send(user))
// 		 //    .catch(error => res.status(400).send(error));
// 			// .then(user => res.status(200).send(user))
// 			// .catch(error => res.status(400).send(error));


		

// 		return user;
//   	},
// };