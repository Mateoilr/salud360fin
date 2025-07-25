import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, statsChart, fitness, body, chatbubbles, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-hombre',
  templateUrl: './tabs-hombre.page.html',
  styleUrls: ['./tabs-hombre.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet]
})
export class TabsHombrePage implements OnInit {
  public tabs: Array<{ title: string; url: string; icon: string; tab: string }> = [];
  private router = inject(Router);

  constructor() {
    addIcons({ home, statsChart, fitness, body, chatbubbles, person });
  }

  ngOnInit() {
    // Tabs específicos para HOMBRES únicamente
    this.tabs = [
      { title: 'Inicio', url: '/tabs-hombre/inicio', icon: 'home', tab: 'inicio' },
      { title: 'Estadísticas', url: '/tabs-hombre/estadisticas', icon: 'stats-chart', tab: 'estadisticas' },
      { title: 'Test Diario', url: '/tabs-hombre/test-diario', icon: 'fitness', tab: 'test-diario' },
      { title: 'Bienestar', url: '/tabs-hombre/bienestar', icon: 'body', tab: 'bienestar' },
      { title: 'Comunidad', url: '/tabs-hombre/comunidad', icon: 'chatbubbles', tab: 'comunidad' },
      { title: 'Perfil', url: '/tabs-hombre/perfil', icon: 'person', tab: 'perfil' },
    ];
  }

  navigateToTab(url: string) {
    this.router.navigate([url]);
  }
}
