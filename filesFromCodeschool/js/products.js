/**
 * Created by Stian on 11.02.2016.
 */

(function(){
    var app = angular.module('store-products', [ ]);
    app.directive('productTitle', function(){
        return{
            restrict: 'E',
            templateUrl: '../html/product-title.html'
        };
    });
    app.directive('productSpecs', function(){
        return {
            restrict: 'E',
            templateUrl: '../html/product-specs.html'
        };
    });
    app.directive('productDescription', function(){
        return {
            restrict: 'E',
            templateUrl: '../html/product-description.html'
        };
    });
    app.directive('productReviews', function(){
        return {
            restrict: 'E',
            templateUrl: '../html/product-reviews.html'
        };
    });
    app.directive('productPanels', function(){
        return {
            restrict: 'E',
            templateUrl: '../html/product-panels.html',
            controller: function(){
                this.tab = 1;

                this.selectTab = function(newValue) {
                    this.tab = newValue;
                };

                this.isSelected = function(tabName){
                    return this.tab === tabName;
                };
            },
            controllerAs: 'panel'
        };
    });
})();