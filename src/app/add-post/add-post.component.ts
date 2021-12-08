import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postTitle = '';
  postText = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  addPost(event: Event) {
    event.preventDefault();
    const title = this.postTitle;
    const text = this.postText;
    const postBody = {title, text};

    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/posts.json', postBody).subscribe();
  }
}
