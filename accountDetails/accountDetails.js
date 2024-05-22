import { LightningElement, api, wire } from 'lwc';
import getParentAccount from '@salesforce/apex/getAccountRecord.getParentAccount';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACC_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import SLA_TYPE from '@salesforce/schema/Account.SLA__c';
import PARENT_ACC from '@salesforce/schema/Account.ParentId';
import ACC_NAME from '@salesforce/schema/Account.Name';
import SLA_DATE from '@salesforce/schema/Account.SLAExpirationDate__c';
import NO_OF_LOCATION from '@salesforce/schema/Account.NumberofLocations__c';
import ACC_DESC from '@salesforce/schema/Account.Description';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord, deleteRecord, getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const fieldsToLoad = [PARENT_ACC, ACC_NAME, SLA_DATE, SLA_TYPE, NO_OF_LOCATION, ACC_DESC];
export default class AccountDetails extends NavigationMixin(LightningElement){
    
    options = [];
    parentVal = "";
    accName = "";
    slaDate = null;
    slatype = "";
    sliderval = "1";
    desc = "";
    @api recordId;
    @wire(getRecord,{
        recordId : '$recordId',
        fields : fieldsToLoad
    })wiredgetRecord_Function({ data, error }){
        if(data){
            this.parentVal = getFieldValue(data, PARENT_ACC);
            this.accName = getFieldValue(data, ACC_NAME);
            this.slaDate = getFieldValue(data, SLA_DATE);
            this.slatype = getFieldValue(data, SLA_TYPE);
            this.sliderval = getFieldValue(data, NO_OF_LOCATION);
            this.desc = getFieldValue(data, ACC_DESC);
        }
        else if(error){
            console.log("Error while fetching record using getRecord", error);
        }
    }
    @wire(getParentAccount)
    parentAcc({data,error}){
        if(data){
            console.log("Parent Account data", data);
            this.options = data.map((curritem) => ({
                label:curritem.Name,
                value: curritem.Id
            }))
        }
        else if(error){
            console.log("error",error);
        }
    }
    @wire(getObjectInfo, {
        objectApiName : ACC_OBJECT
    })objectinfo;

    @wire(getPicklistValues, {
        recordTypeId : '$objectinfo.data.defaultRecordTypeId',
        fieldApiName : SLA_TYPE
    })slapicklist

    handleChange(event){
        let {name,value} = event.target;
        if(name == "parentAcc"){
            this.parentVal = value;
        }

        if(name == "accName"){
            this.accName = value;
        }

        if(name == "slaDate"){
            this.slaDate = value;
        }

        if(name == "slatype"){
            this.slatype = value;
        }

        if(name == "slider"){
            this.sliderval = value;
        }
        
        if(name == "description"){
            this.desc = value;
        } 
    }

    saveRecord(){
        if(this.validateAll())
        {
            let inputfields = {}
            inputfields[ACC_NAME.fieldApiName] = this.accName;
            inputfields[PARENT_ACC.fieldApiName] = this.parentVal;
            inputfields[SLA_DATE.fieldApiName] = this.slaDate;
            inputfields[SLA_TYPE.fieldApiName] = this.slatype;
            inputfields[NO_OF_LOCATION.fieldApiName] = this.sliderval;
            inputfields[ACC_DESC.fieldApiName] = this.desc;

            if(this.recordId)
            {
                inputfields[ACCOUNT_ID.fieldApiName] = this.recordId;
                let recordInput = {
                    fields : inputfields
                }
                updateRecord(recordInput)
                .then((result) => {
                    console.log("Account Updated Successfully", result);
                    this.showToast();
                })
                .catch((error) => {
                    console.log("Error while updation", error);
                })
            }
            else
            {
                let recordInput = {
                    apiName : ACC_OBJECT.objectApiName,
                    fields : inputfields
                }
                createRecord(recordInput)
                .then((result) => {
                    console.log("Account created successfully", result);
                    let pageRef = {
                        type: 'standard__recordPage',
                        attributes: {
                            recordId: result.id,
                            objectApiName: ACC_OBJECT.objectApiName,
                            actionName: 'view'
                        }
                    }
                    this[NavigationMixin.Navigate](pageRef);
                })
                .catch((error) => {
                    console.log("Error in creation", error);
                })
            }
        }
        else
        {
            console.log("inputs are not valid");
        }
    }

    validateAll(){
        let fields = Array.from(this.template.querySelectorAll('.validateme'));
        let isvalid = fields.every((currentitem) => currentitem.checkValidity());
        return isvalid;
    }

    get formTitle(){
        if(this.recordId){
            return "Update Account";
        }
        else{
            return "Create Account";
        }
    }

    get deletebutton(){
        if(this.recordId){
            return true;
        }
        else{
            return false;
        }
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Record Updated Successfully',
            variant : 'success'
        });
        this.dispatchEvent(event);
    }

    deleteHandler(){
        deleteRecord(this.recordId)
        .then(() => {
            console.log("Record deleted successfully");
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'Account',
                    actionName: 'list'
                },
                state: {
                    filterName: 'AllAccounts'
                }
            });
        })
        .catch((error) => {
            console.log("Error while deleting Account record", error);
        });
    }
}