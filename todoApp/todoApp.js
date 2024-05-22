import { LightningElement } from 'lwc';

export default class TodoApp extends LightningElement {

    taskName = ""
    taskEndDate = null
    incompleteTask=[]
    completedTask=[]
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
    addTaskHandler(){

        if(this.taskEndDate == undefined){
            this.taskEndDate = new Date().toISOString().substring(0, 10);
        }
        if(this.validateTask()){
            this.incompleteTask = [...this.incompleteTask,
            {
                taskName : this.taskName,
                taskEndDate : this.taskEndDate
            }];
        }
        let sortedArray = this.sortTask(this.incompleteTask)
        this.incompleteTask = [...sortedArray]
        this.resetHandler()
    }
    validateTask(){
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
        let index = event.target.name
        this.incompleteTask.splice(index,1);
        let sortedArray = this.sortTask(this.incompleteTask)
        this.incompleteTask = [...sortedArray]
        
    }
    completedHandler(event){
        let index = event.target.name
        let removedElement = this.incompleteTask.splice(index,1);
        this.completedTask = [...this.completedTask, removedElement[0]];
        let sortedArray = this.sortTask(this.completedTask)
        this.completedTask = [...sortedArray]
    }

    sortTask(task){
        let sortedArray = task.sort((a,b)=>{
            const dateA = new Date(a.taskEndDate)
            const dateB = new Date(b.taskEndDate)
            return dateA - dateB
        });
        return sortedArray;
    }
}