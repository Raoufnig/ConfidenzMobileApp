import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer! : Renderer2;
  constructor(private rendorerfactory: RendererFactory2, @Inject(DOCUMENT) private document: Document ) { 
    this.renderer = this.rendorerfactory.createRenderer(null, null);
  }


  enableDark(){
    this.renderer.addClass(this.document.body, 'dark-theme');

  }

  enableLight(){
    this.renderer.removeClass(this.document.body, 'dark-theme');
  }
}
