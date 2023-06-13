import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  user: any;
  isConnected = false;
  loader!: Boolean;
  log=false;
  error=false;
  errormessage!:string;

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private authservice: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.loader=false
    let ref =this;
    Network.addListener("networkStatusChange", (val: any) =>{
     if(val.connected){
       ref.showToast("Connexion établie.");
       this.isConnected;
       
     }
     else{
       ref.showToast("Connexion perdue.");
       this.isConnected=false;
     }
    });
    
  }

    showToast(msg :string){
    Toast.show({text : msg , duration : "long", position:'top'})
}
  async onSubmit() {
    if (this.loginForm.invalid) {
      this.showPassword= true
      console.log("invalide");
      return;
    }

    
    let result = { email: this.loginForm.value.email, password: this.loginForm.value.password }
    console.log("valide");
    console.log(result);
    this.isConnected = true
    this.loader = true;
    this.log= false

    await this.authservice.login(result).then(() => {
      this.loader = false;
      this.router.navigate(['tab/home'])
      
    }).catch((error :any) => {
      console.log(error)
      this.loader = false
      this.log=true;
      //this.loader=false;
      this.error=true;
      this.errormessage= error.message ?? error.error
      this.router.navigate(['login'])
     
    });


    // handle form submission
  }

}
