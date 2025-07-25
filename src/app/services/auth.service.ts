import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  updateProfile,
  Auth,
  User as FirebaseUser
} from 'firebase/auth';
import { firebaseConfig } from '../../environments/firebase.config';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified?: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth: Auth = getAuth(this.app);

  constructor() { }

  /**
   * Registra un nuevo usuario con Firebase Authentication
   */
  async signUp(email: string, password: string, displayName?: string): Promise<AuthResult> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      const user: User = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || displayName,
        emailVerified: userCredential.user.emailVerified
      };

      return {
        success: true,
        user: user
      };

    } catch (error: any) {
      return {
        success: false,
        error: this.getFirebaseErrorMessage(error.code)
      };
    }
  }

  /**
   * Inicia sesión con Firebase Authentication
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      const user: User = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || undefined,
        emailVerified: userCredential.user.emailVerified
      };

      return {
        success: true,
        user: user
      };

    } catch (error: any) {
      return {
        success: false,
        error: this.getFirebaseErrorMessage(error.code)
      };
    }
  }

  /**
   * Cierra la sesión actual
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(this.auth);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  /**
   * Obtiene el usuario actual de Firebase
   */
  getCurrentUser(): User | null {
    const firebaseUser = this.auth.currentUser;
    if (firebaseUser) {
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || undefined,
        emailVerified: firebaseUser.emailVerified
      };
    }
    return null;
  }

  /**
   * Verifica si hay un usuario autenticado
   */
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  /**
   * Envía email de recuperación de contraseña
   */
  async sendPasswordResetEmail(email: string): Promise<AuthResult> {
    try {
      await firebaseSendPasswordResetEmail(this.auth, email);
      return {
        success: true
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getFirebaseErrorMessage(error.code)
      };
    }
  }

  /**
   * Obtiene todos los usuarios registrados (no disponible en Firebase por seguridad)
   */
  getAllRegisteredEmails(): string[] {
    // En Firebase esto no es posible por seguridad
    // Los emails de usuarios no son accesibles desde el cliente
    return [];
  }

  /**
   * Maneja los códigos de error de Firebase
   */
  private getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con este correo';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu internet';
      case 'auth/invalid-credential':
        return 'Credenciales inválidas';
      default:
        return 'Error de autenticación: ' + errorCode;
    }
  }
}
