import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../models/contact.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-create-modal',
  templateUrl: './contact-create-modal.component.html',
  styleUrl: './contact-create-modal.component.css'
})
export class ContactCreateModalComponent {
  @Input() contact!: Contact;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit() { }

  saveChanges() {
    const updateUrl = `http://localhost:5000/contact`;

    const updatedContactData = {
      name: this.contact.name,
      email: this.contact.email,
      phone: this.contact.phone
    };

    this.http.post(updateUrl, updatedContactData).subscribe(
      () => {
        Swal.fire('Saved!', 'Your contact have been saved.', 'success');
        this.activeModal.close(updatedContactData);
      },
      (error) => {
        console.error('Error creating contact:', error);
        Swal.fire('Error', 'Failed to create contact.', 'error');
      }
    );
  }

  close() {
    this.activeModal.dismiss('Cancel');
  }
}
