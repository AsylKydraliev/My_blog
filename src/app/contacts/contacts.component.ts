import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../shared/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts!: Contact;
  address = '';
  phone = '';
  email = '';
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get<Contact>('https://app-blog-f76a2-default-rtdb.firebaseio.com/pages/contacts.json')
      .subscribe(result => {
        this.contacts = result;
        this.address = this.contacts.address;
        this.phone = this.contacts.phone;
        this.email = this.contacts.email;
      });
  }
}
