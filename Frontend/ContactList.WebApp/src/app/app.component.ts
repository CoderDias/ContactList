import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ContactEditModalComponent } from './components/contact-edit-modal/contact-edit-modal.component';
import { ContactDetailsModalComponent } from './components/contact-details-modal/contact-details-modal.component';
import { ContactCreateModalComponent } from './components/contact-create-modal/contact-create-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public contacts: Contact[] = [];

  title = 'ContactList.WebApp';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.http.get<Contact[]>('http://localhost:5000/contact').subscribe(
      (result) => {
        this.contacts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteContact(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `http://localhost:5000/contact/${id}`;

        this.http.delete(url).subscribe(
          () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your contact has been deleted.',
              icon: 'success'
            });
            this.getContacts();
          },
          (error) => {
            console.error(`Error deleting contact with id ${id}:`, error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your contact is safe :)', 'info');
      }
    });
  }

  editContact(id: number) {
    // Buscar o contato pelo ID
    const url = `http://localhost:5000/contact/${id}`;
    this.http.get<Contact>(url).subscribe(
      (contact) => {
        const modalRef = this.modalService.open(ContactEditModalComponent);
        modalRef.componentInstance.contact = contact;

        modalRef.result.then(
          (updatedContact) => {
            const updateUrl = `http://localhost:5000/contact/${id}`;
            this.http.put(updateUrl, updatedContact).subscribe(
              () => {
                Swal.fire('Updated!', 'Your contact has been updated.', 'success');
                this.getContacts();
              },
              (error) => {
                console.error(`Error updating contact with id ${id}:`, error);
              }
            );
          },
          (dismissReason) => {
            if (dismissReason === 'cancel') {
              Swal.fire('Cancelled', 'Your edit has been cancelled.', 'info');
            }
          }
        );
      },
      (error) => {
        Swal.fire('Error', `Error fetching contact with id ${id}: ${error}`, 'error');
      }
    );
  }

  detailsContact(id: number) {
    const url = `http://localhost:5000/contact/${id}`;
    this.http.get<Contact>(url).subscribe(
      (contact) => {
        const modalRef = this.modalService.open(ContactDetailsModalComponent);
        modalRef.componentInstance.contact = contact;
      },
      (error) => {
        Swal.fire('Error', `Error fetching contact with id ${id}: ${error}`, 'error');
      }
    );
  }

  createContact() {
    const modalRef = this.modalService.open(ContactCreateModalComponent);
    modalRef.componentInstance.contact = { id: 0, name: '', email: '', phone: '' };;

    modalRef.result.then(
      (updatedContact) => {
        Swal.fire('Updated!', 'Your contact has been updated.', 'success');
        this.getContacts();
      },
      (dismissReason) => {
        if (dismissReason === 'cancel') {
          Swal.fire('Cancelled', 'Your edit has been cancelled.', 'info');
        }
      }
    );
  }
}
