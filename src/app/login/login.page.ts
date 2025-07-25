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
  IonSpinner,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { UserDataService } from '../services/user-data.service';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { addIcons } from 'ionicons';
import {
  heart,
  mailOutline,
  lockClosedOutline,
  eye,
  eyeOff,
  alertCircle,
  logoGoogle
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonItem, IonInput, IonButton, IonIcon, IonLabel, IonSpinner,
    FormsModule, CommonModule
  ]
})
export class LoginPage {
  // Datos del formulario
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  // Errores de validación
  emailError: string = '';
  passwordError: string = '';
  generalError: string = '';

  // Servicios
  private userDataService = inject(UserDataService);
  private navigationService = inject(NavigationService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController);

  constructor() {
    // Registrar iconos
    addIcons({
      heart,
      mailOutline,
      lockClosedOutline,
      eye,
      eyeOff,
      alertCircle,
      logoGoogle
    });
  }

  // Validaciones
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

    return true;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async forgotPassword() {
    if (!this.email) {
      await this.showToast('Ingresa tu correo para recuperar la contraseña', 'warning');
      return;
    }

    try {
      const result = await this.authService.sendPasswordResetEmail(this.email);

      if (result.success) {
        await this.showToast('Se ha enviado un enlace de recuperación a tu correo', 'success');
      } else {
        await this.showToast(result.error || 'Error al enviar el correo de recuperación', 'danger');
      }
    } catch (error: any) {
      await this.showToast('Error al enviar el correo de recuperación', 'danger');
    }
  }

  async login() {
    // Limpiar errores previos
    this.generalError = '';

    // Validar campos
    const emailValid = this.validateEmail();
    const passwordValid = this.validatePassword();

    if (!emailValid || !passwordValid) {
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Usar AuthService para login (compatible con Firebase)
      const result = await this.authService.signIn(this.email, this.password);

      await loading.dismiss();

      if (result.success && result.user) {
        // Login exitoso
        this.userDataService.setUserData({
          email: result.user.email,
          displayName: result.user.displayName,
          gender: localStorage.getItem('genero') as 'hombre' | 'mujer' | null
        });

        await this.showToast('¡Bienvenido de vuelta!', 'success');
        this.navigationService.navigateAfterLogin();
      } else {
        // Error en login
        this.generalError = result.error || 'Error al iniciar sesión';
        await this.showToast(this.generalError, 'danger');
      }

    } catch (error: any) {
      await loading.dismiss();
      this.generalError = 'Error al iniciar sesión. Inténtalo de nuevo.';
      await this.showToast(this.generalError, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Conectando con Google...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      // Implementar login con Google
      // const result = await this.authService.signInWithGoogle();
      await loading.dismiss();
      await this.showToast('Login con Google no implementado aún', 'warning');
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast('Error al conectar con Google', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet';
      default:
        return 'Error al iniciar sesión. Intenta nuevamente';
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
