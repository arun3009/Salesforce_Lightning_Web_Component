import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendMessage__c";
export default class PublishLMS extends LightningElement {

    @wire(MessageContext)
    messageContext;

    publishHandler(event) {
        const payload = { lmsData: "Message send from publish component and received from subscribe component" };
    
        publish(this.messageContext, recordSelected, payload);
      }
}