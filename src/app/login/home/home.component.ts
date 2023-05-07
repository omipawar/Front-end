import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  type: string = "password";
  show: boolean = false;
  loginForm: any;
  invalidCredentials: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl("admin@gmail.com", Validators.compose([Validators.email, Validators.required])),
      password: new FormControl("12345", Validators.compose([Validators.required, Validators.minLength(4)]))
    })
  }

  showHide() {
    if (this.type === 'password') {
      this.type = 'text';
      this.show = true;
    } else {
      this.type = 'password';
      this.show = false;
    }
  }

  login(data: Login) {
    this.loginService.login(data).subscribe((res: any) => {
      if (res.Success) {
        localStorage.setItem("user", JSON.stringify(data.userName));
        this.invalidCredentials = false;
        this.router.navigate(["dashboard"]);
      } else {
        this.invalidCredentials = true;
      }
    })
  }

}
