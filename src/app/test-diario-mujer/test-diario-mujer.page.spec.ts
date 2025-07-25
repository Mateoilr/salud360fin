import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDiarioMujerPage } from './test-diario-mujer.page';

describe('TestDiarioMujerPage', () => {
  let component: TestDiarioMujerPage;
  let fixture: ComponentFixture<TestDiarioMujerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiarioMujerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
