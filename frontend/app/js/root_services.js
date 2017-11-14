'use strict';

angular
  .module('app.services')
  .factory('RootServices', RootServices);

RootServices.$inject = ['$q','UserAPI','UserUpdateAPI'];
function RootServices($q,UserAPI,UserUpdateAPI){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    getUsers:getUsers,
    userCreate:userCreate,
    userUpdate:userUpdate
  }

  return methods;


  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Get users
  -------------------------------------------*/
  function getUsers(id, userId){
    var defer = $q.defer();

    UserAPI.get({
      id : id,
      userId : userId

    },function(data){
      if(!data){defer.reject();return;}
      defer.resolve(data.data);
      },
      function(data){
        defer.reject(data);
      }
    );

    return defer.promise;
  }
  
 /* 
  -------------------------------------------*/
  function userCreate(payload, successCallback, errorCallback ) {
    UserAPI.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  }

  /* 
  -------------------------------------------*/
  function userUpdate(payload, successCallback, errorCallback ) {
    UserUpdateAPI.update(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
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
  return $resource(ENV.servicesBaseUrl+'/users', {id:'@id', userId:'@userId'}, {});
}]);

 /*
  GET:
-----------------------------------------------------*/
angular.module('app.services')
 .factory('UserUpdateAPI', ['$resource', 'ENV', function UserAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/users/:id', {id:'@id'}, {'update': { method:'PUT' }});
}]);