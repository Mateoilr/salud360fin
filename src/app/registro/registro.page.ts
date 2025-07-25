import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonCheckbox,
  IonSpinner,
  LoadingController,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';
import { UserDataService } from '../services/user-data.service';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  heart,
  personOutline,
  mailOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  eye,
  eyeOff,
  alertCircle,
  logoGoogle
} from 'ionicons/icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonItem, IonInput, IonButton, IonIcon, IonLabel, IonCheckbox, IonSpinner,
    FormsModule, CommonModule
  ]
})
export class RegistroPage {
  // Datos del formulario
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;

  // Errores de validación
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  termsError: string = '';
  generalError: string = '';

  // Servicios
  private userDataService = inject(UserDataService);
  private navigationService = inject(NavigationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);
  private alertController = inject(AlertController);

  constructor() {
    // Registrar iconos
    addIcons({
      heart,
      personOutline,
      mailOutline,
      lockClosedOutline,
      shieldCheckmarkOutline,
      eye,
      eyeOff,
      alertCircle,
      logoGoogle
    });
  }

  // Validaciones
  validateName() {
    this.nameError = '';
    if (!this.name.trim()) {
      this.nameError = 'El nombre es requerido';
      return false;
    }

    if (this.name.trim().length < 2) {
      this.nameError = 'El nombre debe tener al menos 2 caracteres';
      return false;
    }

    return true;
  }

  validateEmail() {
    this.emailError = '';
    if (!this.email) {
      this.emailError = 'El correo es requerido';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Ingresa un correo válido';
      return false;
    }

    return true;
  }

  validatePassword() {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'La contraseña es requerida';
      return false;
    }

    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    // Validar que tenga al menos una letra y un número
    const hasLetter = /[a-zA-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);

    if (!hasLetter || !hasNumber) {
      this.passwordError = 'La contraseña debe contener al menos una letra y un número';
      return false;
    }

    return true;
  }

  validateConfirmPassword() {
    this.confirmPasswordError = '';
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Confirma tu contraseña';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Las contraseñas no coinciden';
      return false;
    }

    return true;
  }

  validateTerms() {
    this.termsError = '';
    if (!this.acceptTerms) {
      this.termsError = 'Debes aceptar los términos y condiciones';
      return false;
    }

    return true;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async openTerms() {
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: 'Aquí irían los términos y condiciones de uso de la aplicación...',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async openPrivacy() {
    const alert = await this.alertController.create({
      header: 'Política de Privacidad',
      message: 'Aquí iría la política de privacidad de la aplicación...',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async register() {
    // Limpiar errores previos
    this.generalError = '';

    // Validar todos los campos
    const nameValid = this.validateName();
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();
    const confirmPasswordValid = this.validateConfirmPassword();
    const termsValid = this.validateTerms();

    if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid || !termsValid) {
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Creando tu cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Usar AuthService para registro (compatible con Firebase)
      const result = await this.authService.signUp(this.email, this.password, this.name);

      await loading.dismiss();

      if (result.success && result.user) {
        // Registro exitoso
        this.userDataService.setUserData({
          email: result.user.email,
          displayName: result.user.displayName,
          gender: null
        });

        await this.showToast('¡Cuenta creada exitosamente!', 'success');

        // Navegar a selección de género
        await this.router.navigate(['/seleccion-genero'], { replaceUrl: true });
      } else {
        // Error en registro
        this.generalError = result.error || 'Error al crear la cuenta';
        await this.showToast(this.generalError, 'danger');
      }

    } catch (error: any) {
      await loading.dismiss();
      this.generalError = 'Error al crear la cuenta. Intenta nuevamente';
      await this.showToast(this.generalError, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async registerWithGoogle() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Conectando con Google...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Implementar registro con Google
      // const result = await this.authService.signUpWithGoogle();
      await loading.dismiss();
      await this.showToast('Registro con Google no implementado aún', 'warning');
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast('Error al conectar con Google', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este correo electrónico';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido';
      case 'auth/operation-not-allowed':
        return 'El registro está temporalmente deshabilitado';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet';
      default:
        return 'Error al crear la cuenta. Intenta nuevamente';
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
