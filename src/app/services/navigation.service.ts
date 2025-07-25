import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);

  constructor() { }

  // Navegar a la página de inicio según el género
  navigateToHome() {
    const genero = localStorage.getItem('genero');
    if (genero === 'hombre') {
      this.router.navigate(['/tabs-hombre/inicio']);
    } else if (genero === 'mujer') {
      this.router.navigate(['/tabs-mujer/inicio']);
    } else {
      this.router.navigate(['/seleccion-genero']);
    }
  }

  // Navegar a estadísticas según el género
  navigateToStats() {
    const genero = localStorage.getItem('genero');
    if (genero === 'hombre') {
      this.router.navigate(['/estadisticas-hombre']);
    } else if (genero === 'mujer') {
      this.router.navigate(['/estadisticas-mujer']);
    }
  }

  // Navegar al test diario según el género
  navigateToTest() {
    const genero = localStorage.getItem('genero');
    if (genero === 'hombre') {
      this.router.navigate(['/test-diario-hombre']);
    } else if (genero === 'mujer') {
      this.router.navigate(['/test-diario-mujer']);
    }
  }

  // Navegar después del login exitoso
  navigateAfterLogin() {
    const genero = localStorage.getItem('genero');

    if (genero === 'hombre') {
      this.router.navigate(['/tabs-hombre/inicio'], { replaceUrl: true });
    } else if (genero === 'mujer') {
      this.router.navigate(['/tabs-mujer/inicio'], { replaceUrl: true });
    } else {
      // Si no tiene género, ir a selección de género
      this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
    }
  }

  // Navegar después de seleccionar género (solo se hace una vez)
  navigateAfterGenderSelection() {
    const genero = localStorage.getItem('genero');

    if (genero === 'hombre') {
      this.router.navigate(['/tabs-hombre/inicio'], { replaceUrl: true });
    } else if (genero === 'mujer') {
      this.router.navigate(['/tabs-mujer/inicio'], { replaceUrl: true });
    } else {
      // Fallback si no se guardó correctamente
      this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
    }
  }

  // Logout completo y seguro
  async logout() {
    try {
      // Cerrar sesión en Firebase
      await this.authService.signOut();

      // Limpiar datos locales
      this.userDataService.clearUserData();
      localStorage.clear();

      // Redirigir a login
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Error durante logout:', error);
      // Incluso si hay error, limpiar datos locales y redirigir
      localStorage.clear();
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
