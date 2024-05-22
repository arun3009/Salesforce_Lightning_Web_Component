import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {

    name="Arun"
    learningTitle="lwc"

    isVisible=false
    fname=""
    lname=""
    fullname=""

    changehandler(event){
        this.learningTitle=event.target.value
        
    }
    namehandler(event){
        this.name=event.target.value
    }

    handleClick(){
        this.isVisible=true
    }
    
    @track address={
        city:"chennai",
        company:"cognizant",
        domain:"salesforce"
    }
    trackhandler(event){
        //this.address={...this.address,"city":event.target.value}
        this.address.city=event.target.value
    }


    users=["Arun","vignesh","Aakash","Gokar"]
    
    get username(){
        return this.users[0]
    }

    getFullname(event){
        label=event.target.label
        if(label=="fname"){
            this.fname=event.target.value
        }else{
            this.lname=event.target.value
        }
    }
    fullName(){
        this.fullname = this.fname + this.lname
    }

}