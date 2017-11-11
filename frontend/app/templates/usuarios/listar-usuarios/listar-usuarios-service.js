'use strict';

angular
  .module('app.services')
  .factory('ListarUsuariosService', ListarUsuariosService);

ListarUsuariosService.$inject = ['$q','UsuarioLogadoResource', 'LogoutResource'];
function ListarUsuariosService($q,UsuarioLogadoResource, LogoutResource){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    // todo : todo
  }

  return methods;


  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Get cliente pesquisa
  -------------------------------------------*/
  function obterDadosUsuario(){
    var defer = $q.defer();

    UsuarioLogadoResource.get({},function(data){
      if(!data){defer.reject();return;}
      defer.resolve(data);
      },
      function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }
  
  /* Atualiza a senha do usuario autenticado
  -------------------------------------------*/
  function updatePassword(payload, successCallback, errorCallback ) {
    UsuariosUpdatePassResource.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  }
};

/**-------------------------------------
           API Resources
--------------------------------------**/

/*
  GET:
-----------------------------------------------------*/
angular.module('app.services')
 .factory('LogoutResource', ['$resource', 'ENV', function LogoutResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/logout/', {}, {});
}]);

/*
  POST:
-----------------------------------------------------*/
angular.module('app.services')
 .factory('UsuarioLogadoResource', ['$resource', 'ENV', function UsuarioLogadoResource($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/obter_dados_usuario/', {}, {});
}]);