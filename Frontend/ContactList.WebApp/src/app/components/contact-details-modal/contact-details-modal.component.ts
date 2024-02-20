import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../models/contact.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-details-modal',
  templateUrl: './contact-details-modal.component.html',
  styleUrl: './contact-details-modal.component.css'
})
export class ContactDetailsModalComponent {
  @Input() contact!: Contact;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit() { }
  
  close() {
    this.activeModal.dismiss('Cancel');
  }
}
