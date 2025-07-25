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
  IonItem,
  IonLabel,
  IonCheckbox
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  notificationsOutline,
  heart,
  fitness,
  clipboard,
  happy,
  bulb,
  trophy
} from 'ionicons/icons';

interface DailyGoal {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-inicio-hombre',
  templateUrl: './inicio-hombre.page.html',
  styleUrls: ['./inicio-hombre.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar,
    IonItem, IonLabel, IonCheckbox, CommonModule, FormsModule
  ]
})
export class InicioHombrePage implements OnInit {
  private router = inject(Router);

  // Estados de bienestar
  emotionalState: number = 7;
  physicalEnergy: number = 8;
  stressLevel: number = 4;

  // Actividad física
  workoutMinutes: number = 45;
  caloriesBurned: number = 320;
  steps: number = 8542;

  // Objetivos diarios
  dailyGoals: DailyGoal[] = [
    {
      id: 1,
      title: 'Hacer ejercicio',
      description: '30 minutos de actividad física',
      completed: true
    },
    {
      id: 2,
      title: 'Meditar',
      description: '10 minutos de meditación',
      completed: false
    },
    {
      id: 3,
      title: 'Beber agua',
      description: '2 litros de agua al día',
      completed: false
    }
  ];

  constructor() {
    // Registrar iconos
    addIcons({
      notificationsOutline,
      heart,
      fitness,
      clipboard,
      happy,
      bulb,
      trophy
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    // Cargar datos del usuario desde localStorage o servicio
    // Por ahora usamos datos de ejemplo
  }

  getEmotionalDescription(): string {
    if (this.emotionalState >= 8) return 'Excelente';
    if (this.emotionalState >= 6) return 'Bueno';
    if (this.emotionalState >= 4) return 'Regular';
    if (this.emotionalState >= 2) return 'Bajo';
    return 'Muy bajo';
  }

  getEnergyDescription(): string {
    if (this.physicalEnergy >= 8) return 'Alta';
    if (this.physicalEnergy >= 6) return 'Buena';
    if (this.physicalEnergy >= 4) return 'Regular';
    if (this.physicalEnergy >= 2) return 'Baja';
    return 'Muy baja';
  }

  getStressDescription(): string {
    if (this.stressLevel >= 8) return 'Muy alto';
    if (this.stressLevel >= 6) return 'Alto';
    if (this.stressLevel >= 4) return 'Moderado';
    if (this.stressLevel >= 2) return 'Bajo';
    return 'Muy bajo';
  }

  // Métodos de navegación y acciones
  openNotifications() {
    console.log('Abrir notificaciones');
  }

  updateWellness() {
    console.log('Actualizar bienestar');
  }

  logWorkout() {
    console.log('Registrar entrenamiento');
  }

  openDailyTest() {
    this.router.navigate(['/test-diario-hombre']);
  }

  checkMood() {
    console.log('Verificar estado de ánimo');
  }

  viewTips() {
    this.router.navigate(['/bienestar']);
  }

  toggleGoal(goal: DailyGoal) {
    goal.completed = !goal.completed;
    // Aquí se podría guardar en el servidor o localStorage
  }
}
