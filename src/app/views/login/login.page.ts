import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup , FormBuilder , Validators , FormControl} from '@angular/forms';
import { log } from 'console';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
  }
  ngOnInit() {
  }
  onSubmit(){
    if(this.loginForm.invalid){
      console.log("invalide");
      return;
    }
    else{ 
      this.router.navigate(['/tab/home'])
    }
   
  }
}
