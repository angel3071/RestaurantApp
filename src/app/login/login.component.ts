import { Component, OnInit, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    console.log('Si está entrando');
   }
  username: string;

  password: string;
  ngOnInit() {
  }
  login() : void {

    if(this.username == 'admin' && this.password == 'admin'){

     this.router.navigate(["user"]);

    }else {

      alert("Invalid credentials");

    }

  }
  signInWithGoogle() {
    this.authService.signWithGoogle()
    .then((res) => this.router.navigate(['/']))
    .catch((err) => console.log(err));
  }

}
