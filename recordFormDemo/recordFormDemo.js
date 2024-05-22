import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordFormDemo extends NavigationMixin(LightningElement){

    @api objectApiName;
    @api recordId;

    fieldlist = [NAME_FIELD,INDUSTRY_FIELD,RATING_FIELD,REVENUE_FIELD];

    navigationHandler(event){
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

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Record Updated Successfully',
            variant : "success"
        });
        this.dispatchEvent(event);
    }
}