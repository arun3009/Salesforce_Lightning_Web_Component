public with sharing class contactBrowserController {
    
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactList(String accountId, String industry){

        list<Contact> conList = new list<Contact>();
        String query = 'SELECT Id, Name, Title, Email, Phone, PhotoUrl FROM Contact';
        if(String.isNotBlank(accountId))
        {
            String key = accountId ;
            query+= ' where accountId = :key';
            if(String.isNotBlank(industry)){
                String value = industry;
                query+= ' AND Contact.Account.Industry = :value';
            }
        }
        if(String.isNotBlank(industry) && String.isBlank(accountId))
        {
            String keys = industry ;
            query+= ' where Contact.Account.Industry = :keys';
        }
        System.debug('query '+ query);
        query+=' WITH USER_MODE ORDER BY NAME';
        conList = Database.query(query);

        return conList;
    }
}
