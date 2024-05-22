import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetObjectInfoDemo extends LightningElement {

    accData;
    errors;
    @wire (getObjectInfo, {
        objectApiName : ACCOUNT_OBJECT
    }) outputs({ data, error}){

        if(data){
            console.log('Account data', data);
            this.accData = data;
            
            //console.log('Account data', this.accData);

        }
        else if(error){
            this.errors = error;
            console.log(error);
        }
    }

    get printpicklistField(){
        return Object.values(this.accData.fields);
    }
    // get objectProperties() {
    //     return Object.entries(this.accData).map(([key,value])=>({ key, value }));
    //   }
}