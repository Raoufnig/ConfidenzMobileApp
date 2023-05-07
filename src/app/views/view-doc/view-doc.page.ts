
import { Component, ViewChild, OnInit  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.page.html',
  styleUrls: ['./view-doc.page.scss'],
})
export class ViewDocPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(IonModal) modal !: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  dette!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.dette, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
