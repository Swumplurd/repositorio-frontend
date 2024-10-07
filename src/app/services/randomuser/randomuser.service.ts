import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RandomUser } from '../../interface/randomuser/randomuser';

@Injectable({
  providedIn: 'root'
})
export class RandomuserService {
  apiUrl: string = "https://randomuser.me/api/"

  constructor(private http: HttpClient) { }

  getRandomUser() {
    return this.http.get(this.apiUrl)
  }
}
