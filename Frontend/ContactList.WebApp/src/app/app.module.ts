import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactEditModalComponent } from './components/contact-edit-modal/contact-edit-modal.component';
import { ContactDetailsModalComponent } from './components/contact-details-modal/contact-details-modal.component';
import { ContactCreateModalComponent } from './components/contact-create-modal/contact-create-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactEditModalComponent,
    ContactDetailsModalComponent,
    ContactCreateModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
