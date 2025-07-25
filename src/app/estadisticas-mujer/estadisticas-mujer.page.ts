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
import { calendar, heart, fitness, moon } from 'ionicons/icons';

@Component({
  selector: 'app-estadisticas-mujer',
  templateUrl: './estadisticas-mujer.page.html',
  styleUrls: ['./estadisticas-mujer.page.scss'],
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
export class EstadisticasMujerPage implements OnInit {

  constructor() { 
    addIcons({ calendar, heart, fitness, moon });
  }

  ngOnInit() {
  }

}
