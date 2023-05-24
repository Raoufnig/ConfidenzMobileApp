import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { Url } from '../classes/url';


axios.defaults.withCredentials=true;
export interface EmployeeItems{
  name:string;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor() { }

  

    async login(loginform:any){

      console.log(loginform);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' });
      await axios.post(Url.EMPLOYEE_URL+'/login',loginform).then((response)=>{
        localStorage.removeItem('userInfo');
        const employeeString= JSON.stringify(response.data)
        localStorage.setItem('userInfo',employeeString);
        console.log("userInfo : ", localStorage.getItem('userInfo'));
        
      })
    }

    


 
  


}
