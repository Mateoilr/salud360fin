import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDiarioHombrePage } from './test-diario-hombre.page';

describe('TestDiarioHombrePage', () => {
  let component: TestDiarioHombrePage;
  let fixture: ComponentFixture<TestDiarioHombrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiarioHombrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
