import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44340';
  public tokenKey = "user"

  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  checkToken() : string {
    const token = localStorage.getItem(this.tokenKey);

    if(token == null){
      this.router.navigateByUrl("/login");
      return null;
    } else {
      return token;
    }
  }

  login(username: string, password: string): Observable<any> {
    const data = {
      email: username,
      password: password
    };

    return this.http.post(`${this.apiUrl}/api/account/login`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    // this.isAuthenticatedSubject.next(false);

    this.router.navigateByUrl("/login")
  }

  register(email: string, password: string): Observable<any> {
    const data = {
      email: email,
      password: password,
      confirmPassword: password
    };
    return this.http.post(`${this.apiUrl}/api/Account/Register`, data);
  }
}
