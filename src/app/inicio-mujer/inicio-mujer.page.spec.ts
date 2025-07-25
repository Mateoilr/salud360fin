import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioMujerPage } from './inicio-mujer.page';

describe('InicioMujerPage', () => {
  let component: InicioMujerPage;
  let fixture: ComponentFixture<InicioMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
