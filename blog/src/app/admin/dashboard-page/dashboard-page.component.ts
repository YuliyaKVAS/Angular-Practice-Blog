import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postsSubscription = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {

  }

  ngOnDestroy(){
    if(this.postsSubscription) {
      this.postsSubscription.unsubscribe(); // to avoid memory leak
    }
  }
}
