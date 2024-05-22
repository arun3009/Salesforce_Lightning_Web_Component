import { LightningElement } from 'lwc';

export default class DemoLwc extends LightningElement {
    num1 = 0
    num2 = 0
    isVisible
    addHandler(event){
        if(event.target.name ==='num1'){
            this.num1= event.target.value
        }
        if(event.target.name ==='num2'){
            this.num2= event.target.value
        }
    }

    handleClick(){
        
        this.isVisible=true
        // alert(num3)
    }
    get sumOfTwoNumbers(){
        if(this.num1 && this.num2){
            return (parseInt(this.num1) + parseInt(this.num2))
        }
        
     }
}

