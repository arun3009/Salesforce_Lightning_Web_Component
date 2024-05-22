public with sharing class getAccountRecord {

    @Auraenabled(cacheable=true)
    public static list<Account> getAccRecord(){

        List<Account> acc = [Select id, Name, Industry, Rating from Account];
        return acc;
    }


    @Auraenabled(cacheable=true)
    public static list<Account> getParentAccount(){

        List<Account> acc = [Select id, Name, ParentId from Account where AnnualRevenue != null];
        return acc;
    }

    @Auraenabled(cacheable=true)
    public static List<Contact> getRelatedContactsForHotAccounts() {
        List<Account> hotAccounts = getHotAccounts();
        if (!hotAccounts.isEmpty()) {
            return getRelatedContacts(hotAccounts);
        }
        return new List<Contact>();
    }
 
    public static List<Account> getHotAccounts() {
        return [SELECT Id, Name, Rating FROM Account WHERE Rating = 'Hot'];
    }
 
    public static List<Contact> getRelatedContacts(List<Account> accounts) {
        Set<Id> accountIds = new Set<Id>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }
        return [SELECT Id, Name, AccountId FROM Contact WHERE AccountId IN :accountIds];
    }
}