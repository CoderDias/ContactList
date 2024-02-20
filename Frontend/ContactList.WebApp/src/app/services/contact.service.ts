import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:5000/contact';

  constructor(private http: HttpClient) { }

  sendContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }
}
