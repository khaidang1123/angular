import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  loggedIn: any;
  constructor(
    private authService: SocialAuthService,
    private router: Router
  ) { 
    const accountStorage = localStorage.getItem("google_account")
    if(accountStorage){
      this.router.navigate([""])
    }
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      localStorage.setItem("google_account", JSON.stringify(data))
      this.router.navigate([""])
    })
  }

}
