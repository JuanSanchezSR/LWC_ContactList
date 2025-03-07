import { LightningElement, track, wire } from 'lwc';
import obtainAllContacts from '@salesforce/apex/ContactController.obtainAllContacts';
import { refreshApex } from '@salesforce/apex';

export default class ContactTable extends LightningElement {
    @track contacts = [];
    @track error;
    @track showForm = false;
    wiredContactsResult;

    columns = [
        { label: 'Nombre', fieldName: 'FirstName' },
        { label: 'Apellido', fieldName: 'LastName' },
        { label: 'Email', fieldName: 'Email' }
    ];

    @wire(obtainAllContacts)
    wiredContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.contacts = [];
        }
    }

    handleNewContact() {
        this.showForm = true;
    }

    handleContactSaved() {
        this.showForm = false;
        return refreshApex(this.wiredContactsResult);
    }

    handleCancel() {
        this.showForm = false;
    }
}
