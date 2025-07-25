import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizacionPage } from './personalizacion.page';

describe('PersonalizacionPage', () => {
  let component: PersonalizacionPage;
  let fixture: ComponentFixture<PersonalizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
