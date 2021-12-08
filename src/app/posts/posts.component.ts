import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../shared/post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts!: Post[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{[id: string]: Post}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const postData = result[id];
          return new Post(id, postData.title, postData.text);
        });
      }))
      .subscribe(posts =>{
          this.posts = posts;
      });
  }
}
