import { LightningElement,wire } from 'lwc';
import getAccRecord from '@salesforce/apex/getAccountRecord.getAccRecord';
const columns = [
    { label: 'Account name', fieldName: 'Name' },
    { label: 'Ratings', fieldName: 'Rating' },
    { label: 'Industry', fieldName: 'Industry' }
];
export default class WireAdaptorProperty extends LightningElement {

    columns = columns;
    accounts;
    errors;
    @wire(getAccRecord) acc({data,error})
    {
        if(data)
        {
            
            let finaldata = data.map((currentItem) => {
                let updateddata = {};
                if(currentItem.hasOwnProperty("Rating")){
                    updateddata = {...currentItem};
                }else{
                    updateddata = {...currentItem, Rating : "Warm"};
                }
                return updateddata;
            });
            this.accounts = [...finaldata];
        }else if(error)
        {
            this.errors = error
            //console.log(error);
        }
        
    }
    

    
}