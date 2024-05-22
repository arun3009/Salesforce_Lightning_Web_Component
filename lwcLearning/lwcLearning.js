import { LightningElement } from 'lwc';

export default class LwcLearning extends LightningElement {

    
    styleName="default" 
    redHandleClick(){
            this.styleName="redColor"
    }
    blueHandleClick(){
        this.styleName="blueColor"
    }
    yellowHandleClick(){
        this.styleName="yellowColor"
    }
    whiteHandleClick(){
        this.styleName="default"
    }
}