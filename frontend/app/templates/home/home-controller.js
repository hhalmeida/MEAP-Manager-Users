'use strict';

angular
  .module('app.controllers')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope','$rootScope','$location','ngToast','HomeService','histories'];

function HomeCtrl($scope,$rootScope,$location,ngToast,HomeService,histories){

  /**-------------------------------
         View Model Definition
  ---------------------------------**/

  var vm = this;
  vm.histories = (histories == null || histories == undefined) ? {} : histories;
  // Functions
  vm.init = init;
  vm.getHistory = getHistory;

  /**-------------------------------
           Implementation
  ---------------------------------**/
  /*
  -------------------------------------------*/
  function init(){
    (histories == null || histories == undefined) '':getHistory(0);
  }

  /*
  -------------------------------------------*/
  function getHistory(){
      HomeService.getHistories(userId).then(success, error);
      function success(data){
        vm.histories = data;
      }

      function error(data){
      }
  }


}
