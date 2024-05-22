import { LightningElement } from 'lwc';

export default class StylingOne extends LightningElement {

    percent=10;
    backcolor=["black","blue","red","yellow","orange","pink","green","white","violet"]
    changetHandler(event){
        this.percent=event.target.value
        console.log(this.backcolor[Math.floor(Math.random() * this.backcolor.length)])
    }


    get getstyle(){
         return `width:${this.percent}% ; background-color:${this.backcolor[Math.floor(Math.random() * this.backcolor.length)]}`
     }
    
}