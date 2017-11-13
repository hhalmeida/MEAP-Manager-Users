'use strict';

/* Satellizer $authProvider
----------------------------------------*/
angular.module('app')
  .config(['$authProvider','ENV',function($authProvider,ENV) {
    $authProvider.baseUrl = ENV.servicesBaseUrl;
    $authProvider.loginUrl = '/login';
    $authProvider.withCredentials = false;
    $authProvider.tokenHeader = 'Poliedro-Auth-Token';
    $authProvider.tokenType  = '' ;
  }
]);

/* ngToast
----------------------------------------*/
angular.module('app')
  .config(['ngToastProvider',function(ngToastProvider) {
    ngToastProvider.configure({
      animation:"fade",
      verticalPosition:"bottom",
      dismissButton:true,
      timeout:8000
    });
  }
]);

/* UI-Bootstrap Datepicker
----------------------------------------
angular.module('app')
.config(['uibDatepickerConfig','uibDatepickerPopupConfig',function(uibDatepickerConfig,uibDatepickerPopupConfig){
  uibDatepickerConfig.showWeeks = false;

  uibDatepickerPopupConfig.altInputFormats = [];
  uibDatepickerPopupConfig.clearText = 'Limpar';
  uibDatepickerPopupConfig.closeText = 'Fechar';
  uibDatepickerPopupConfig.currentText = 'Hoje';
  uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
  uibDatepickerPopupConfig.showButtonBar = false;
}])*/


/* Rotas Angular
----------------------------------------*/
angular.module('app')
  .config(function($routeProvider, $sceDelegateProvider) {
    $routeProvider

    .when('/', {
      redirectTo: '/home'
    })

    .when('/login', {
      templateUrl: 'templates/login/login.html',
      controller: 'LoginCtrl as vm'
    })

    .when('/home', {
      templateUrl: 'templates/home/home.html',
      controller: 'HomeCtrl as vm',
      resolve:{
        historiesUser: ['$route',function($route) {
          var historiesUser = [];
          return historiesUser;
        }]
      }
    })

    .when('/home/:userId', {
      templateUrl: 'templates/home/home.html',
      controller: 'HomeCtrl as vm',
      resolve:{
        historiesUser: ['$route','HomeService',function($route,HomeService) {
          var userId = $route.current.params.userId;
          return HomeService.getHistories(userId);
        }]
      }
    })

    .otherwise({
      redirectTo: '/home'
    });

});
