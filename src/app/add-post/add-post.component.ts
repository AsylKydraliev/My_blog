import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../shared/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{
  postTitle = '';
  postText = '';
  postId = '';
  post!: Post;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.postId  = params['id'];
        this.http.get<Post>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/posts/${this.postId}.json`)
          .subscribe(result => {
            this.post = result;
            this.postText = this.post.text;
            this.postTitle = this.post.title;
          });
      }
    });
  }

  addPost(event: Event) {
    event.preventDefault();

    const title = this.postTitle;
    const text = this.postText;
    const date = new Date();
    const postBody = {date: date.toString(), title, text};

    if(this.postId){
      this.onEditPost();
    } else {
      this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/posts.json', postBody).subscribe();
    }

    void this.router.navigate(['/']);
  }

  onEditPost() {
    const title = this.postTitle;
    const text = this.postText;
    const date = new Date();
    const postBody = {date: date.toString(), title, text};
    this.http.put(`https://app-blog-f76a2-default-rtdb.firebaseio.com/posts/${this.postId}.json`, postBody)
      .subscribe();
    void this.router.navigate(['/']);
  }
}
