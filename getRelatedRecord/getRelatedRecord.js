import { LightningElement, wire } from 'lwc';
import getContactRecord from '@salesforce/apex/getAccountRecord.getRelatedContactsForHotAccounts';
const columns = [
    { label: 'Contact name', fieldName: 'Name' },
    { label: 'Contact Id', fieldName: 'Id' },
];
export default class GetRelatedRecord extends LightningElement {

    columns = columns
    @wire(getContactRecord) con;
}