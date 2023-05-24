import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotpassswordPage } from './forgotpasssword.page';

describe('ForgotpassswordPage', () => {
  let component: ForgotpassswordPage;
  let fixture: ComponentFixture<ForgotpassswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotpassswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
