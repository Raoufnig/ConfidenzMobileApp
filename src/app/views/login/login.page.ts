import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   // Récupérer l'élément IonInput avec la directive ViewChild
   @ViewChild('motDePasseInput') motDePasseInput!: IonInput;
  showPassword: boolean = false;
  user: any;
  isConnected = false;
  loader!: Boolean;
  log=false;
  off: boolean = true;
  error=false;
  errormessage!:string;
   // Initialiser la variable pour stocker le type de l'input
   typeInput = 'password';

   passwordType: string = 'password';
   passwordIcon: string = 'eye-off';
   hidePassword: boolean = true;
   password!: string;

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

  togglePasswordType() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    this.off=!this.off
  }
   // Fonction pour afficher ou masquer le mot de passe
//  afficherMotDePasse() {
//   // Changer le type de l'input en fonction de son état actuel
//   this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
//   // Mettre le focus sur l'input
//   this.motDePasseInput.setFocus();
// } 

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
      
      //this.loader=false;
      this.error=true;
      if(error.response.status=401){
        this.log=true;
        this.errormessage= error.response.data.message
       console.log('Password error: ' + this.errormessage)
     }
      
      this.router.navigate(['login'])
     
    });


    // handle form submission
  }

}
