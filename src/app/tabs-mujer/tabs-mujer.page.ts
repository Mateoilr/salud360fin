import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { home, statsChart, heart, calendar, body, person, chatbubbles } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-mujer',
  templateUrl: './tabs-mujer.page.html',
  styleUrls: ['./tabs-mujer.page.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet]
})
export class TabsMujerPage implements OnInit {
  public tabs: Array<{ title: string; url: string; icon: string; tab: string }> = [];
  private router = inject(Router);

  constructor() {
    addIcons({ home, statsChart, heart, calendar, body, person, chatbubbles });
  }

  ngOnInit() {
    // Tabs específicos para MUJERES únicamente
    this.tabs = [
      { title: 'Inicio', url: '/tabs-mujer/inicio', icon: 'home', tab: 'inicio' },
      { title: 'Ciclo', url: '/tabs-mujer/ciclo-menstrual', icon: 'calendar', tab: 'ciclo-menstrual' },
      { title: 'Estadísticas', url: '/tabs-mujer/estadisticas', icon: 'stats-chart', tab: 'estadisticas' },
      { title: 'Test Diario', url: '/tabs-mujer/test-diario', icon: 'heart', tab: 'test-diario' },
      { title: 'Bienestar', url: '/tabs-mujer/bienestar', icon: 'body', tab: 'bienestar' },
      { title: 'Comunidad', url: '/tabs-mujer/comunidad', icon: 'chatbubbles', tab: 'comunidad' },
      { title: 'Perfil', url: '/tabs-mujer/perfil', icon: 'person', tab: 'perfil' }
    ];
  }

  navigateToTab(url: string) {
    this.router.navigate([url]);
  }
}
