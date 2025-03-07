import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveContact from '@salesforce/apex/ContactController.newContact';

export default class ContactForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field === 'FirstName') {
            this.firstName = event.target.value;
        } else if (field === 'LastName') {
            this.lastName = event.target.value;
        } else if (field === 'Email') {
            this.email = event.target.value;
        }
    }

    handleSaveContact() {
        saveContact({ firstName: this.firstName, lastName: this.lastName, email: this.email })
            .then(() => {
                this.showToast('Éxito', 'Contacto creado correctamente', 'success');
                this.dispatchEvent(new CustomEvent('contactsaved'));
                this.firstName = '';
                this.lastName = '';
                this.email = '';
            })
            .catch(error => {
                this.showToast('Error', 'Hubo un error al crear el contacto: ' + error.body.message, 'error');
            });
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}
