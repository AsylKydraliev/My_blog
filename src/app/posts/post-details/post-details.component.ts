import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../shared/post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  postId!: string;
  loading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      if (params['id']){this.postId  = params['id'];
        this.http.get<Post>(`https://app-blog-f76a2-default-rtdb.firebaseio.com/posts/${this.postId}.json`)
          .subscribe(result => {
              this.post = result;
              this.loading = false;
          });
      }
    });
  }

  onDeletePost(id: string){
    this.http.delete(`https://app-blog-f76a2-default-rtdb.firebaseio.com/posts/${id}.json`).subscribe();
    void this.router.navigate(['/']);
  }
}
