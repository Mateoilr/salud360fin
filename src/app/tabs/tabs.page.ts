import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, library, playCircle, search, heart } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule]
})
export class TabsPage implements OnInit {
  public tabs: Array<{ title: string; url: string; icon: string }> = [];
  private router = inject(Router);

  constructor() {
    addIcons({ home, library, playCircle, search, heart });
  }

  ngOnInit() {
    const genero = localStorage.getItem('genero');
    if (genero === 'mujer') {
      this.tabs = [
        { title: 'Inicio', url: '/inicio-mujer', icon: 'home' },
        { title: 'Ciclo', url: '/ciclo-menstrual', icon: 'calendar' },
        { title: 'Estadísticas', url: '/estadisticas-mujer', icon: 'stats-chart' },
        { title: 'Bienestar', url: '/bienestar', icon: 'body' },
        { title: 'Perfil', url: '/perfil', icon: 'person' },
      ];
    } else if (genero === 'hombre') {
      this.tabs = [
        { title: 'Inicio', url: '/inicio-hombre', icon: 'home' },
        { title: 'Estadísticas', url: '/estadisticas-hombre', icon: 'stats-chart' },
        { title: 'Bienestar', url: '/bienestar', icon: 'body' },
        { title: 'Comunidad', url: '/comunidad', icon: 'chatbubbles' },
        { title: 'Perfil', url: '/perfil', icon: 'person' },
      ];
    } else {
      // Si no hay género seleccionado, redirigir a selección de género
      this.router.navigate(['/seleccion-genero']);
    }
  }

  navigateToTab(url: string) {
    this.router.navigate([url]);
  }
}
