public class sakthivelProjectController {
    @AuraEnabled
    public static void createOrUpdateAccount(String name, String phone, String industry) {

            Account existingAccount;
            List<Account> accounts = [SELECT Id FROM Account WHERE Name = :name LIMIT 1];
            if(!accounts.isEmpty()){
                existingAccount = accounts[0];
            }
            if (existingAccount != null) {
                existingAccount.Phone = phone;
                existingAccount.Industry = industry;
                update existingAccount;
            } 
            else {
                Account newAccount = new Account();
                newAccount.Name = name;
                newAccount.Phone = phone;
                newAccount.Industry = industry;
                insert newAccount;
            }
        
    }
}





/*public with sharing class sakthivelProjectController {

    @AuraEnabled(cacheable=true)
    public static Account named(String searchkey){
    Account acc;
        if(String.isNotBlank(searchkey))
        {
            String key = '%' +searchkey+ '%';
            String queryString = 'SELECT Id, Name FROM Account where Name like :key LIMIT 1';
            acc = Database.query(queryString, AccessLevel.USER_MODE);
            System.debug(acc);
        }
        return acc;
    } 
}*/