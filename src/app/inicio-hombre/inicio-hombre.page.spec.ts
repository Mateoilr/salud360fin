import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioHombrePage } from './inicio-hombre.page';

describe('InicioHombrePage', () => {
  let component: InicioHombrePage;
  let fixture: ComponentFixture<InicioHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
