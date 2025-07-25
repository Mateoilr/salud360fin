import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GenderSelectionGuard implements CanActivate {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  canActivate(): boolean {
    // Solo usuarios autenticados pueden acceder a selección de género
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Si ya tiene género seleccionado, redirigir al inicio
    if (this.userDataService.hasSelectedGender()) {
      const gender = this.userDataService.getGender();
      if (gender === 'hombre') {
        this.router.navigate(['/inicio-hombre']);
      } else if (gender === 'mujer') {
        this.router.navigate(['/inicio-mujer']);
      }
      return false;
    }

    // Usuario autenticado sin género = puede acceder
    return true;
  }
}
