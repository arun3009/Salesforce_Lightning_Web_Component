import { LightningElement,wire } from 'lwc';
import getAccRecord from '@salesforce/apex/getAccountRecord.getAccRecord';
const columns = [
    { label: 'Account name', fieldName: 'Name' },
    { label: 'Ratings', fieldName: 'Rating' },
    { label: 'Industry', fieldName: 'Industry' }
];
export default class WireAdaptor extends LightningElement {
    columns = columns
    @wire(getAccRecord) acc;
    
}