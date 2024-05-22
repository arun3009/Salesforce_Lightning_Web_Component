public with sharing class contactController {
    
    @AuraEnabled(cacheable=true)
    public static List<contact> getContactList(){
        List<contact> conList = [SELECT Id, Name, Email, Phone, 
                                PhotoUrl FROM contact WHERE PhotoUrl != null 
                                WITH USER_MODE LIMIT 10];

        return conList;
    }

    @AuraEnabled(cacheable=true)
    public static List<contact> contactControllerForDataTable(){
        List<contact> conList = [SELECT Id, Name, Email, Phone, 
                                Title, Picture__c, Rank__c, AccountId, 
                                Account.Name FROM contact WHERE AccountId != null 
                                WITH USER_MODE LIMIT 10];

        return conList;
    }

    @AuraEnabled(cacheable=true)
    public static List<contact> getContactBasedOnAccount(String accountId){
        List<contact> conList = [SELECT Id, Name, Firstname, LastName, Email, Phone, 
                                Title, Picture__c, Rank__c, AccountId, 
                                Account.Name, LeadSource FROM contact WHERE AccountId = :accountId
                                WITH USER_MODE LIMIT 10];

        return conList;
    }
}