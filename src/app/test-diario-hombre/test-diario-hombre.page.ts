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
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-test-diario-hombre',
  templateUrl: './test-diario-hombre.page.html',
  styleUrls: ['./test-diario-hombre.page.scss'],
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
    IonButton,
    CommonModule, 
    FormsModule
  ]
})
export class TestDiarioHombrePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
