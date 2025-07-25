import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class HombreGuard implements CanActivate {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  canActivate(): boolean {
    // Verificar si está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    // Verificar si es HOMBRE
    const gender = this.userDataService.getGender();

    if (gender === 'hombre') {
      return true; // Permitir acceso
    } else if (gender === 'mujer') {
      // Si es mujer, redirigir a su área
      this.router.navigate(['/tabs-mujer'], { replaceUrl: true });
      return false;
    } else {
      // Si no tiene género, ir a selección
      this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
      return false;
    }
  }
}
