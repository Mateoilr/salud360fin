import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonFab, 
  IonFabButton, 
  IonFabList,
  AlertController,
  ToastController,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  leafOutline, 
  settingsOutline, 
  water, 
  moon, 
  walk, 
  flower, 
  playCircle, 
  add, 
  fitness,
  heart,
  restaurant,
  book,
  musicalNotes,
  bicycle
} from 'ionicons/icons';

// Interfaces
interface WellnessGoal {
  id: string;
  title: string;
  icon: string;
  color: string;
  current: number;
  target: number;
  unit: string;
}

interface RecommendedActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
  category: string;
}

@Component({
  selector: 'app-bienestar',
  templateUrl: './bienestar.page.html',
  styleUrls: ['./bienestar.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonButton, 
    IonIcon, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardContent, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonFab, 
    IonFabButton, 
    IonFabList,
    CommonModule, 
    FormsModule
  ]
})
export class BienestarPage implements OnInit {
  @ViewChild('wellnessChart', { static: false }) chartCanvas!: ElementRef;

  // Datos del usuario
  motivationalMessage: string = '';
  waterIntake: number = 4;
  sleepHours: number = 7.5;
  sleepQuality: string = 'Buena';
  sleepQualityClass: string = 'good';
  steps: number = 7420;
  meditationMinutes: number = 15;
  meditationStreak: number = 5;
  selectedPeriod: string = 'week';

  // Objetivos de bienestar
  wellnessGoals: WellnessGoal[] = [
    {
      id: '1',
      title: 'Hidratación',
      icon: 'water',
      color: 'primary',
      current: 4,
      target: 8,
      unit: 'vasos'
    },
    {
      id: '2',
      title: 'Ejercicio',
      icon: 'fitness',
      color: 'success',
      current: 3,
      target: 5,
      unit: 'días/semana'
    },
    {
      id: '3',
      title: 'Meditación',
      icon: 'flower',
      color: 'warning',
      current: 15,
      target: 30,
      unit: 'min/día'
    },
    {
      id: '4',
      title: 'Sueño',
      icon: 'moon',
      color: 'secondary',
      current: 7,
      target: 8,
      unit: 'horas'
    }
  ];

  // Actividades recomendadas
  recommendedActivities: RecommendedActivity[] = [
    {
      id: '1',
      title: 'Meditación Matutina',
      description: 'Comienza el día con 10 minutos de mindfulness',
      icon: 'flower',
      color: 'warning',
      duration: '10 min',
      difficulty: 'fácil',
      category: 'mental'
    },
    {
      id: '2',
      title: 'Caminata Energética',
      description: 'Actividad cardiovascular suave para despertar el cuerpo',
      icon: 'walk',
      color: 'success',
      duration: '20 min',
      difficulty: 'fácil',
      category: 'física'
    },
    {
      id: '3',
      title: 'Yoga para Relajación',
      description: 'Secuencia de posturas para liberar tensión',
      icon: 'heart',
      color: 'tertiary',
      duration: '30 min',
      difficulty: 'medio',
      category: 'física'
    },
    {
      id: '4',
      title: 'Respiración Profunda',
      description: 'Técnica de respiración para reducir estrés',
      icon: 'flower',
      color: 'secondary',
      duration: '5 min',
      difficulty: 'fácil',
      category: 'mental'
    }
  ];

  private motivationalMessages: string[] = [
    "Cada pequeño paso cuenta hacia tu bienestar total",
    "Tu salud es tu mayor riqueza, cuídala cada día",
    "El bienestar no es un destino, es un estilo de vida",
    "Hoy es un buen día para cuidar de ti mismo",
    "Tu cuerpo y mente te agradecerán cada decisión saludable"
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    addIcons({ 
      leafOutline, 
      settingsOutline, 
      water, 
      moon, 
      walk, 
      flower, 
      playCircle, 
      add, 
      fitness,
      heart,
      restaurant,
      book,
      musicalNotes,
      bicycle
    });
  }

  ngOnInit() {
    this.loadMotivationalMessage();
    this.loadUserData();
    this.updateSleepQuality();
  }

  private loadMotivationalMessage() {
    const randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
    this.motivationalMessage = this.motivationalMessages[randomIndex];
  }

  private loadUserData() {
    // Aquí cargarías los datos reales del usuario desde un servicio
    // Por ahora usamos datos de ejemplo
    const savedData = localStorage.getItem('bienestarData');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.waterIntake = data.waterIntake || 4;
      this.steps = data.steps || 7420;
      this.meditationMinutes = data.meditationMinutes || 15;
      this.meditationStreak = data.meditationStreak || 5;
    }
  }

  private saveUserData() {
    const data = {
      waterIntake: this.waterIntake,
      steps: this.steps,
      meditationMinutes: this.meditationMinutes,
      meditationStreak: this.meditationStreak
    };
    localStorage.setItem('bienestarData', JSON.stringify(data));
  }

  private updateSleepQuality() {
    if (this.sleepHours >= 8) {
      this.sleepQuality = 'Excelente';
      this.sleepQualityClass = 'excellent';
    } else if (this.sleepHours >= 7) {
      this.sleepQuality = 'Buena';
      this.sleepQualityClass = 'good';
    } else if (this.sleepHours >= 6) {
      this.sleepQuality = 'Regular';
      this.sleepQualityClass = 'regular';
    } else {
      this.sleepQuality = 'Insuficiente';
      this.sleepQualityClass = 'poor';
    }
  }

  getGoalPercentage(goal: WellnessGoal): number {
    return Math.min((goal.current / goal.target) * 100, 100);
  }

  async openSettings() {
    const alert = await this.alertController.create({
      header: 'Configuración de Bienestar',
      message: 'Próximamente podrás personalizar tus objetivos y preferencias',
      buttons: ['OK']
    });
    await alert.present();
  }

  async openWaterTracker() {
    const alert = await this.alertController.create({
      header: 'Registro de Hidratación',
      message: `Has tomado ${this.waterIntake} vasos de agua hoy`,
      buttons: [
        {
          text: 'Agregar Vaso',
          handler: () => {
            this.logWater();
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async openSleepTracker() {
    const alert = await this.alertController.create({
      header: 'Registro de Sueño',
      inputs: [
        {
          name: 'hours',
          type: 'number',
          placeholder: 'Horas de sueño',
          value: this.sleepHours
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.hours > 0 && data.hours <= 12) {
              this.sleepHours = parseFloat(data.hours);
              this.updateSleepQuality();
              this.saveUserData();
              this.showToast('Horas de sueño actualizadas');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async openStepsTracker() {
    const alert = await this.alertController.create({
      header: 'Registro de Pasos',
      message: `Has caminado ${this.steps.toLocaleString()} pasos hoy`,
      buttons: [
        {
          text: 'Sincronizar Dispositivo',
          handler: () => {
            this.showToast('Función disponible próximamente');
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async openMindfulness() {
    const alert = await this.alertController.create({
      header: 'Mindfulness',
      message: `Has meditado ${this.meditationMinutes} minutos hoy`,
      buttons: [
        {
          text: 'Comenzar Sesión',
          handler: () => {
            this.startMeditationSession();
          }
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  startActivity(activity: RecommendedActivity) {
    this.showToast(`Iniciando: ${activity.title}`);
    // Aquí implementarías la lógica específica para cada actividad
  }

  editGoals() {
    this.showToast('Editor de objetivos disponible próximamente');
  }

  updateChart() {
    // Aquí implementarías la actualización del gráfico según el período seleccionado
    this.showToast(`Mostrando datos del período: ${this.selectedPeriod}`);
  }

  quickAddActivity() {
    this.showToast('Selecciona una actividad para registrar');
  }

  async logWater() {
    if (this.waterIntake < 12) {
      this.waterIntake++;
      this.saveUserData();
      await this.showToast('¡Vaso de agua registrado! 💧');
    } else {
      await this.showToast('¡Excelente hidratación hoy! 🎉');
    }
  }

  async logExercise() {
    const alert = await this.alertController.create({
      header: 'Registro de Ejercicio',
      inputs: [
        {
          name: 'type',
          type: 'text',
          placeholder: 'Tipo de ejercicio'
        },
        {
          name: 'duration',
          type: 'number',
          placeholder: 'Duración (minutos)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Registrar',
          handler: (data) => {
            if (data.type && data.duration) {
              this.showToast(`Ejercicio registrado: ${data.type} por ${data.duration} min`);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async logMeditation() {
    const alert = await this.alertController.create({
      header: 'Registro de Meditación',
      inputs: [
        {
          name: 'minutes',
          type: 'number',
          placeholder: 'Minutos meditados',
          min: 1,
          max: 120
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Registrar',
          handler: (data) => {
            if (data.minutes > 0) {
              this.meditationMinutes += parseInt(data.minutes);
              this.saveUserData();
              this.showToast(`¡${data.minutes} minutos de meditación registrados! 🧘‍♀️`);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private async startMeditationSession() {
    const alert = await this.alertController.create({
      header: 'Sesión de Meditación',
      message: 'Elige la duración de tu sesión',
      buttons: [
        {
          text: '5 minutos',
          handler: () => {
            this.runMeditationSession(5);
          }
        },
        {
          text: '10 minutos',
          handler: () => {
            this.runMeditationSession(10);
          }
        },
        {
          text: '15 minutos',
          handler: () => {
            this.runMeditationSession(15);
          }
        }
      ]
    });
    await alert.present();
  }

  private async runMeditationSession(minutes: number) {
    this.showToast(`Iniciando sesión de ${minutes} minutos. ¡Respira profundo! 🌸`);
    // Aquí implementarías un timer real y funcionalidad de meditación guiada
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
