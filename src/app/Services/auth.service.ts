import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import axios from 'axios';


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
      await axios.post('http://localhost:8000/api/v1/employee/login',loginform).then((response)=>{
        localStorage.removeItem('userInfo');
        const employeeString= JSON.stringify(response.data.datas)
        localStorage.setItem('userInfo',employeeString);
        console.log(localStorage.getItem('userInfo'));
        
      })
    }

 
  


}
