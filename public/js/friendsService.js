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
        lastName: friend.lastName,
        phoneNumber: friend.phoneNumber,
        streetAddress: friend.streetAddress,
        thumbnail: friend.thumbnail
      }
    })
  };

  this.unFriend = function(friend) {
    return $http({
      method: 'DELETE',
      url: 'api/friends/' + friend.id,
    });
  };
  
  this.editFriend = function(friend) {
    console.log('put method called')
    return $http({
      method: 'PUT',
      url: 'api/friends/' + friend.id,
      data: {
        firstName: friend.firstName,
        lastName: friend.lastName,
        phoneNumber: friend.phoneNumber,
        streetAddress: friend.streetAddress,
        thumbnail: friend.thumbnail
      }
    });
  };

});