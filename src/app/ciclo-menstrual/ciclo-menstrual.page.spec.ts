import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CicloMenstrualPage } from './ciclo-menstrual.page';

describe('CicloMenstrualPage', () => {
  let component: CicloMenstrualPage;
  let fixture: ComponentFixture<CicloMenstrualPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CicloMenstrualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
