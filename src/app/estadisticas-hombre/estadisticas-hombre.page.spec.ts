import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasHombrePage } from './estadisticas-hombre.page';

describe('EstadisticasHombrePage', () => {
  let component: EstadisticasHombrePage;
  let fixture: ComponentFixture<EstadisticasHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
