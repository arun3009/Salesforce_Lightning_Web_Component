public with sharing class todoAppController {
    
    @AuraEnabled(cacheable=true)
    public static list<Task_Manager__c> getAllInCompletedRecord(){

        return [SELECT id, name, Task_Date__c 
                FROM Task_Manager__c
                WHERE ownerId = :userInfo.getUserId() 
                AND Is_Completed__c = false
                WITH USER_MODE ORDER BY Task_Date__c];
    }

    @AuraEnabled(cacheable=true)
    public static list<Task_Manager__c> getAllCompletedRecord(){

        return [SELECT id, name, Task_Date__c 
                FROM Task_Manager__c
                WHERE ownerId = :userInfo.getUserId() 
                AND Is_Completed__c = true
                WITH USER_MODE ORDER BY Completed_Date__c];
    }
}