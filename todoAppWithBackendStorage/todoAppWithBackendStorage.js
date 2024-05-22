import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, wire } from 'lwc';
import TASK_MANAGER_OBJECT from '@salesforce/schema/Task_Manager__c';
import NAME_FIELD from '@salesforce/schema/Task_Manager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import IS_TASK_COMPLETED from '@salesforce/schema/Task_Manager__c.Is_Completed__c';
import TASK_COMPLETED_DATE from '@salesforce/schema/Task_Manager__c.Completed_Date__c';
import ID_FIELD from '@salesforce/schema/Task_Manager__c.Id';
import getAllInCompletedRecord from '@salesforce/apex/todoAppController.getAllInCompletedRecord';
import getAllCompletedRecord from '@salesforce/apex/todoAppController.getAllCompletedRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
export default class TodoApp extends LightningElement {

    taskName = ""
    taskEndDate = null
    incompleteTask=[]
    completedTask=[]
    incompleteTaskResult;
    completeTaskResult;
    @wire(getAllInCompletedRecord)wire_inCompleteRecords(result){
        this.incompleteTaskResult = result;
        let {data,error} = result;
        if(data){
            console.log("getAllInCompletedRecord data", data);
            this.incompleteTask = data.map((curritem) => ({
                taskId : curritem.Id,
                taskName : curritem.Name,
                taskEndDate : curritem.Task_Date__c
            }))
        }
        else if(error){
            console.log("getAllInCompletedRecord error", error);
        }
    }

    @wire(getAllCompletedRecord)wire_CompleteRecords(result){
        this.completeTaskResult = result;
        let {data,error} = result;
        if(data){
            console.log("getAllCompletedRecord data", data);
            this.completedTask = data.map((curritem) => ({
                taskId : curritem.id,
                taskName : curritem.Name,
                taskEndDate : curritem.Task_Date__c
            }))
        }
        else if(error){
            console.log("getAllCompletedRecord error", error);
        }
    }

    changeHandler(event){
       let {name, value} = event.target;
       if(name==="taskName"){
        this.taskName = value;
       }else if(name === "taskEndDate"){
        this.taskEndDate = value;
       }
    }
    resetHandler(){
        this.taskName = ""
        this.taskEndDate = null
    }
    addTaskHandler()
    {

        if(this.taskEndDate == undefined)
        {
            this.taskEndDate = new Date().toISOString().substring(0, 10);
        }
        if(this.validateTask())
        {
            //     this.incompleteTask = [...this.incompleteTask,
            //     {
            //         taskName : this.taskName,
            //         taskEndDate : this.taskEndDate
            //     }];
            // }
            // let sortedArray = this.sortTask(this.incompleteTask)
            // this.incompleteTask = [...sortedArray]
            // this.resetHandler()
            let fields = {};
            fields[NAME_FIELD.fieldApiName] = this.taskName;
            fields[TASK_DATE_FIELD.fieldApiName] = this.taskEndDate;
            fields[IS_TASK_COMPLETED.fieldApiName] = false;

            let recordInput = 
            {
                apiName: TASK_MANAGER_OBJECT.objectApiName,
                fields: fields
            }

            createRecord(recordInput).then((result) => {
            console.log("Task creation result ",result);
            this.showToast("Success", "Record Created Successfully", "success");
            this.resetHandler()
            refreshApex(this.incompleteTaskResult);
            });
        }
    }

    validateTask()
    {
        let isValid = true
        let val = this.template.querySelector(".taskName")
        if(!this.taskName){
            isValid = false
        }else{
            let element = this.incompleteTask.find(
                (currentitem) =>
                currentitem.taskName == this.taskName &&
                currentitem.taskEndDate == this.taskEndDate
            );
            if(element){
                isValid = false
                val.setCustomValidity("Task is Already Available")
            }
        }
        if(isValid){
            val.setCustomValidity("")
        }
        val.reportValidity();
        return isValid;
    }
    deleteHandler(event){
        let recordId = event.target.name
        console.log("recordId for delete", recordId);
        deleteRecord(recordId).then(()=>{
            this.showToast("Success", "Record deleted successfully", "success");
            refreshApex(this.incompleteTaskResult);
        }).catch((error)=>{
            this.showToast("Failure", "Record deletion failed", "error");
        })
        // this.incompleteTask.splice(index,1);
        // let sortedArray = this.sortTask(this.incompleteTask)
        // this.incompleteTask = [...sortedArray]

        
    }
    completedHandler(event){
        let recordId = event.target.name
        const fields = {};

        fields[ID_FIELD.fieldApiName] = recordId;
        fields[IS_TASK_COMPLETED.fieldApiName] = true;
        fields[TASK_COMPLETED_DATE.fieldApiName] = new Date().toISOString().substring(0, 10);

        const recordInput = {
            fields: fields
        };
        updateRecord(recordInput).then((result) => {
            this.showToast("updated", "Record Updated successfully", "success");
            refreshApex(this.incompleteTaskResult);
            refreshApex(this.completeTaskResult);
          }).catch((error)=>{
            this.showToast("Failure", "Record updation failed", "error");
        })
        // let removedElement = this.incompleteTask.splice(index,1);
        // this.completedTask = [...this.completedTask, removedElement[0]];
        // let sortedArray = this.sortTask(this.completedTask)
        // this.completedTask = [...sortedArray]
    }

    sortTask(task){
        let sortedArray = task.sort((a,b)=>{
            const dateA = new Date(a.taskEndDate)
            const dateB = new Date(b.taskEndDate)
            return dateA - dateB
        });
        return sortedArray;
    }

    showToast(title,message,variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}