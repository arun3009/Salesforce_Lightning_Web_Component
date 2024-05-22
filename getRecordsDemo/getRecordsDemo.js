import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
//import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import {getRecords} from 'lightning/uiRecordApi';
export default class GetRecordsDemo extends LightningElement {

    outputs;
    @wire(getRecords,{
        records : [
            {
                recordIds : ['0015i00000LJ9tHAAT'],
                fields : [ACCOUNT_NAME_FIELD]
            },
            {
                recordIds : ['0015i00000WLr7xAAD'],
                fields : [ACCOUNT_NAME_FIELD]
            },
            {
                recordIds : ['0035i00000AmgN9AAJ'],
                fields : [CONTACT_NAME]
            }
        ]
    })outputFunction({ data, error }){
        if(data){
            this.outputs = data;
            console.log("output", this.outputs);
        }else if(error){
            console.log(error);
        }
    }
}