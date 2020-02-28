import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { sha256, sha224 } from 'js-sha256';
import { retry, catchError } from 'rxjs/operators';
import { User, LoginResponse } from '../user';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  message: any
  visability: any
  
  users: any
  user: FormGroup;

  constructor(private router: Router,
    private loginservice: AuthenticationService, private service: UserService,
    private formBuilder: FormBuilder, private http: HttpClient) { }

  /*
  *function initialazation
  */
  ngOnInit() {
    this.user = this.formBuilder.group({ id: '', email: '123', name: '', password: '', role: '' });
    this.user = this.formBuilder.group({
      email: ['',[Validators.required, 
        //su dung duoc
        // ValidationService.emailValidator
      ]],

      password: ['', [Validators.required, 
        //su dung duoc
        // ValidationService.passwordValidator
      ]]
    });

  }

  //header api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /*
  *function login
  */
  doLogin() {

    //get date from form
    let info = { email: this.user.value.email, password: sha256(this.user.value.password) };
    // let info = {email: this.user.value.email, password: (this.user.value.password) };
    //push to boby api
    let resp = this.http.post("http://localhost:8080/login/api/v1/XXXXXXXXXX", info, this.httpOptions);
    resp.subscribe((data) => {
      if (data == false) { // response result
        this.router.navigate(['home']); //change page
        sessionStorage.setItem('username', this.user.value.email) // save session 
        localStorage.setItem('access_token', ''); //not used yet
        this.message = data; //not used yet
      } else {
        this.visability = true; //condition if false will show error
      }

    });
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}