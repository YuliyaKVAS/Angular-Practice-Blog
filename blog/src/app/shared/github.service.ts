import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const baseUrl = 'https://api.github.com/search/users?';

@Injectable({
  providedIn: "root"
})
export class GithubService{

  constructor(private http: HttpClient) {};

  getUsers(query: string) {
    return this.http.get(`${baseUrl}q=${query}`);
  }
}
