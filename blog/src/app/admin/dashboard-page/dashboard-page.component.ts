import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { PostService } from "../../shared/post.service";
import { Post } from "../../shared/interfaces";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;
  deleteSubscription: Subscription;
  searchPost = '';

  constructor(
    private postService: PostService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.postsSubscription = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  // put subscription to a variable to unsubscribe from it in ngOnDestroy
  remove(id: string) {
    this.deleteSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alertService.success('Post is removed');
    });
  }

  ngOnDestroy(){
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe(); // to avoid memory leak
    }

    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe(); // to avoid memory leak
    }
  }
}
