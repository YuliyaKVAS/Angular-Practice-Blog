import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { PostService } from "../../shared/post.service";
import { Post } from "../../shared/interfaces";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post;
  form: FormGroup;
  isLoading = false;
  updateSubscription: Subscription;

  constructor(
    private currentRoute: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    // subscribe to current route stream to get query params. No need to unsubscribe from this stream.
    // Angular does it for us
    // here we use switchMap to turn to getById stream.
    this.currentRoute.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      })
    ).subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        })
    })
  }

  submit() {
    if(this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.updateSubscription = this.postService.updatePost({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    }).subscribe(() => {
        this.isLoading = false;
        this.alertService.success('Post is updated');
        this.router.navigate(['/admin', 'dashboard']);
    })
  }

  ngOnDestroy() {
    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
