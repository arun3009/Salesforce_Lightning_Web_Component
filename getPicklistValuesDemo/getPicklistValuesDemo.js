import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACC_INDUSTRY from '@salesforce/schema/Account.Industry';
export default class GetPicklistValuesDemo extends LightningElement {

    value;
    selectedValue;
    picvalue;
    @wire(getObjectInfo,{
        objectApiName : ACCOUNT_OBJECT
    })getRecordTypeValue;

    @wire(getPicklistValues,{
        recordTypeId : '$getRecordTypeValue.data.defaultRecordTypeId',
        fieldApiName : ACC_INDUSTRY
    })outputs
    ({data,error}){
        if(data){
            console.log(data);
            this.selectedValue = data.values;
            console.log("selectedValue", this.selectedValue);
        }
        else if(error){
            console.log(error);
        }
    };

    @wire(getPicklistValuesByRecordType,{
        objectApiName : ACCOUNT_OBJECT,
        recordTypeId : '$getRecordTypeValue.data.defaultRecordTypeId'
    })picValues
    // ({ data, error}){
    //     if(data){
    //         console.log("picValues",data);
    //         this.picvalue = data.picklistFieldValues.Rating.values;
    //         console.log("rat", this.picvalue);
    //     }
    //     else if(error){
    //         console.log(error);
    //     }
    // }

    handleChange(event){
        this.value = event.target.value;
    }
}