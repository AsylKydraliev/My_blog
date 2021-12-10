import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from '../shared/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  aboutContent!: About;
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get<About>('https://app-blog-f76a2-default-rtdb.firebaseio.com/pages/about.json')
      .subscribe(result=> {
        this.aboutContent = result;
    });
  }
}
