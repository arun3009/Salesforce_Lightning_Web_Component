import { LightningElement } from 'lwc';

export default class NewComponent extends LightningElement {

    fnames=""
    lnames=""
    fullnames=""
    labelvalue=""

    getFullname(event){
        this.labelvalue=event.target.label
        if(this.labelvalue=="fname"){
            this.fnames=event.target.value
        }else{
            this.lnames=event.target.value

        }
    }
    fullName(){
        this.fullnames = (this.fnames+' '+ this.lnames).toUpperCase()   
        
    }
    resetHandler(){
        this.fnames=""
        this.lnames="" 
        this.fullnames=""
    }
}