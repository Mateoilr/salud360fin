import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonIcon, 
  IonButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, fitness, moon } from 'ionicons/icons';

@Component({
  selector: 'app-estadisticas-hombre',
  templateUrl: './estadisticas-hombre.page.html',
  styleUrls: ['./estadisticas-hombre.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonIcon, 
    IonButton,
    CommonModule, 
    FormsModule
  ]
})
export class EstadisticasHombrePage implements OnInit {

  constructor() { 
    addIcons({ heart, fitness, moon });
  }

  ngOnInit() {
  }

}
