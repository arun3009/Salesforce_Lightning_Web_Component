import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/contactController.getContactList';
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendContact__c";
export default class ContactList extends LightningElement {

    @wire(MessageContext)
    messageContext;

    @wire(getContactList)contacts;
    selectedContact;
    selectionHandler(event){
        let selectedContactId = event.detail;

        this.selectedContact = this.contacts.data.find(
            (curritem) => curritem.Id === selectedContactId);

        const payload = { selectedContactData: this.selectedContact };
        publish(this.messageContext, recordSelected, payload);
    }
}