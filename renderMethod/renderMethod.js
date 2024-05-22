import { LightningElement } from 'lwc';
import signinMethod from './signinMethod.html'
import signupMethod from './signupMethod.html'
import renderMethod from './renderMethod.html'
import singinMethod from './singinMethod.html'
export default class RenderMethod extends LightningElement {
    temp=""
    render(){
        return this.temp === 'signup' ? signupMethod :
               this.temp === 'signin' ? signinMethod :
               renderMethod 
    }
    
    handleClick(event){
        this.temp=event.target.label
    }
    submitHandler(event){
        return console.log(`${event.target.label} successful`)
    }
}