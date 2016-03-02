/**
 * Created by Stian on 12.02.2016.
 */

function StandardList(){
    var _this = this;
    _this.standards = [1,2,3,4];

    _this.setStandards = function(standards){
        console.log(standards);
        _this.standards = [4,3,2,1];
    };
    return _this;
}

(function(){
    var app = angular.module('mainApp', []);

    // Controller for selecting a theme.
    app.controller('TopicController', function($scope, $http){

        $http.get('http://37.139.13.117/v1/topics/').success(function(data){
            $scope.topics = data;
        });

        $scope.getStandards = function(id) {
            $http.get('http://37.139.13.117/v1/topics/' + id).success(function(data){
                $scope.standards = data.documents;
                $scope.topic = data;
            });
        };

    });

    app.controller('ContentBrowserController', function($scope){

        $scope.createNewTopic = function(){
            $("#content-browser").load('editor-display/content-browser/new-topic-view.html');
        };

    });


    // Controller for displaying standards/profiles
    app.controller('DisplayController', function($scope, $http) {


    });

    // Controller for displaying the content of a standard.
    app.controller('DisplayContentController', function($scope){
        $scope.getStdContent = function(standard){
            console.log(standard);
            var stdContentDisplay = $(".content-display");
            stdContentDisplay.empty();

            for (var i = 0; i < standard.fields.length; ++i){
                stdContentDisplay.append('<li>'+ standard.fields[i].fieldTitle +'</li>');
            }
        };
    });

    app.directive('loginpage', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/login/login.html'
        };
    });

    app.directive('toolbar',function(){
        return{
            restrict: 'E',
            templateUrl: 'toolbar/toolbar-view.html'
        };
    });

    // Directive for html used to display the edtior.
    app.directive('editordisplay',function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/editor-display-view.html'
        };
    });

    // Directive for html used to display the list of standards.
    app.directive('filebrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/file-browser/file-browser-view.html'
        };
    });

    // Directive for html used to display the content of standards/profiles.
    app.directive('contentbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/content-browser/content-browser-view.html'
        };
    });

    // Directive for html used to display the topicbrowser.
    app.directive('topicbrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/topic-browser/topic-browser-view.html'
        };
    });

    app.directive('newtopic', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/content-browser/new-topic-view.html'
        };
    });

})();