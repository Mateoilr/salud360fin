import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ToastController,
  AlertController
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { NavigationService } from '../services/navigation.service';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  personOutline,
  createOutline,
  notificationsOutline,
  lockClosedOutline,
  informationCircleOutline,
  helpCircleOutline,
  shareOutline,
  starOutline,
  trophyOutline,
  flameOutline,
  fitnessOutline,
  heartOutline,
  cameraOutline,
  checkmarkCircle,
  settingsOutline,
  medalOutline,
  calendarOutline,
  locationOutline,
  mailOutline,
  callOutline,
  globeOutline
} from 'ionicons/icons';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  height: number;
  weight: number;
  location: string;
  phone: string;
  website?: string;
  bio: string;
  joinDate: Date;
  verified: boolean;
}

interface UserStats {
  level: string;
  points: number;
  streak: number;
  completedChallenges: number;
  totalWorkouts: number;
  avgSleep: number;
  avgSteps: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  dateEarned: Date;
  category: string;
}

interface ActivityData {
  date: string;
  steps: number;
  workouts: number;
  sleep: number;
  water: number;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,
  ]
})
export class PerfilPage implements OnInit {
  private navigationService = inject(NavigationService);

  selectedSegment: string = 'profile';
  isEditModalOpen: boolean = false;

  // Datos del usuario
  userProfile: UserProfile = {
    id: '1',
    name: 'Usuario Salud360',
    email: 'usuario@salud360.com',
    avatar: 'assets/avatars/default.jpg',
    dateOfBirth: '1990-01-01',
    gender: 'Masculino',
    height: 175,
    weight: 70,
    location: 'Ciudad, País',
    phone: '+123 456 789',
    website: '',
    bio: 'Apasionado por la vida saludable y el bienestar integral. Siempre en busca de nuevos desafíos.',
    joinDate: new Date('2024-01-15'),
    verified: false
  };

  // Estadísticas del usuario
  userStats: UserStats = {
    level: 'Guerrero de la Salud',
    points: 2450,
    streak: 15,
    completedChallenges: 8,
    totalWorkouts: 45,
    avgSleep: 7.5,
    avgSteps: 8200
  };

  // Logros del usuario
  achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primera Semana',
      description: 'Completa tu primera semana de actividad',
      icon: 'checkmarkCircle',
      color: 'success',
      dateEarned: new Date('2024-01-22'),
      category: 'Inicio'
    },
    {
      id: '2',
      title: 'Racha de Fuego',
      description: 'Mantén una racha de 7 días consecutivos',
      icon: 'flame',
      color: 'warning',
      dateEarned: new Date('2024-02-01'),
      category: 'Constancia'
    },
    {
      id: '3',
      title: 'Maestro del Ejercicio',
      description: 'Completa 25 entrenamientos',
      icon: 'fitness',
      color: 'primary',
      dateEarned: new Date('2024-02-15'),
      category: 'Ejercicio'
    },
    {
      id: '4',
      title: 'Corazón Saludable',
      description: 'Alcanza tu objetivo de cardio 10 veces',
      icon: 'heart',
      color: 'danger',
      dateEarned: new Date('2024-02-28'),
      category: 'Cardio'
    }
  ];

  // Datos de actividad reciente
  recentActivity: ActivityData[] = [
    { date: '2024-03-01', steps: 9500, workouts: 1, sleep: 8, water: 8 },
    { date: '2024-02-29', steps: 7800, workouts: 0, sleep: 7, water: 6 },
    { date: '2024-02-28', steps: 12000, workouts: 2, sleep: 7.5, water: 9 },
    { date: '2024-02-27', steps: 8600, workouts: 1, sleep: 8, water: 7 },
    { date: '2024-02-26', steps: 10200, workouts: 1, sleep: 6.5, water: 8 }
  ];

  // Datos temporales para edición
  editingProfile: Partial<UserProfile> = {};

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      logOutOutline,
      personOutline,
      createOutline,
      notificationsOutline,
      lockClosedOutline,
      informationCircleOutline,
      helpCircleOutline,
      shareOutline,
      starOutline,
      trophyOutline,
      flameOutline,
      fitnessOutline,
      heartOutline,
      cameraOutline,
      checkmarkCircle,
      settingsOutline,
      medalOutline,
      calendarOutline,
      locationOutline,
      mailOutline,
      callOutline,
      globeOutline
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Cargar datos del usuario desde localStorage o servicio
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      this.userProfile = { ...this.userProfile, ...userData };
    }
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  openEditModal() {
    this.editingProfile = { ...this.userProfile };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editingProfile = {};
  }

  async saveProfile() {
    if (this.editingProfile.name && this.editingProfile.email) {
      this.userProfile = { ...this.userProfile, ...this.editingProfile };

      // Guardar en localStorage
      localStorage.setItem('userData', JSON.stringify(this.userProfile));

      this.closeEditModal();
      await this.showToast('Perfil actualizado correctamente');
    } else {
      await this.showToast('Por favor completa todos los campos requeridos');
    }
  }

  async changeAvatar() {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Cambiar foto de perfil';
    actionSheet.buttons = [
      {
        text: 'Cámara',
        icon: 'camera',
        handler: () => {
          this.showToast('Función de cámara no disponible en esta demo');
        }
      },
      {
        text: 'Galería',
        icon: 'images',
        handler: () => {
          this.showToast('Función de galería no disponible en esta demo');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }
    ];

    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }

  calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(this.userProfile.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  calculateBMI(): number {
    const heightInMeters = this.userProfile.height / 100;
    return Math.round((this.userProfile.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidad';
  }

  getBMIColor(bmi: number): string {
    if (bmi < 18.5) return 'warning';
    if (bmi < 25) return 'success';
    if (bmi < 30) return 'warning';
    return 'danger';
  }

  getLevelProgress(): number {
    // Calcular progreso del nivel basado en puntos
    const pointsForNextLevel = 3000;
    return (this.userStats.points / pointsForNextLevel) * 100;
  }

  getAchievementsByCategory(category: string): Achievement[] {
    return this.achievements.filter(achievement => achievement.category === category);
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.achievements.map(achievement => achievement.category))];
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateShort(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric'
    });
  }

  getStreakMessage(): string {
    if (this.userStats.streak >= 30) return '¡Increíble constancia!';
    if (this.userStats.streak >= 14) return '¡Excelente racha!';
    if (this.userStats.streak >= 7) return '¡Muy bien!';
    return '¡Sigue así!';
  }

  async shareProfile() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi perfil en Salud360',
          text: `¡Mira mi progreso en Salud360! Nivel: ${this.userStats.level}, Puntos: ${this.userStats.points}`,
          url: window.location.href
        });
      } catch (error) {
        await this.showToast('Error al compartir');
      }
    } else {
      await this.showToast('Función de compartir no disponible');
    }
  }

  async exportData() {
    const alert = await this.alertController.create({
      header: 'Exportar Datos',
      message: '¿Qué datos te gustaría exportar?',
      buttons: [
        {
          text: 'Perfil',
          handler: () => {
            this.downloadData(this.userProfile, 'perfil.json');
          }
        },
        {
          text: 'Actividad',
          handler: () => {
            this.downloadData(this.recentActivity, 'actividad.json');
          }
        },
        {
          text: 'Logros',
          handler: () => {
            this.downloadData(this.achievements, 'logros.json');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  downloadData(data: any, filename: string) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    link.click();

    this.showToast(`Datos exportados: ${filename}`);
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Eliminar Cuenta',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmDeleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDeleteAccount() {
    // Aquí iría la lógica para eliminar la cuenta
    await this.showToast('Función no implementada en esta demo');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: async () => {
            await this.navigationService.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
