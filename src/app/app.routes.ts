import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GenderGuard } from './guards/gender.guard';
import { GenderSelectionGuard } from './guards/gender-selection.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HombreGuard } from './guards/hombre.guard';
import { MujerGuard } from './guards/mujer.guard';

export const routes: Routes = [
  // Ruta inicial - redirige según autenticación
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Rutas públicas (solo para usuarios NO autenticados)
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage),
    canActivate: [NoAuthGuard]
  },

  // Ruta para selección de género (solo para usuarios sin género)
  {
    path: 'seleccion-genero',
    loadComponent: () => import('./seleccion-genero/seleccion-genero.page').then( m => m.SeleccionGeneroPage),
    canActivate: [GenderSelectionGuard]
  },

  // TABS ESPECÍFICOS POR GÉNERO
  {
    path: 'tabs-hombre',
    loadComponent: () => import('./tabs-hombre/tabs-hombre.page').then( m => m.TabsHombrePage),
    canActivate: [HombreGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./inicio-hombre/inicio-hombre.page').then( m => m.InicioHombrePage),
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('./estadisticas-hombre/estadisticas-hombre.page').then( m => m.EstadisticasHombrePage),
      },
      {
        path: 'test-diario',
        loadComponent: () => import('./test-diario-hombre/test-diario-hombre.page').then( m => m.TestDiarioHombrePage),
      },
      {
        path: 'bienestar',
        loadComponent: () => import('./bienestar/bienestar.page').then( m => m.BienestarPage),
      },
      {
        path: 'comunidad',
        loadComponent: () => import('./comunidad/comunidad.page').then( m => m.ComunidadPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs-mujer',
    loadComponent: () => import('./tabs-mujer/tabs-mujer.page').then( m => m.TabsMujerPage),
    canActivate: [MujerGuard],
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./inicio-mujer/inicio-mujer.page').then( m => m.InicioMujerPage),
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('./estadisticas-mujer/estadisticas-mujer.page').then( m => m.EstadisticasMujerPage),
      },
      {
        path: 'test-diario',
        loadComponent: () => import('./test-diario-mujer/test-diario-mujer.page').then( m => m.TestDiarioMujerPage),
      },
      {
        path: 'ciclo-menstrual',
        loadComponent: () => import('./ciclo-menstrual/ciclo-menstrual.page').then( m => m.CicloMenstrualPage),
      },
      {
        path: 'bienestar',
        loadComponent: () => import('./bienestar/bienestar.page').then( m => m.BienestarPage),
      },
      {
        path: 'comunidad',
        loadComponent: () => import('./comunidad/comunidad.page').then( m => m.ComunidadPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  },

  // Rutas principales con tabs (protegidas) - DEPRECATED, usar tabs específicos
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard]
  },

  // RUTAS ESPECÍFICAS PARA MUJERES (solo accesibles por mujeres)
  {
    path: 'inicio-mujer',
    loadComponent: () => import('./inicio-mujer/inicio-mujer.page').then( m => m.InicioMujerPage),
    canActivate: [MujerGuard]
  },
  {
    path: 'test-diario-mujer',
    loadComponent: () => import('./test-diario-mujer/test-diario-mujer.page').then( m => m.TestDiarioMujerPage),
    canActivate: [MujerGuard]
  },
  {
    path: 'ciclo-menstrual',
    loadComponent: () => import('./ciclo-menstrual/ciclo-menstrual.page').then( m => m.CicloMenstrualPage),
    canActivate: [MujerGuard]
  },
  {
    path: 'estadisticas-mujer',
    loadComponent: () => import('./estadisticas-mujer/estadisticas-mujer.page').then( m => m.EstadisticasMujerPage),
    canActivate: [MujerGuard]
  },

  // RUTAS ESPECÍFICAS PARA HOMBRES (solo accesibles por hombres)
  {
    path: 'inicio-hombre',
    loadComponent: () => import('./inicio-hombre/inicio-hombre.page').then( m => m.InicioHombrePage),
    canActivate: [HombreGuard]
  },
  {
    path: 'test-diario-hombre',
    loadComponent: () => import('./test-diario-hombre/test-diario-hombre.page').then( m => m.TestDiarioHombrePage),
    canActivate: [HombreGuard]
  },
  {
    path: 'estadisticas-hombre',
    loadComponent: () => import('./estadisticas-hombre/estadisticas-hombre.page').then( m => m.EstadisticasHombrePage),
    canActivate: [HombreGuard]
  },

  // RUTAS COMUNES (accesibles por ambos géneros pero requieren autenticación)
  {
    path: 'comunidad',
    loadComponent: () => import('./comunidad/comunidad.page').then( m => m.ComunidadPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'bienestar',
    loadComponent: () => import('./bienestar/bienestar.page').then( m => m.BienestarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'personalizacion',
    loadComponent: () => import('./personalizacion/personalizacion.page').then( m => m.PersonalizacionPage),
    canActivate: [AuthGuard]
  },

  // Ruta wildcard - redirige a login si no encuentra la ruta
  {
    path: '**',
    redirectTo: '/login'
  }
];
