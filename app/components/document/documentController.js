"use strict";

angular.module("ehelseEditor").controller("DocumentController", [ "$scope","$rootScope", "DocumentType", "Document", function( $scope, $rootScope, DocumentType, Document) {

    // Save document values to scope to easier access it in the html files
    $scope.document_types_dict = DocumentType.document_types_dict;
    $scope.documents = [];
    $scope.current_document = Document.getCurrentDocument();

    // Get documents of the selected topic
    $rootScope.getDocuments = function(id) {
        $rootScope.selected_document = "";
        $scope.documents = Document.getDocumentsByTopicId(id);
        $rootScope.toggleSelectedTopic(id);
    };

    // Makes selected folder bold and toggles folder icon between opened and closed
    $rootScope.toggleSelectedTopic = function(id) {
        $(".clickable").removeClass("selected-item");
        if(id){
            $("#" + id).addClass("selected-item");
            $("#folder" + id).toggleClass("glyphicon-folder-open","glyphicon-folder-close");
        }
    };

    // Set the document state to toggle different aspects of the view
     $rootScope.setDocumentState = function(state) {
        $rootScope.documentState = state;
    };

    // Check and update the value of documentState
    $scope.checkDocumentState = function(document){
        if(document){
            if(document.documentTypeId == 1){
                $rootScope.setDocumentState("editDocument");
            }
            else if(document.documentTypeId == 2) {
                $rootScope.setDocumentState("editProfile");
            }
            else if(document.documentTypeId == 3){
                $rootScope.setDocumentState("editUtility");
            }
            else {
                $rootScope.setDocumentState("newDocument");
            }
        }else{
            $rootScope.setDocumentState("newDocument");
        }
    };

    // Open document by id
    $rootScope.openDocumentById = function(id){
        $rootScope.openDocument(Document.getById(id));
    };

    // Open selected document
    $rootScope.openDocument = function(document){
        $rootScope.selected_document = document;
        $scope.checkDocumentState(document);

        if(document == "newDocument"){
            document = null;
        }
        Document.setCurrentDocument(document);
        $rootScope.changeContentView("document");
    };
}]);