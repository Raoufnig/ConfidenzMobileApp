
import { Component, ViewChild, OnInit  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {AlertController, LoadingController} from "@ionic/angular";
import { FormGroup ,FormControl } from '@angular/forms';
import axios from 'axios';
import { URL } from 'src/app/classes/url';
@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.page.html',
  styleUrls: ['./view-doc.page.scss'],
})
export class ViewDocPage implements OnInit {
  elements:any;
  docData:any;
  storeData:any;
  employeeInfo:any;
  modifydata:any;
  modify:any;
  isButtonDisabled: boolean = true;
  celluleForm = new FormGroup({
    value: new FormControl(),
  });

  constructor(private loadingCtrl: LoadingController,private altcrtl: AlertController) { }

  ngOnInit() {
    this.docData=localStorage.getItem("viewElement");
    this.elements=JSON.parse(this.docData);
    this.storeData=localStorage.getItem("userInfo")
    this.employeeInfo=JSON.parse(this.storeData);
    this.modifydata=localStorage.getItem("Doc");
    this.modify=JSON.parse(this.modifydata);
    if (this.modify.rights === "Modifiable"){
      this.isButtonDisabled = false;
    }
    console.log("element",this.elements);
  }

  @ViewChild(IonModal) modal !: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  dette!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm(idcel:any) {
    let BearerToken= 'Bearer '+this.employeeInfo.authorization.token
    let formdata=new FormData()
    formdata.append('value',this.celluleForm.value.value)
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      showBackdrop:false,
      spinner: 'circles',
    });
    await loading.present();
    axios.post(URL.API_URL+'/cells/'+idcel+'/update', formdata,{
      headers: {
        'Authorization': BearerToken
      }
    }).then(async (response)=>{
      await loading.dismiss();
      localStorage.removeItem("viewElement")
      let jsonData:any;
      jsonData={value:this.elements.value, id: this.elements.id, children:[{
        id:idcel, value: this.celluleForm.value.value
      }]}
      localStorage.setItem("viewElement",JSON.stringify(jsonData))
      window.location.reload()
      console.log(response)
  }).catch(async (error)=>{
    console.log(error)
    await loading.dismiss();
    const alert=await this.altcrtl.create({
      header: 'Error',
      message:error.response.data.message.value ?? error.response.data.error,
      buttons:['OK']
    });
    await alert.present()

  })
}

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
