import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  canActivate(): boolean {
    // BLOQUEO TOTAL: Si el usuario YA está autenticado, NUNCA permitir acceso a login/registro
    if (this.authService.isAuthenticated()) {

      // Verificar si tiene género seleccionado
      const gender = this.userDataService.getGender();

      if (gender === 'hombre') {
        this.router.navigate(['/tabs-hombre'], { replaceUrl: true });
      } else if (gender === 'mujer') {
        this.router.navigate(['/tabs-mujer'], { replaceUrl: true });
      } else {
        // Si está autenticado pero no tiene género, ir a selección
        this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
      }

      return false; // BLOQUEO TOTAL - No permitir acceso a login/registro
    }

    // Si NO está autenticado, permitir acceso a login/registro
    return true;
  }
}
