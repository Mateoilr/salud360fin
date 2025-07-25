import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  email: string;
  gender: 'hombre' | 'mujer' | null;
  displayName?: string;
  photoURL?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<UserData | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor() {
    // Cargar datos del localStorage al inicializar
    this.loadUserData();
  }

  private loadUserData() {
    const email = localStorage.getItem('correo');
    const gender = localStorage.getItem('genero') as 'hombre' | 'mujer' | null;
    const displayName = localStorage.getItem('displayName');

    if (email) {
      this.userDataSubject.next({
        email,
        gender,
        displayName: displayName || undefined
      });
    }
  }

  setUserData(data: Partial<UserData>) {
    try {
      const currentData = this.userDataSubject.value || {} as UserData;
      const newData = { ...currentData, ...data };

      // Guardar en localStorage solo si los valores existen
      if (newData.email) {
        localStorage.setItem('correo', newData.email);
      }
      if (newData.gender) {
        localStorage.setItem('genero', newData.gender);
      }
      if (newData.displayName) {
        localStorage.setItem('displayName', newData.displayName);
      }

      this.userDataSubject.next(newData);
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }

  setGender(gender: 'hombre' | 'mujer') {
    localStorage.setItem('genero', gender);
    const currentData = this.userDataSubject.value;
    if (currentData) {
      this.userDataSubject.next({ ...currentData, gender });
    }
  }

  getGender(): 'hombre' | 'mujer' | null {
    return localStorage.getItem('genero') as 'hombre' | 'mujer' | null;
  }

  getUserData(): UserData | null {
    return this.userDataSubject.value;
  }

  clearUserData() {
    localStorage.removeItem('correo');
    localStorage.removeItem('genero');
    localStorage.removeItem('displayName');
    this.userDataSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('correo');
  }

  hasSelectedGender(): boolean {
    return !!localStorage.getItem('genero');
  }
}
