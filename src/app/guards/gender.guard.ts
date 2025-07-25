import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GenderGuard implements CanActivate {
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const generoSeleccionado = localStorage.getItem('genero');
    const rutaActual = route.url[0]?.path || '';

    // Si no hay género seleccionado, redirigir a selección
    if (!generoSeleccionado) {
      this.router.navigate(['/seleccion-genero']);
      return false;
    }

    // Verificar que la ruta coincida con el género seleccionado
    const esRutaHombre = rutaActual.includes('hombre');
    const esRutaMujer = rutaActual.includes('mujer');

    if (generoSeleccionado === 'hombre' && esRutaMujer) {
      this.router.navigate(['/inicio-hombre']);
      return false;
    }

    if (generoSeleccionado === 'mujer' && esRutaHombre) {
      this.router.navigate(['/inicio-mujer']);
      return false;
    }

    return true;
  }
}
