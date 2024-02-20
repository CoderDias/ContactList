import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../models/contact.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-edit-modal',
  templateUrl: './contact-edit-modal.component.html',
  styleUrl: './contact-edit-modal.component.css'
})

export class ContactEditModalComponent implements OnInit {
  @Input() contact!: Contact;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit() { }

  saveChanges() {
    const updateUrl = `http://localhost:5000/contact/${this.contact.id}`;
    
    const updatedContactData = {
      id: this.contact.id,
      name: this.contact.name,
      email: this.contact.email,
      phone: this.contact.phone
    };

    this.http.put(updateUrl, updatedContactData).subscribe(
      () => {
        Swal.fire('Saved!', 'Your changes have been saved.', 'success');
        this.activeModal.close(updatedContactData);
      },
      (error) => {
        console.error('Error updating contact:', error);
        Swal.fire('Error', 'Failed to save changes.', 'error');
      }
    );
  }

  close() {
    this.activeModal.dismiss('Cancel');
  }
}

