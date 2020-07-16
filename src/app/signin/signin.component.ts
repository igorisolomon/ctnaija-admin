import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSignin(signinForm){
    this.authService.signIn(signinForm.value).subscribe(
      response=>{
        if(response.status){
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/')
        }
      }
    ) 
  }

}
