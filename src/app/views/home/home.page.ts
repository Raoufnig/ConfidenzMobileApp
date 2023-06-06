import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { URL } from 'src/app/classes/url';
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
  }

  toPage(){
    this.router.navigate(['/detail-doc'])
  }
  listDocEmployee(){
    this.loaded = false
    
    axios.get(URL.EMPLOYEE_URL +'/files',{
      headers:{
        'Authorization': 'Bearer '+ this.utilInfo.authorization.token ,
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

  onSearchChange(ev : any){
    const value = ev.target.value.toLowerCase()
    
      this.filteredData = this.filteredData.filter((d) => d.name.toLowerCase().indexOf(value) > -1);
    
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
  
  handleRefresh(event : any) {
    setTimeout(() => {
      // Any calls to load data go here
      window.location.reload();
      event.target.complete();
    }, 2000);
  }



}

