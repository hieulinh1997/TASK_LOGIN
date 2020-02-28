import { Component, Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
export class AuthenticationService {


  constructor(private service: UserService) { }

  //sesstion setup
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  //logout
  logOut() {
    sessionStorage.removeItem('username')
    // alert('logout');
  }

}