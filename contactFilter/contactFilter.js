import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
export default class ContactFilter extends NavigationMixin(LightningElement) {
    isButtonDisabled = true;
    selectedAccountId = "";
    selectedIndustry = "";

    @wire(getObjectInfo,{
        objectApiName : ACCOUNT_OBJ
    })
    accountinfo;

    @wire(getPicklistValues,{
        fieldApiName : ACCOUNT_INDUSTRY,
        recordTypeId : '$accountinfo.data.defaultRecordTypeId'
    })
    industryPicklist;

    selectedRecordHandler(event){
        this.selectedAccountId = event.detail;
        console.log("this.selectedAccountId", this.selectedAccountId);
        if(this.selectedAccountId){
            this.isButtonDisabled = false;
        }else{
            this.isButtonDisabled = true;
        }
        this.notifyFilterChange();
    }

    handleChange(event){
        this.selectedIndustry = event.target.value;
        this.notifyFilterChange();
    }

    addNewContact(){
        let defaultValue = encodeDefaultFieldValues({
            AccountId :  this.selectedAccountId
        });
        let pageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues : defaultValue
            }
        }
        this[NavigationMixin.Navigate](pageRef);
    }

    notifyFilterChange(){
        
        const myCustomEvent = new CustomEvent("filterchange",{
            detail : {
                accountId : this.selectedAccountId,
                industry : this.selectedIndustry
            }
        });
        this.dispatchEvent(myCustomEvent);
    }
}