import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    SelectedOption={}
    correctAnswers=0;
    ShowScore=false
    questionList=[
        {
            id:1,
            Question:"Which one of the following is not a template loop?",
            options:{
                A:"for:each",
                B:"iterator",
                C:"map loop"
            },
            correctAns:"C"
        },
        {
            id:2,
            Question:"Which of the file is invalid in LWC component folder?",
            options:{
                A:".svg",
                B:".apex",
                C:".js"
            },
            correctAns:"B"
        },
        {
            id:3,
            Question:"Which one of the following is not a directive?",
            options:{
                A:"for:each",
                B:"if:true",
                C:"@track"
            },
            correctAns:"C"
        }
    ]
    get allareanswered(){
        if((Object.keys(this.SelectedOption).length === this.questionList.length)){
            return false
        }
        else{
            return true
        }
    }
    
    changehandler(event){
        //console.log("name",event.target.name)
        //console.log("value",event.target.value)
        const {name,value}=event.target
        this.SelectedOption={...this.SelectedOption,[name]:value}
        //console.log(this.SelectedOption)
    }
    submitHandler(event){
        this.correctAnswers=0
        event.preventDefault()
        this.questionList.forEach((acc)=>{ 
            if(acc.correctAns==this.SelectedOption[acc.id]){            
                this.correctAnswers=this.correctAnswers+1
            }
        })
        //console.log(this.correctAnswers)
        this.ShowScore=true
        this.SelectedOption={}
        
        
    }
    resethandler(){
        this.SelectedOption={}
        this.correctAnswers=0
        this.ShowScore=false
    }
}