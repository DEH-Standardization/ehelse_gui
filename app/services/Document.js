'use strict';

angular.module('ehelseEditor').factory('Document', ['$rootScope', 'DocumentField', function($rootScope, DocumentField) {


    function newDocument(){
        return {
            "id": null,
            "topicId" : $rootScope.selectedTopicId,
            "title" : "",
            "documentTypeId":"1",
            "statusId": null,
            "nextDocumentId": null,
            "previousDocumentId": null,
            "description" : "",
            "sequence": 0,
            "comment": "",
            "targetGroups": [],
            "fields": [],
            "links": []
        }
    }


    var current_document = newDocument();
    var documents = [];
    var link_category_list = [];

    function extendCurrentDocumentTargetGroupsByTargetGroupIds(target_groups_ids){
        for(var i = 0; i < target_groups_ids.length; i++){
            current_document.targetGroups.push({
                targetGroupId:target_groups_ids[i],
                description:"",
                actionId: null,
                deadline:"",
                mandatoryId: null
            });
        }
    }


    function extendCurrentDocumentFieldsByFieldIds(field_ids){
        for(var i = 0; i < field_ids.length; i++){
            current_document.fields.push({fieldId:field_ids[i], value:""});
        }
        console.log(current_document.fields);
    }


    function removeTargetGroup(group){

        var index = current_document.targetGroups.indexOf(group);
        if (index > -1) {
            current_document.targetGroups.splice(index, 1);
        }
    }

    function removeField(field){

        var index = current_document.fields.indexOf(field);
        if (index > -1) {
            current_document.fields.splice(index, 1);
        }
    }

    function removeCurrentDocumentLink(link){

        var index = current_document.links.indexOf(link);
        if (index > -1) {
            current_document.links.splice(index, 1);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }



    function submitCurrentDocument(){
        if(current_document.id){

            $rootScope.put(
                'documents/' + current_document.id,
                current_document,
                function (data) {
                    updateDocumentInDocumentsList(data);
                    $rootScope.notifySuccess("Dokumentet ble oppdatert",6000);
                }
                ,
                function () {
                    console.log("New document could not be created");
                    $rootScope.notifyError("Standard kunne ikke opprettes",6000);
                }
            );
        }
        else {
            $rootScope.post(
                'documents/',
                current_document,
                function (data) {
                    setCurrentDocument(data);
                    documents.push(data);
                    $rootScope.notifySuccess("Ny standard ble opprettet",6000);
                }
                ,
                function () {
                    $rootScope.notifyError("Standard kunne ikke opprettes",6000);
                }
            );
        }
    }


    function getCurrentDocument(){
        return current_document;
    }


    function getTargetGroupsIdsHelper(targetGroups){
        var ids = [];
        for( var i = 0; i < targetGroups.length; i++){
            ids.push(targetGroups[i].targetGroupId);
        }
        return ids;
    }

    function getTargetGroupsIds(){
        return getTargetGroupsIdsHelper(current_document.targetGroups);
    }

    function updateDocumentInDocumentsList(document){
        for(var i = 0; i < documents.length; i++){
            if(documents[i].id == document.id){
                setDocument(documents[i], document);
                break;
            }
        }
    }


    function getDocumentFieldIdsHelper(documentFields){
        var ids = [];
        for( var i = 0; i < documentFields.length; i++){
            ids.push(documentFields[i].fieldId);
        }
        return ids;
    }

    function getCurrentDocumentFieldIds(){
        return  getDocumentFieldIdsHelper(current_document.fields);
    }


    function setDocument(a, b){
        a.id = b.id;
        a.topicId = b.topicId;
        a.title = b.title;
        a.documentTypeId = b.documentTypeId;
        a.statusId = b.statusId;
        a.nextDocumentId = b.nextDocumentId;
        a.previousDocumentId = b.previousDocumentId;
        a.description = b.description;
        a.sequence = b.sequence;
        a.comment = b.comment;
        a.targetGroups = b.targetGroups;
        a.fields = b.fields;
        a.links = b.links;
    }

    function setCurrentDocument(document){
        if(!document) {
            document = newDocument();
            setDocument(current_document, document);
            setCurrentDocumentFieldsByDocumentDocumentTypeId();
        }
        else{
            setDocument(current_document, document);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function getDocumentsByTopicId(id){
        documents = [];
        $rootScope.get('topics/' + id , function(data){
            Array.prototype.push.apply(documents, data.documents);

        }, function(){});
        return documents;
    }


    function setCurrentDocumentFieldsByDocumentDocumentTypeId(){
        current_document.fields.length = 0;
        extendCurrentDocumentFieldsByFieldIds(DocumentField.getRequiredDocumentFieldIdsByDocumentTypeId(current_document.documentTypeId))
    }

    function generateCurrentDocumentLinksAsLinkCategoryList(){

        var link_category_dict = {};
        for(var i = 0; i < current_document.links.length; i++){
            var link = current_document.links[i];
            if(!link_category_dict[link.linkCategoryId]){
                link_category_dict[link.linkCategoryId] = {id:link.linkCategoryId, links: []};
            }
            link_category_dict[link.linkCategoryId].links.push(link);
        }
        link_category_list.length = 0;

        for (var prop in link_category_dict) {
            // skip loop if the property is from prototype
            if(!link_category_dict.hasOwnProperty(prop)) continue;

            link_category_list.push(link_category_dict[prop]);
        }
        console.log(link_category_list);
        console.log(current_document.links);
    }

    function getCurrentDocumentLinksAsLinkCategoryList(){
        return link_category_list;
    }

    function getCurrentDocumentLinkCategoriesIds(){
        var link_category_ids = [];
        for(var i = 0; i < current_document.links.length; i++){
            link_category_ids.push(current_document.links[i].linkCategoryId);
        }
        console.log(link_category_ids);
        return link_category_ids;
    }

    function extendCurrentDocumentLinkCategoriesByLinkCategoriesIds(ids){
        for(var i = 0; i < ids.length; i++){
            addLinkToCurrentDocumentByLinkCategoryId(ids[i]);
        }
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    function addLinkToCurrentDocumentByLinkCategoryId(id){
        console.log(id);
        current_document.links.push({linkCategoryId: id, text:"", url: ""});
        generateCurrentDocumentLinksAsLinkCategoryList();
    }


    function removeCurrentDocumentLinksByCategoryId(linkCategoryId){
        var tmp_list = [];
        for(var i = 0; i < current_document.links.length; i++){
            if(current_document.links[i].linkCategoryId != linkCategoryId){
                tmp_list.push(current_document.links[i]);
            }
        }
        current_document.links.length = 0;
        Array.prototype.push.apply(current_document.links, tmp_list);
        generateCurrentDocumentLinksAsLinkCategoryList();
    }

    return {
        getCurrentDocumentTargetGroupsIds : getTargetGroupsIds,
        getCurrentDocument : getCurrentDocument,
        extendCurrentDocumentTargetGroupsByTargetGroupIds : extendCurrentDocumentTargetGroupsByTargetGroupIds,
        removeCurrentDocumentTargetGroup :removeTargetGroup,
        submitCurrentDocument: submitCurrentDocument,
        setCurrentDocument : setCurrentDocument,
        getCurrentDocumentFieldIds : getCurrentDocumentFieldIds,
        extendCurrentDocumentFieldsByFieldIds: extendCurrentDocumentFieldsByFieldIds,
        removeCurrentDocumentField: removeField,
        getDocumentsByTopicId :getDocumentsByTopicId,
        setCurrentDocumentFieldsByDocumentDocumentTypeId: setCurrentDocumentFieldsByDocumentDocumentTypeId,
        getCurrentDocumentLinksAsLinkCategoryList: getCurrentDocumentLinksAsLinkCategoryList,
        getCurrentDocumentLinkCategoriesIds: getCurrentDocumentLinkCategoriesIds,
        extendCurrentDocumentLinkCategoriesByLinkCategoriesIds: extendCurrentDocumentLinkCategoriesByLinkCategoriesIds,
        addLinkToCurrentDocumentByLinkCategoryId: addLinkToCurrentDocumentByLinkCategoryId,
        removeCurrentDocumentLink:removeCurrentDocumentLink,
        removeCurrentDocumentLinksByCategoryId: removeCurrentDocumentLinksByCategoryId
    };
}]);