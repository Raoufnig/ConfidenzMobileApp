import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Url } from 'src/app/classes/url';
@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {
  storeData:any;
  employeeInfo:any;
  documents:Array<any>=[] ;
  docData:any;
  exceldoc:any;
  id:any;
  loaded:boolean = false;
  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.storeData=localStorage.getItem("userInfo")
    this.employeeInfo=JSON.parse(this.storeData);
    this.docData=localStorage.getItem("Doc");
    this.exceldoc=JSON.parse(this.docData);
    const id = this.route.snapshot.paramMap.get('id');
    this.listdoc(id);
    
  }

  listdoc(id:any){
    this.loaded = false
    let BearerToken= 'Bearer'+ this.employeeInfo.authorization.token 
      axios.get(Url.EMPLOYEE_URL +'/'+this.employeeInfo.employee.id+'/files/'+id,{
        headers:{
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        
        this.documents=response.data.content
        console.log(this.documents)
        this.loaded = true;
      }).catch((error)=>{
        console.log(error)
      })
    
  }

  toPage(docs:any){
   
    this.router.navigate(['view-doc'])
  }
}
