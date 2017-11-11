
const UserService = require('../services/user')

module.exports = {
	create(newUser){
		return UserService().create(newUser);
	},

	// depositoAtm(valorDeposito){
	// 	return ATMServices().depositoAtm(valorDeposito);
	// },

	// saqueAtm(valorSaque){
	// 	return ATMServices().saqueAtm(valorSaque);
	// },

	// saldoAtm(){
	// 	return ATMServices().obterSaldoAtm();
	// },

	// initAtm(){
	// 	return ATMServices().inicializaAtm();
	// }

};



// module.exports = {
//   create(req, res) {

//   	let newUser = {
//   		username: req.body.username,
// 		email: req.body.email,
// 		passwd : req.body.passwd
//   	};

//   	console.log("Controller :: newUser");
//   	console.log(newUser);
// 	console.log("---------------------");


//   	let ddd = UserService.create(newUser);

//   	return res.send(200);


 //    let user = User
	// 		.create({
	// 			username: req.body.username,
	// 			email: req.body.email,
	// 			passwd : req.body.passwd
	// 		})
	// 		.then(user => {

	// 			console.log('dentro do then');

	// 			console.log(user)

	// 			Profile.create({userId: user.id, title:res.body.profile});
	// 			let createUserHistory = {userId:user.id, title:'new user', description:'Created new User in system'}
	// 			HistoryService.addHistory(createUserHistory);

	//         	return res.status(200).send(user);
	// 	    })
	// 	    .catch(error => res.status(400).send(error));
	// 		// .then(user => res.status(200).send(user))
	// 		// .catch(error => res.status(400).send(error));

		


	// return user;
//   },

//   list(req, res) {
//   return User
//     .all()
//     .then(users => res.status(200).send(users))
//     .catch(error => res.status(400).send(error));
// 	},
// };


	// const NOTAS = obterNotasAtm();

 // 	const obterMinimoNotas = (valorRequisitado) => {
 // 		return new Promise((resolve,reject) => {
	// 		let _minimoNotas = 0;
	//  		let _qtdNotasDisponiveis = count(NOTAS);	

	//  		do{
	//  			if(valorRequisitado >= NOTAS[_qtdNotasDisponiveis]){
	//  				let calc = valorRequisitado / NOTAS[_qtdNotasDisponiveis];
	//  				_minimoNotas += Math.round( calc ); 
	//  				valorRequisitado %= NOTAS[_qtdNotasDisponiveis];
	//  			}else{
	//  				_qtdNotasDisponiveis--;
	 				
	//  				if(_qtdNotasDisponiveis == -1){
	//  					return reject("Notas insuficiente para saque.");
	//  					break;
	//  				}
	//  			}
	//  		}while(valorRequisitado > 0);
	 		
	//  		return resolve(_minimoNotas);
 // 		});
 // 	};

 // 	const depositoAtm = (valorDeposito) =>{
 // 		return new Promise((resolve,reject) => {
 // 			fnDepositarAtm(valorDeposito).then((atm_deposito)=>{
 // 				let novoDeposito = {valorDepositado:valorDeposito, atm:atm_deposito};
 // 				return resolve(novoDeposito);
 // 			},(e)=>{
 // 				return reject(e);
 // 			});
 // 		});
 // 	};

 // 	const saqueAtm = (valorSaque) =>{
	// 	return new Promise((resolve,reject) => {
 // 			fnSacarAtm(valorSaque).then((atm_saque)=>{
 // 				let novoSaque = {valorSacado:valorSaque, atm:atm_saque};
 // 				return resolve(novoSaque);
 // 			},(e)=>{
 // 				return reject(e);
 // 			});
 // 		});
 // 	};

 // 	const obterSaldoAtm = () =>{
 // 		return new Promise((resolve,reject) => {
 // 			obterAtm().then((atm) => {
 // 				console.log(atm)
	// 			return resolve({saldoAtual:atm[0].saldoTotal, atm:{_id:atm[0]._id}});
	// 		},(e) => {
	// 			return reject(e); 
	// 		});
 // 		});
 // 	};

 // 	const inicializaAtm = () =>{
 // 		return new Promise((resolve,reject) => {
 // 			obterAtm().then((atm) => {
	// 			return resolve(atm[0]);
	// 		},(e) => {
	// 			return reject(e); 
	// 		});
 // 		});
 // 	};