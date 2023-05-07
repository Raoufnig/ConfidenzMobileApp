import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDocPage } from './view-doc.page';

describe('ViewDocPage', () => {
  let component: ViewDocPage;
  let fixture: ComponentFixture<ViewDocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
