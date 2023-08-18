import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonCheckbox, IonInput } from '@ionic/angular';
import axios from 'axios';
import { AuthService } from 'src/app/Services/auth.service';
import { URL } from 'src/app/classes/url';

@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.page.html',
  styleUrls: ['./forgotpasssword.page.scss'],
})
export class ForgotpassswordPage implements OnInit {
   // Récupérer l'élément IonInput avec la directive ViewChild
   @ViewChild('motDePasseInput') motDePasseInput!: IonInput;
   @ViewChild('motDePasseInput2') motDePasseInput2!: IonInput;
  util : any;
  utilInfo : any;
  isChecked: boolean = false;
  buttonEnabled: boolean = false;
  log: boolean=false;
  passwordIcon: string = 'eye-off';
  passwordIcon2: string = 'eye-off';
  

  loader:Boolean=false;
  updatePassword:Boolean=false;
  errorPassword:Boolean=false;
  supprimeloader:Boolean=false;
  messagePasswordGood!:string;
  errorMessage!:string;
   // Initialiser la variable pour stocker le type de l'input
   typeInput = 'password';
   typeInput2 = 'password2';
 
  passwordForm = new FormGroup({
    OldPassword: new FormControl(),
    NewPassword:  new FormControl(),
    ConfirmPassword:   new FormControl(),
  });
  constructor(private authservice : AuthService,private formBuilder: FormBuilder, private router : Router) { 
   
  }

  ngOnInit() {
    this.util = localStorage.getItem('userInfo');
    this.utilInfo =JSON.parse(this.util);
    
  }

 // Fonction pour afficher ou masquer le mot de passe
 afficherMotDePasse() {
  // Changer le type de l'input en fonction de son état actuel
  this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  this.typeInput2 = this.typeInput2 === 'password2' ? 'text' : 'password2';
  this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
  // Mettre le focus sur l'input
  this.motDePasseInput.setFocus();
  this.motDePasseInput2.setFocus();

} 

  submitPassword(){

    let formdata=new FormData();
    formdata.append('old_password',this.passwordForm.value.OldPassword)
    formdata.append('password',this.passwordForm.value.NewPassword)
    formdata.append('password_confirmation',this.passwordForm.value.ConfirmPassword)
    this.loader=true;
    axios.post(URL.EMPLOYEE_URL + '/update-password', formdata,{
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer '+this.utilInfo.authorization.token,
      }}).then((response)=>{
        console.log(response)
        this.loader=false
        this.updatePassword=true;
        this.messagePasswordGood=response.data.message;
        this.router.navigate(['login'])
      }).catch((error)=>{
        this.loader=false;
        
        if(error.response.status=401){
           this.log=true
          this.errorMessage=error.response.data.message.password_confirmation
          console.log('Password error: ' + this.errorMessage)
        }
        if (error.response.status=400){
          this.errorPassword=true;
          this.errorMessage=error.response.data.message ?? error.response.data.error.password+'&'+error.response.data.error.password_confirmation
          console.log(error);

        }
        
        
      })
  }
}
