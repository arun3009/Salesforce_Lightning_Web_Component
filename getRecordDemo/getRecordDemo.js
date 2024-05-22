import { LightningElement, api, wire } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { getRecord,getFieldValue,getFieldDisplayValue } from 'lightning/uiRecordApi';
export default class GetRecordDemo extends LightningElement {

    @api recordId;
    accountName;
    accountRevenue;
    accRevenueDisplay;
    errors;
    @wire(getRecord,{
        recordId : "$recordId",
        fields : [ACCOUNT_NAME_FIELD,ACCOUNT_REVENUE_FIELD]
    })
    outputFunction({ data, error }){
        if(data){
            console.log(data);
            // this.accountName = data.fields.Name.value;
            // this.accountRevenue = data.fields.AnnualRevenue.value;
            this.accountName = getFieldValue(data, ACCOUNT_NAME_FIELD);
            this.accountRevenue = getFieldValue(data, ACCOUNT_REVENUE_FIELD);
            this.accRevenueDisplay = getFieldDisplayValue(data, ACCOUNT_REVENUE_FIELD);
        }
        else if(error){
            console.log(error);
        }
    }
}