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
      controller: 'HomeCtrl as vm'
    })

    .when('/home/:userId', {
      templateUrl: 'templates/home/home.html',
      controller: 'HomeCtrl as vm',
      resolve:{
        history: ['$route','HomeService',function($route,HomeService) {
          var userId = $route.current.params.userId;
          return HomeService.getHistories(userId);
        }],
      }
    })
    
    // .when('/assuntos', {
    //   templateUrl: 'templates/assuntos/editar-arvore-assuntos/editar-arvore-assuntos.html',
    //   controller: 'EditarArvoreAssuntosCtrl as vm'
    // })
    
    // .when('/buscar-questoes', {
    //   templateUrl: 'templates/questoes/buscar-questoes/buscar-questoes.html',
    //   controller: 'BuscarQuestoesCtrl as vm'
    // })

    // .when('/editar-questoes', {
    //   templateUrl: 'templates/questoes/editar-questoes/editar-questoes.html',
    //   controller: 'EditarQuestoesCtrl as vm'
    // })
    
    // .when('/validar-questoes', {
    //   templateUrl: 'templates/questoes/validar-questoes/validar-questoes.html',
    //   controller: 'ValidarQuestoesCtrl as vm'
    // })
    
    // .when('/buscar-listas-provas', {
    //   templateUrl: 'templates/listas-provas/buscar-listas-provas/buscar-listas-provas.html',
    //   controller: 'BuscarListasProvasCtrl as vm'
    // })
    
    // .when('/editar-listas-provas', {
    //   templateUrl: 'templates/listas-provas/editar-listas-provas/editar-listas-provas.html',
    //   controller: 'EditarListasProvasCtrl as vm'
    // })
    
    // .when('/relatorios', {
    //   templateUrl: 'templates/relatorios/gerar-relatorios/gerar-relatorios.html',
    //   controller: 'GerarRelatoriosCtrl as vm'
    // })
    
    // .when('/usuarios', {
    //   templateUrl: 'templates/usuarios/listar-usuarios/listar-usuarios.html',
    //   controller: 'ListarUsuariosCtrl as vm'
    // })

    .otherwise({
      redirectTo: '/home'
    });

});
