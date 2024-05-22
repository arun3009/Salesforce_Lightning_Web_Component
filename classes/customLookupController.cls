public with sharing class customLookupController {
    
    @AuraEnabled(cacheable=true)
    public static list<sObject> searchRecords(String objectName, String searchkey){

        list<sObject> sObjectList = new list<sObject>();
        if(String.isNotBlank(searchkey)){
            String key = '%' +searchkey+ '%';
            String queryString = 'SELECT Id, Name FROM '+ objectName +' where Name like :key' ;
            sObjectList = Database.query(queryString, AccessLevel.USER_MODE);
        }

        return sObjectList;
    }
}