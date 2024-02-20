import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contact: Contact = { id: 0, name: '', email: '', phone: '' };

  constructor(private contactService: ContactService) { }

  submitForm() {
    this.contactService.sendContact(this.contact).subscribe(
      () => {
        this.showSuccessAlert();
      },
      (error) => {
        this.showErrorAlert(error);
      }
    );
  }


  private showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      text: 'Contact sent successfully!',
      icon: 'success',
    });
  }

  private showErrorAlert(result: any) {
    Swal.fire({
      title: 'Error',
      text: result.error[0].errorMessage,
      icon: 'error',
    });
    console.error('Error sending contact:', result);
  }
}
