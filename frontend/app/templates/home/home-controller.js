'use strict';

angular
  .module('app.controllers')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope','$route','$rootScope','$location','ngToast','HomeService','historiesUser', 'RootServices'];

function HomeCtrl($scope,$route,$rootScope,$location,ngToast,HomeService,historiesUser, RootServices){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;
  vm.histories = historiesUser;
  vm.userId = $route.current.params.userId == undefined ? null : $route.current.params.userId;
  
  // Functions
  vm.init = init;
  vm.getHistory = getHistory;
  vm.checkId = checkId;
  vm.addUser = addUser;
  vm.editUser = editUser;
  vm.viewHistories = viewHistories;
  vm.saveUser = saveUser;
  vm.updateUser = updateUser;
  vm.cancel = cancel;
  /**-------------------------------
           Implementation
  ---------------------------------**/
  /*
  -------------------------------------------*/
  function init(){
    vm.histories.length == 0 ? getHistory() : historiesUser;
    setview('viewHistories');
  }

  /*
  -------------------------------------------*/
  function getHistory(userId){
      HomeService.getHistories(userId).then(success, error);
      function success(data){
        setview('viewHistories');
        if (data.length > 0){
          vm.histories = data;
        }else{
          vm.message = "Nenhum Histórico registrado para esse usuário!"
        }
      }
      
      function error(data){
        console.log(data)
      }
  };

  /*
  -------------------------------------------*/
  function checkId(userId){
    if(userId == null){
      return true;
    }else{
      return false;
    }
  };

  /*
  -------------------------------------------*/
  function addUser(){
    setview('addUser');
  };

  /*
  -------------------------------------------*/
  function saveUser(){
     var payload = {
      username : vm.user.username,
      email: vm.user.email,
      passwd : vm.user.senha,
      profile: vm.user.profile
     };

     RootServices.userCreate(payload, sucess, error);

     function sucess(data){
      ngToast.create({className: 'success',
              content: 'Usuário salvo com sucesso!'
      });
      setview('viewHistories');
      updateUserList();
     }
     function error(data){
      ngToast.create({className: 'danger',
              content: 'Erro ao salvar usuário!'
      });
     }
  }

  /*
  -------------------------------------------*/
  function editUser(){
    if(vm.userId == null){
      ngToast.create({className: 'danger',
              content: 'Selecione um usuário!'
      });
    }else{
      RootServices.getUsers(vm.userId, vm.userId).then(success, error);

      function success(data){
        setview('editUser');
        vm.user = data;
        
      }
      
      function error(data){
        console.log(data)
      }
    }
  }

  /*
  -------------------------------------------*/
  function cancel(){
    setview('viewHistories');
    $location.path('/home');
  }

  /*
  -------------------------------------------*/
  function updateUser(user){
    var payload = {
      id : vm.user.id,
      username : vm.user.username,
      email: vm.user.email,
      passwd : vm.user.senha,
      profile: vm.user.profile
     };

     RootServices.userUpdate(payload, sucess, error);

     function sucess(data){
      ngToast.create({className: 'success',
              content: 'Usuário editado com sucesso!'
      });

      updateUserList();
      setview('viewHistories');
     }
     function error(data){
      ngToast.create({className: 'danger',
              content: 'Erro ao editar usuário!'
      });
     }
  };

  /*
  -------------------------------------------*/
  function updateUserList(){
    console.log("Prepara.... vamos la")
    $rootScope.$emit("UpdateUser", {});
  };


  /*
  -------------------------------------------*/
  function viewHistories(user){
    setview('viewHistories');
  }

  /*
  -------------------------------------------*/
  function setview(action){
    switch(action) {
      case 'addUser':
          vm.actionadduser = true;
          vm.actionedituser = false;
          vm.actionviewhistories = false;
          break;
      case 'editUser':
          vm.actionadduser = false;
          vm.actionedituser = true;
          vm.actionviewhistories = false;
          break;
      case 'viewHistories':
          vm.actionadduser = false;
          vm.actionedituser = false;
          vm.actionviewhistories = true;
          break;
    }
  }
}
