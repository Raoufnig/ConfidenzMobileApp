import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { URL } from 'src/app/classes/url';
@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {
  storeData:any;
  compagnInfo:any;
  documents:Array<any>=[] ;
  docData:any;
  exceldoc:any;
  id:any;
  employee= new Set();
  loader:Boolean=true;
  oneDoc=false;
  oneElement:any;
  headinglevel=true;
  heading!:number;
  counter!:number;
  count!: number;
  firstvisited:any;
  loaded:boolean = false;
  employeeInfo:any;
  stop:Boolean=false;
  constructor(private router:Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.counter = params['heading'];
    });
  }

  ngOnInit(): void {
    console.log("ngOnit",this.documents)
    this.storeData=localStorage.getItem("userInfo")
    this.employeeInfo=JSON.parse(this.storeData);
    this.docData=localStorage.getItem("Doc");
    this.exceldoc=JSON.parse(this.docData);
    const storedCount = localStorage.getItem('count');
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.firstvisited=localStorage.getItem("firstvisite");
    
  if (this.firstvisited == "firstvisite") {
    // Actions à effectuer lors de la première visite
    console.log("firstvisite");
    this.listdoc(this.exceldoc.root_id);
    if(storedCount == "1"){
      this.counter=this.storeData;
    }
    localStorage.setItem('firstvisite', 'visited')
  }
  else{
    console.log("seconde fois");
          let doc:any;
          this.loaded=true;
          this.loader=false;
          doc=localStorage.getItem('Documents');
          this.documents=JSON.parse(doc);
    if(this.counter<=0){
      this.counter=this.counter; 
    }      
   }
    if (storedCount) {
      this.count = parseInt(storedCount, 10);
      this.count--;
      if(this.count<=0){
        this.count=1; 
        this.stop=true;
        console.log("le truer")
      }  
 
    } 
    
    else {
      this.count = this.exceldoc.heading_level; 
    }
    localStorage.setItem('count', this.count.toString());  
  }

  listdoc(id:any){
    this.loaded = false
    let BearerToken= 'Bearer'+ this.employeeInfo.authorization.token 
      axios.get(URL.EMPLOYEE_URL + '/files/' + id,{
        headers:{
          'Authorization': 'Bearer '+ this.employeeInfo.authorization.token,
        }
      }).then((response)=>{
        console.log("response",response);
        this.loaded=true;
        this.loader=false;
        let myArray=[]
        myArray=response.data.content[0].children
        if (myArray.length === 0) {
        this.loader=false;
        this.oneDoc=true;
        console.log("seul");
        this.oneElement=response.data;
       }
       else{
       this.loaded=true;
       this.oneDoc=false;
       this.loader=false;
       this.documents=response.data.content;
       }
        console.log("le document",this.documents)
      }).catch((error)=>{
        this.loader=true
        console.log(error)
      })
    
  }

  viewElement(docs:any){
    console.log('docs',docs);
    localStorage.removeItem('viewElement');
    localStorage.setItem('viewElement',JSON.stringify(docs));
    localStorage.removeItem('firstvisiteview');
    localStorage.setItem('firstvisiteview','firstvisite')
    this.router.navigate(['/tab/home/view-doc'])
  }

  return(documents:any) {
    const currentUrl = this.router.url;
    localStorage.removeItem('Documents');
    localStorage.setItem('Documents',JSON.stringify(documents.children));
      this.router.navigate([currentUrl], { queryParams: { 
             heading:this.count} });

  }
  toPage(docs:any){
   
    this.router.navigate(['view-doc'])
  }
}
