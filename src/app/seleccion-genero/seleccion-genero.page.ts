import { ToastController, LoadingController } from '@ionic/angular';
import { IonContent, IonIcon, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { NavigationService } from '../services/navigation.service';
import { addIcons } from 'ionicons';
import { heart, flower, fitness, radioButtonOn, radioButtonOff } from 'ionicons/icons';

@Component({
  selector: 'app-seleccion-genero',
  templateUrl: './seleccion-genero.page.html',
  styleUrls: ['./seleccion-genero.page.scss'],
  standalone: true,
  imports: [IonSpinner, CommonModule, FormsModule, IonContent, IonIcon, IonButton]
})
export class SeleccionGeneroPage implements OnInit {
  selectedGender: string = '';
  isLoading: boolean = false;
  error: string = '';

  private userDataService = inject(UserDataService);
  private navigationService = inject(NavigationService);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private router = inject(Router);

  constructor() {
    addIcons({ heart, flower, fitness, radioButtonOn, radioButtonOff });
  }

  ngOnInit() {
    // El guard ya se encarga de verificar autenticación y género
    // Solo nos enfocamos en la lógica de la página
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.error = '';
  }

  async continuar() {
    if (!this.selectedGender) {
      this.error = 'Por favor selecciona una opción';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      // Mostrar loading
      const loading = await this.loadingController.create({
        message: 'Configurando tu perfil...',
        duration: 3000
      });
      await loading.present();

      // Guardar género en el perfil del usuario
      this.userDataService.setGender(this.selectedGender as 'hombre' | 'mujer');

      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: '¡Perfil configurado correctamente!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();

      // Redirigir según el género seleccionado
      this.navigationService.navigateAfterGenderSelection();

      await loading.dismiss();
    } catch (error: any) {
      console.error('Error al guardar género:', error);
      this.error = 'Error al configurar tu perfil. Inténtalo de nuevo.';

      const toast = await this.toastController.create({
        message: this.error,
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    } finally {
      this.isLoading = false;
    }
  }

  async skipForNow() {
    // Permitir omitir pero navegar a tabs sin género específico
    try {
      const toast = await this.toastController.create({
        message: 'Podrás configurar tu género más tarde en el perfil',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();

      // Navegar a tabs general
      await this.router.navigate(['/tabs'], { replaceUrl: true });
    } catch (error) {
      console.error('Error al omitir configuración:', error);
    }
  }
}

