import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonProgressBar,
  IonRange,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  calendar,
  batteryCharging,
  clipboard,
  medical,
  bulb,
  alarm
} from 'ionicons/icons';

interface Reminder {
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-inicio-mujer',
  templateUrl: './inicio-mujer.page.html',
  styleUrls: ['./inicio-mujer.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar,
    IonRange, IonItem, IonLabel, CommonModule, FormsModule
  ]
})
export class InicioMujerPage implements OnInit {
  private router = inject(Router);

  // Datos del ciclo menstrual
  currentCycleDay: number = 14;
  currentPhase: string = 'Fase Ovulatoria';
  cycleProgress: number = 0.5;

  // Nivel de energía
  energyLevel: number = 75;

  // Recordatorios
  reminders: Reminder[] = [
    {
      title: 'Tomar vitaminas',
      description: 'Recuerda tomar tu suplemento diario',
      icon: 'medical',
      color: 'success'
    },
    {
      title: 'Ejercicio programado',
      description: 'Yoga a las 6:00 PM',
      icon: 'body',
      color: 'primary'
    }
  ];

  constructor() {
    // Registrar iconos
    addIcons({
      notificationsOutline,
      calendar,
      batteryCharging,
      clipboard,
      medical,
      bulb,
      alarm
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    // Cargar datos del usuario desde localStorage o servicio
    // Por ahora usamos datos de ejemplo
    this.calculateCycleInfo();
  }

  private calculateCycleInfo() {
    // Lógica para calcular la fase actual del ciclo
    if (this.currentCycleDay <= 5) {
      this.currentPhase = 'Fase Menstrual';
    } else if (this.currentCycleDay <= 13) {
      this.currentPhase = 'Fase Folicular';
    } else if (this.currentCycleDay <= 16) {
      this.currentPhase = 'Fase Ovulatoria';
    } else {
      this.currentPhase = 'Fase Lútea';
    }

    this.cycleProgress = this.currentCycleDay / 28;
  }

  getEnergyDescription(): string {
    if (this.energyLevel >= 80) return 'Excelente';
    if (this.energyLevel >= 60) return 'Buena';
    if (this.energyLevel >= 40) return 'Regular';
    if (this.energyLevel >= 20) return 'Baja';
    return 'Muy baja';
  }

  // Métodos de navegación
  openNotifications() {
    // Implementar notificaciones
    console.log('Abrir notificaciones');
  }

  openCycleDetails() {
    this.router.navigate(['/ciclo-menstrual']);
  }

  updateEnergy() {
    // Implementar actualización de energía
    console.log('Actualizar energía');
  }

  openDailyTest() {
    this.router.navigate(['/test-diario-mujer']);
  }

  logSymptom() {
    // Implementar registro de síntomas
    console.log('Registrar síntoma');
  }

  viewTips() {
    this.router.navigate(['/bienestar']);
  }
}
