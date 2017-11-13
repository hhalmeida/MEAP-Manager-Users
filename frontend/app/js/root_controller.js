'use strict';

angular
  .module('app')
  .controller('RootCtrl', RootCtrl);

RootCtrl.$inject = ['$scope','$rootScope','$route','$location','$timeout','$auth','ngToast','ENV', 'RootServices', 'LoadingManager','LoginService', 'ModalManager', 'FormUtils'];

function RootCtrl($scope,$rootScope,$route,$location,$timeout,$auth,ngToast,ENV,RootServices, LoadingManager,LoginService, ModalManager, FormUtils){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/
  $scope.imgBaseUrl = ENV.imgBaseUrl;
  var vm = this;

  vm.users = {};

  // Functions
  vm.init = init;
  vm.toggleSideNav = toggleSideNav;
  $rootScope.logout = _logout;
  $rootScope.atualizarSenha = atualizarSenha;
  vm.invalidPass = false;

  /**-------------------------------
           Implementation
  ---------------------------------**/

  /*
  -------------------------------------------*/
  function init(){
    _updateScreenSize();
    _getUsers();

    // vm.popupAtualizaSenha = ModalManager.modal();
    // vm.popupAtualizaSenha.replaceHide(replaceHidePass);
  }



  /*
  -------------------------------------------*/
  function _getUsers(){
    RootServices.getUsers().then(sucess,error)

    function sucess(data){
      vm.users = data;
    }

    function error(data){
      console.log("erro");
    }
  }


  /*
  -------------------------------------------*/
  // function _obterDadosUsuario(){
  //   LoginService.obterDadosUsuario().then(successCallback,errorCallback)

  //   function successCallback(data){
  //     $rootScope.usuarioLogado = data.usuario;

  //     // $rootScope.usuarioLogado = {
  //     //    nome: data.usuario.nome,
  //     //    interno:  true,
  //     //    perfil:   {id: 2},
  //     //    parceiro: {id: 19}
  //     //  };

  //   }

  //   function errorCallback(data){
  //     //console.log(data);
  //   }
  // }

  /*
  -------------------------------------------*/
  function _logout() {
    LoginService.logout().then(function(data) {
      $location.path('/login');
    }, function(data) {
      //console.log(data);
    });
  }

  /* Toggle Side Navbar
  -------------------------------------------*/
  function toggleSideNav(){
    $scope.isActive = !$scope.isActive;
  }

  /*
  -------------------------------------------*/
  function atualizarSenha(form) {
    FormUtils.setDirty(form);
    if (form.$invalid) return;

    if (!_passwordComparable(vm.popupAtualizaSenha.password.new, vm.popupAtualizaSenha.password.confirm)) {
      vm.invalidPass = true; return; } else { vm.invalidPass = false; }

   var payload = {
      password: vm.popupAtualizaSenha.password.old,
      new_password: vm.popupAtualizaSenha.password.new
    }

    LoginService.updatePassword(payload, successCallback, errorCallback);

    function successCallback(data) {
      ngToast.create(data.mensagem);
      vm.popupAtualizaSenha.hide();
      _logout();
    }

    function errorCallback(data) {
      ngToast.create({
        className: 'danger',
        content: data.data.mensagem
      });
    }
  }

  /*
  -------------------------------------------*/
  function replaceHidePass() {
    FormUtils.setPristine(vm.formPoupUpdatePass);
    vm.popupAtualizaSenha.password = undefined;
    vm.invalidPass = false;
  }

  /*
  -------------------------------------------*/
  function _passwordComparable(firstPass,secondPass) {
    return (firstPass === secondPass)?true:false;
  }

  /* Responsive layout helper
  ---------------------------------------------------- */
  $(window).bind("load resize", function(){
    _updateScreenSize();
    $scope.$apply();
  });

  function _updateScreenSize() {
    var windowWidth = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

    if (windowWidth < 544){$rootScope.screenSize = 0;} // col-xs-
    if (windowWidth >= 544){$rootScope.screenSize = 1;}  // col-sm-
    if (windowWidth >= 768){$rootScope.screenSize = 2;}  // col-md-
    if (windowWidth >= 992){$rootScope.screenSize = 3;}  // col-lg-
    if (windowWidth >= 1200){$rootScope.screenSize = 4;}  // col-xl-
  }
}
