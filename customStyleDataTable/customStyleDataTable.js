import { LightningElement, wire } from 'lwc';
import getContactRecord from '@salesforce/apex/contactController.contactControllerForDataTable';
const columns = [
    { label: "Name", 
      type: "customNameType", 
      typeAttributes : {
        contactName : {
            fieldName: 'Name'
        }
    }},
    { label: 'Account Name', fieldName: 'accountLink', type : 'url', typeAttributes : {
        label : { fieldName : 'accountName'},
        target : '_blank'
    }},
    { label: 'Title', fieldName: 'Title', cellAttributes : {
        class : { fieldName : 'titleColor'}
    } },
    { label: 'Rank', fieldName: 'Rank__c', type: 'customNumberType', typeAttributes : {
        rankIcon : {
            fieldName : 'rankIcon'
        }
    } },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' },
    { label: 'Email', fieldName: 'Email', type: 'Email' },
    { label: 'Picture', 
      type: 'customPictureType', 
      typeAttributes : {
        pictureUrl : {
            fieldName: 'Picture__c'
        }
        },
        cellAttributes : {
            alignment : "center"
        }
    }
];
export default class CustomStyleDataTable extends LightningElement {
    contacts;
    columns = columns
    @wire(getContactRecord) con({data, error}){
        if(data){
            //this.contacts = data;
            this.contacts = data.map((record) => {
                let accountLink = '/'+ record.AccountId;
                let accountName = record.Account.Name;
                let titleColor = 'slds-text-color_success';
                let rankIcon = record.Rank__c > 5 ? 'utility:ribbon' : "";
                return{
                    ...record, 
                    accountLink: accountLink,
                    accountName: accountName,
                    titleColor : titleColor,
                    rankIcon : rankIcon
                }
            })
        }else{
            console.log(error);
        }
    }
}