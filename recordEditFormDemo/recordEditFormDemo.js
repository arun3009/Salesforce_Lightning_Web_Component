import { LightningElement, api } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import DATE_FIELD from "@salesforce/schema/Account.SLAExpirationDate__c";
import { NavigationMixin } from 'lightning/navigation';
export default class RecordEditFormDemo extends NavigationMixin(LightningElement) {

    @api objectApiName;
    @api recordId;
    fields = {
        name : NAME_FIELD,
        industry : INDUSTRY_FIELD,
        date : DATE_FIELD
    }

    successHandler(event){
        let pageRef = {
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: this.objectApiName,
                actionName: 'view'
            }
        }
        this[NavigationMixin.Navigate](pageRef);
    }

    submitHandler(event){
        event.preventDefault();

        let fieldlist = event.detail.fields;
        console.log("fieldlist", fieldlist);
        if(!fieldlist.Industry){
            fieldlist.Industry = "Energy";
        }
        this.template.querySelector("lightning-record-edit-form").submit(fieldlist);
    }

    resetHandler(){
        let resetOperation = this.template.querySelectorAll("lightning-input-field");
        resetOperation.forEach((curritem) => curritem.reset());
    }
}