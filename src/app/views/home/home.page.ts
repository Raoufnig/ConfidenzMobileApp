import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Console } from 'console';
import { Url } from 'src/app/classes/url';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   util : any;
   utilInfo : any;
   fichiers: any
   storeData:any;
   isConnected=true;
   loaded:boolean = false;
   docs:any;
    filteredData: any[] = [];
    searchText!: string;
  constructor(private router:Router , private loadingCtrl : LoadingController) { }

  ngOnInit() {
    this.util = localStorage.getItem('userInfo');
    this.utilInfo =JSON.parse(this.util); 
    console.log(this.utilInfo)
    this.listDocEmployee();

    let ref =this;
    Network.addListener("networkStatusChange", (val: any) =>{
     if(val.connected){
       ref.showToast("Internet Connected");
       this.isConnected;
       
     }
     else{
       ref.showToast("Internet Disconnected");
       this.isConnected=false;
     }
    });

  }

  showToast(msg :string){
    Toast.show({text : msg , duration : "long", position:'top'})
}

  toPage(){
    this.router.navigate(['/detail-doc'])
  }
  listDocEmployee(){
    this.loaded = false
    let BearerToken= 'Bearer'+ this.utilInfo.authorization.token 
    
    axios.get(Url.EMPLOYEE_URL +'/files',{
      headers:{
        'Authorization': BearerToken,
      }
    }).then((response)=>{
      
      
      this.docs=response.data.files;
      this.filteredData=response.data.files;
      console.log(this.docs)
      console.log(response)
      this.loaded = true;
    
    
    }).catch((error)=>{
      console.log(error)
    })
  }

  goToDetailPage(doc: any) {
    localStorage.removeItem('Doc');
    localStorage.removeItem('count');
    localStorage.removeItem('firstvisite');
    localStorage.setItem('firstvisite','firstvisite')
    localStorage.setItem('Doc',JSON.stringify(doc));
    localStorage.setItem('count',JSON.stringify(doc.heading_level))
    this.router.navigateByUrl(`tab/home/detail-doc/${doc.id}`);
  }

}

