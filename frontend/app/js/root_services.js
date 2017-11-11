'use strict';

angular
  .module('app.services')
  .factory('RootServices', RootServices);

RootServices.$inject = ['$q','UserAPI'];
function RootServices($q,UserAPI){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    getUsers:getUsers
  }

  return methods;


  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Get users
  -------------------------------------------*/
  function getUsers(userId){
    var defer = $q.defer();

    UserAPI.get({
      userId : userId,
    },function(data){
      if(!data){defer.reject();return;}
      defer.resolve(data);
      },
      function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }
  
  // /* Atualiza a senha do usuario autenticado
  // -------------------------------------------*/
  // function updatePassword(payload, successCallback, errorCallback ) {
  //   UsuariosUpdatePassResource.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  // }
};

/**-------------------------------------
           API Resources
--------------------------------------**/

/*
  GET:
-----------------------------------------------------*/
angular.module('app.services')
 .factory('UserAPI', ['$resource', 'ENV', function UserAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/users/:userId', {userId:'@userId'}, {});
}]);

// /*
//   POST:
// -----------------------------------------------------*/
// angular.module('app.services')
//  .factory('UsuarioLogadoResource', ['$resource', 'ENV', function UsuarioLogadoResource($resource, ENV) {
//   return $resource(ENV.servicesBaseUrl+'/obter_dados_usuario/', {}, {});
// }]);