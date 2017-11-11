'use strict';

angular
  .module('app.services')
  .factory('HomeService', HomeService);

HomeService.$inject = ['$q','HistoryAPI'];
function HomeService($q,HistoryAPI){


  /**-------------------------------------
                Methods
  --------------------------------------**/
  var methods = {
    getHistories:getHistories,
  }

  return methods;


  /**-------------------------------------
              Implementation
  --------------------------------------**/

  /* Get cliente pesquisa
  -------------------------------------------*/
  function getHistories(userId){
    var defer = $q.defer();

    HistoryAPI.get({
      userId:userId,
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
  
  /* Atualiza a senha do usuario autenticado
  -------------------------------------------*/
  // function updatePassword(payload, successCallback, errorCallback ) {
  //   UsuariosUpdatePassResource.save(payload,function(data){successCallback(data.toJSON());},function(data){errorCallback(data)});
  // }
};

/**-------------------------------------
           API Resources
--------------------------------------**/

/*
-----------------------------------------------------*/
angular.module('app.services')
 .factory('HistoryAPI', ['$resource', 'ENV', function HistoryAPI($resource, ENV) {
  return $resource(ENV.servicesBaseUrl+'/history/:userId', {userId:'@userId'}, {});
}]);