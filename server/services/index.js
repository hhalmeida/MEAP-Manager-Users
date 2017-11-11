const UserServices = require('./user');
const HistoryServices = require('./history');
const ProfileServices = require('./profile');

let services = {
	UserServices:UserServices,
	HistoryServices:HistoryServices,
	ProfileServices:ProfileServices
};

module.exports = services;