import {Component, OnInit} from '@angular/core';
import { FormControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import { EMPTY } from "rxjs";

import { GithubService } from "../../shared/github.service";

@Component({
  selector: 'app-github-search-page',
  templateUrl: './github-search-page.component.html',
  styleUrls: ['./github-search-page.component.scss']
})

export class GithubSearchPageComponent implements OnInit{
  users = [];
  isLoading = false;

  searchQuery = new FormControl();

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => this.users = []),
        filter(v => v.trim()),
        switchMap(value => this.githubService.getUsers(value)
          .pipe(catchError(err => EMPTY))
        ),
        map(value => value['items'])
      ).subscribe(value => {
      this.isLoading = true;
      this.users = value;
      this.isLoading = false;
    })
  }
}
