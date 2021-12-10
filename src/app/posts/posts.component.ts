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
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.http.get<{[id: string]: Post}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(result => {
        if(result === null) {
          return [];
        }
        return Object.keys(result).map(id => {
          const postData = result[id];
          return new Post(id, postData.date, postData.title, postData.text);
        });
      }))
      .subscribe(posts =>{
          this.posts = posts;
          this.loading = false;
      });
  }
}
