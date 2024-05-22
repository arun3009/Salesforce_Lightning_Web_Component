import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/contactBrowserController.getContactList';
export default class ContactBrowser extends LightningElement {

    selectedAccountId = "";
    selectedIndustry = "";

    @wire(getContactList,{
        accountId : '$selectedAccountId',
        industry : '$selectedIndustry'
    })contacts({ data, error}){
        if(data){
            console.log("Selected contacts", data);
        }
        else if(error){
            console.log("Selected contact Failed", error);
        }
    }

    handleFilterChange(event){
        this.selectedAccountId = event.detail.accountId;
        console.log(this.selectedAccountId);
        this.selectedIndustry = event.detail.industry;
        console.log(this.selectedIndustry);
    }
}