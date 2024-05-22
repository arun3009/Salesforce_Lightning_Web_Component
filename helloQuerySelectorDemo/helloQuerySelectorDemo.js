import { LightningElement } from 'lwc';

export default class HelloQuerySelectorDemo extends LightningElement {
    usernames=['Arun','Aakash','Gokar','Vicky']
    fetchdetails(){

        const ele= this.template.querySelector('h1')
        ele.style.color="yellow"
        console.log(ele.innerText)

        const userlist=this.template.querySelectorAll('.name')
        Array.from(userlist).forEach((element) => {
            console.log(element.innerText)
            element.setAttribute('title', element.innerText)
        });

        const x=this.template.querySelector('.child')
        x.innerHTML='<h5>Hi I am child</h5>'
    }
}