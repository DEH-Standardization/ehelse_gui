"use strict";

angular.module("ehelseEditor").controller("AdministerMandatoryController",["$scope", "$rootScope", "Mandatory", function($scope, $rootScope, Mandatory){

    $scope.mandatories = Mandatory.getAll();
    
    $scope.openNewMandatoryModal = function () {
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerMandatory/addEditMandatory/addMandatoryModal.html", "AddEditMandatoryController");
    };
    
    $scope.openEditMandatoryModal = function (mandatoryId) {
        $rootScope.currentMandatory = Mandatory.clone(Mandatory.getById(mandatoryId));
        $rootScope.shouldBeOpen = true;
        $rootScope.openModal("app/components/content/administerMandatory/addEditMandatory/editMandatoryModal.html", "AddEditMandatoryController");
    };

    
    $scope.deleteMandatory = Mandatory.delete;

}]);