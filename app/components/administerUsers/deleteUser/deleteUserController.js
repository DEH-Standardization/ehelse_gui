"use strict";

angular.module("ehelseEditor").controller("DeleteUserController", ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) {
    var userId = $rootScope.userToDelete.id;
    var username = $rootScope.userToDelete.name;

    //make the user verify with a full-text match the username of the user to delete
    $scope.deleteSpecificUser = function () {
        if ($scope.userInput.name === username) {
            $rootScope.delete("/users/" + userId, function () {

                //find the index of the user in userList and remove it in real-time
                var arrayIndex = $rootScope.userList.indexOf($rootScope.userToDelete);
                if (arrayIndex > -1) {
                    $rootScope.userList.splice(arrayIndex, 1);
                }
                $rootScope.notifySuccess("Brukeren ble slettet.",3000);
            }, function () {
                $rootScope.notifyError("Brukeren ble ikke slettet.",6000);
            });
        } else {
            $rootScope.notifyError("Brukeren ble ikke slettet; navnet du skrev inn var ikke riktig.",6000);
        }
    };
}]);