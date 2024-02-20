import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public contacts: Contact[] = [];

  title = 'ContactList.WebApp';

  constructor(private http: HttpClient) {}

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
}
