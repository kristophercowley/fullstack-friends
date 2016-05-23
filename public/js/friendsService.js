var app = angular.module('fullestStack');

app.service('friendsService', function($http, $q) {

  this.getFriends = function() {
    return $http({
      method: 'GET',
      url: 'api/friends'
    }).then(function(res){
      return res.data.data;
    });
  }

  this.addFriend = function(friend) {
    return $http({
      method: 'POST',
      url: 'api/friends',
      data: {
        firstName: friend.firstName,
        lastName: friend.lastName
      }
    })
  };

  this.unFriend = function(friend) {
    return $http({
      method: 'DELETE',
      url: 'api/friends/' + friend.id,
    });
  };

});