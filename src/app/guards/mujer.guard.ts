import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class MujerGuard implements CanActivate {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  canActivate(): boolean {
    // Verificar si está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return false;
    }

    // Verificar si es MUJER
    const gender = this.userDataService.getGender();

    if (gender === 'mujer') {
      return true; // Permitir acceso
    } else if (gender === 'hombre') {
      // Si es hombre, redirigir a su área
      this.router.navigate(['/tabs-hombre'], { replaceUrl: true });
      return false;
    } else {
      // Si no tiene género, ir a selección
      this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
      return false;
    }
  }
}
