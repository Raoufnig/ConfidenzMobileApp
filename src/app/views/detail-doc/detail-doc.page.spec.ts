import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DetailDocPage } from './detail-doc.page';

describe('DetailDocPage', () => {
  let component: DetailDocPage;
  let fixture: ComponentFixture<DetailDocPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
