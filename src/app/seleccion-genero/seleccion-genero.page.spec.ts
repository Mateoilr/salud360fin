import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionGeneroPage } from './seleccion-genero.page';

describe('SeleccionGeneroPage', () => {
  let component: SeleccionGeneroPage;
  let fixture: ComponentFixture<SeleccionGeneroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionGeneroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
