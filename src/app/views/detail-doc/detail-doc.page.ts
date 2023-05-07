import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.page.html',
  styleUrls: ['./detail-doc.page.scss'],
})
export class DetailDocPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  toPage(){
    this.router.navigate(['view-doc'])
  }
}
