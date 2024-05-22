import { LightningElement, wire, api } from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords';
const DELAY = 300;
export default class CustomLookup extends LightningElement {

    @api apiName = "Account";
    searchValue;
    @api objectName = "Account"
    delayTimeOut;
    displayOptions = false
    selectedOption = {
        selectedId : "",
        selectedValue : ""
    }
    @wire(searchRecords,
        {
            objectName: "$apiName",
            searchkey: "$searchValue"
        })
        outputs;

    get isRecordSelected(){
        return this.selectedOption.selectedId === ""? false : true;
    }
    changeHandler(event){
        window.clearTimeout(this.delayTimeOut);
        let enteredValue = event.target.value;

        this.delayTimeOut = setTimeout(()=> {
            this.searchValue = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }
    clickHandler(event){
        let selectedRecord = event.currentTarget.dataset.item;
        let outputRecord = this.outputs.data.find(
            (currentItem) => currentItem.Id === selectedRecord
        );
        this.selectedOption = {
            selectedId : outputRecord.Id,
            selectedValue : outputRecord.Name
        };
        this.sendselection();
        this.displayOptions = false
        

    }
    removeSelectedOption(event){
        this.selectedOption = {
            selectedId : "",
            selectedValue : ""
        }
        this.sendselection();
        this.displayOptions = false;
    }
    sendselection(){
        const mySelectionEvent = new CustomEvent("selectedrec",{
            detail : this.selectedOption.selectedId
        });
        this.dispatchEvent(mySelectionEvent);
    }
}








