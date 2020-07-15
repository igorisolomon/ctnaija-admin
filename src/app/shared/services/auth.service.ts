import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CompanyInterface } from '../interfaces/company';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Signin } from '../interfaces/signin';

// import {  } from "module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken = new BehaviorSubject<string>(null);
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router) { }

  async checkAuthenticationState() {
    const token = await localStorage.getItem('ctnaijaAccessToken');
    
    const parsedToken = JSON.parse(token);

    if (parsedToken) {
      this.isLoggedIn.next(true);
      this.accessToken.next(parsedToken.access_token);

      this.router.navigateByUrl('/')
    }
    else{
      this.router.navigateByUrl('/signin');
    }
  }

  setToken(token: string){
    this.isLoggedIn.next(true);
    this.accessToken.next(token);

    this.storeToken(token);
  }

  private async storeToken(token: string){
    // console.log(token);
    
    const accessToken = JSON.stringify({access_token: token});

    // console.log(accessToken);
    

    await localStorage.setItem('ctnaijaAccessToken',accessToken)
  }

  /**
   * Company info
   */
  signIn(payload) {
    return this.http.post<Signin>(
      `${environment.restApiUrl}api/signin`,
      payload
    );
  }

  logout(){
    // set variable to null
    this.isLoggedIn.next(false);
    this.accessToken.next(null);

    localStorage.removeItem('ctnaijaAccessToken')

    this.router.navigateByUrl('/signin')
  }
}
