'use strict';

angular
  .module('app.controllers')
  .controller('ListarUsuariosCtrl', ListarUsuariosCtrl);

ListarUsuariosCtrl.$inject = ['$scope','$rootScope','$location','$sce','$timeout','$filter','$window','ngToast','FormUtils','ModalManager','GerarRelatoriosService'];

function ListarUsuariosCtrl($scope,$rootScope,$location,$sce,$timeout,$filter,$window,ngToast,FormUtils,ModalManager,GerarRelatoriosService){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;
  vm.profiles = [];
  
  

  // Functions
  vm.init = init;
  vm.voltar = voltar;

 /**-------------------------------
       Implementation
  ---------------------------------**/

  /*
  -------------------------------------------*/
  function init() {
    vm.usuarioLogado = $rootScope.usuarioLogado;
    //if(vm.usuarioLogado.perfil.id != 2) {$location.path('/'); return;}
    
    vm.filterSearch = '';
    vm.user_partner_id = '';
    vm.users = [];

    vm.profiles = [];
    vm.partnerList = [];

    vm.pagination = {
      totalItems: 100,
      currentPage: 1,
      itensPerPage: 20,
      pageChanged: _userSearch,
    }

    _userSearch(true);
  }

  /*
  -------------------------------------------*/
  function _userSearch(isUpdate) {
    //if (!vm.user_search || !vm.user_partner_id) return;
    if (isUpdate) vm.filterSearch = vm.user_search;

    var payload = {
      query: (vm.user_search) ? vm.user_search : '',
      parceiro_id: (vm.user_partner_id != "") ? parseInt(vm.user_partner_id) : -1,
      pagina: vm.pagination.currentPage
    }

    vm.users = [
    {"nome":"José Luiz", "email":"jose.luiz@teste.com", "perfil":{"descricao":"Administrador"}, "dataCadastro":"25/08/2017"},
    {"nome":"Maria Albuquerque", "email":"Maria.Albuquerque@teste.com", "perfil":{"descricao":"Professora"}, "dataCadastro":"25/08/2017"},
    {"nome":"Antonio Guimarães", "email":"Antonio.Guimaraes@teste.com", "perfil":{"descricao":"Usuário"}, "dataCadastro":"25/08/2017"},
    {"nome":"Clara Geronimo", "email":"Clara.Geronimo@teste.com", "perfil":{"descricao":"Atendente"}, "dataCadastro":"25/08/2017"},
    {"nome":"Junior Terceiro", "email":"Junior@teste.com", "perfil":{"descricao":"Aluno"}, "dataCadastro":"25/08/2017"},
    {"nome":"Dell Asus", "email":"dell@teste.com", "perfil":{"descricao":"Administrador"}, "dataCadastro":"25/08/2017"}];

    vm.pagination.totalItems = 50//data.total_itens;

    // UsuariosService.getUserSearch(payload, successCallback, errorCallback)
    //   .then(successCallback, errorCallback);

    // function successCallback(data) {
    //   vm.users = data.usuarios;
    //   vm.pagination.totalItems = data.total_itens;
    // }

    // function errorCallback(data) {
    //   console.log(data);
    //   ngToast.create({
    //     className: 'danger',
    //     content: 'Ops! Algo deu errado. Tente de novamente...'
    //   });
    // }

  }

  /*
  -------------------------------------------*/
  function _edit(id) {
    if ($rootScope.usuarioLogado.perfil.id != 2) { return; }
    $location.path('/usuario/' + id);
  }

  /*
  -------------------------------------------*/
  function _destroy(id) {
    if (vm.usuarioLogado.perfil.id != 2) return;
    UsuariosService.deleteUser(id).then(function(data) {
      _userSearch(true);
    }, function(data) {
      //console.log(data);
    });
  }

  
  /*
  -------------------------------------------*/
  function voltar(){
    $window.history.back();
  }
}

