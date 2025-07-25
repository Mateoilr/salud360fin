import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasMujerPage } from './estadisticas-mujer.page';

describe('EstadisticasMujerPage', () => {
  let component: EstadisticasMujerPage;
  let fixture: ComponentFixture<EstadisticasMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
