import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  error: any;
  user: any;
  isConnected = true;
  loader: Boolean = false;

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private authservice: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {

  }
  async onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalide");
      return;
    }

    this.loader = true;
    let result = { email: this.loginForm.value.email, password: this.loginForm.value.password }
    console.log("valide");
    console.log(result);

    await this.authservice.login(result).then(() => {
      this.loader = false;
      localStorage.clear();
      this.router.navigate(['tab/home'])
    });


    // handle form submission
  }

}
