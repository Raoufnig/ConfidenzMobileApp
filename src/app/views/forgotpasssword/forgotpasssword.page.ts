import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from 'src/app/Services/auth.service';
import { URL } from 'src/app/classes/url';

@Component({
  selector: 'app-forgotpasssword',
  templateUrl: './forgotpasssword.page.html',
  styleUrls: ['./forgotpasssword.page.scss'],
})
export class ForgotpassswordPage implements OnInit {
  util : any;
   utilInfo : any;
   isChecked: boolean = false;
  buttonEnabled: boolean = false;

  loader:Boolean=false;
  updatePassword:Boolean=false;
  errorPassword:Boolean=false;
  supprimeloader:Boolean=false;
  messagePasswordGood!:string;
  errorMessage!:string;
 
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

  submitPassword(){

    let formdata=new FormData();
    formdata.append('old_password',this.passwordForm.value.OldPassword)
    formdata.append('password',this.passwordForm.value.NewPassword)
    formdata.append('password_confirmation',this.passwordForm.value.ConfirmPassword)
    this.loader=true;
    let BearerToken= 'Bearer '+this.utilInfo.authorization.token;
    axios.post(URL.EMPLOYEE_URL + '/update-password', formdata,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
      }}).then((response)=>{
        console.log(response)
        this.loader=false
        this.updatePassword=true;
        this.messagePasswordGood=response.data.message;
        this.router.navigate(['login'])
      }).catch((error)=>{
        this.loader=false;
        this.errorPassword=true;
        if(error.response.status=401){
          this.errorMessage=error.response.data.message.password+' et '+error.response.data.message.password_confirmation
          console.log('Password error: ' + this.errorMessage)
        }
        this.errorMessage=error.response.data.message ?? error.response.data.error.password+'&'+error.response.data.error.password_confirmation
        console.log(error);
        
      })
  }
}
