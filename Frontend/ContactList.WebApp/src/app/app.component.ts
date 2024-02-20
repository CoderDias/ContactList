import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public contacts: Contact[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<Contact[]>('http://localhost:5000/contact').subscribe(
      (result) => {
        this.contacts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'ContactList.WebApp';
}
