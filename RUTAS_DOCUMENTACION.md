# Configuración de Rutas - Salud360

## Estructura de Rutas

### Rutas Públicas (sin autenticación)
- `/login` - Página de inicio de sesión
- `/registro` - Página de registro de nuevos usuarios

### Rutas Protegidas (requieren autenticación)

#### Flujo Principal
1. **Selección de Género**: `/seleccion-genero`
   - Primera página después del login/registro
   - Permite seleccionar entre hombre/mujer
   - Guarda la selección en localStorage

#### Rutas por Género

##### Para Hombres
- `/inicio-hombre` - Página principal para usuarios masculinos
- `/test-diario-hombre` - Test diario específico para hombres
- `/estadisticas-hombre` - Estadísticas de salud para hombres

##### Para Mujeres
- `/inicio-mujer` - Página principal para usuarios femeninos
- `/test-diario-mujer` - Test diario específico para mujeres
- `/estadisticas-mujer` - Estadísticas de salud para mujeres
- `/ciclo-menstrual` - Seguimiento del ciclo menstrual (solo mujeres)

#### Rutas Comunes
- `/comunidad` - Página de comunidad
- `/bienestar` - Consejos de bienestar
- `/perfil` - Perfil del usuario
- `/personalizacion` - Configuración personalizada

#### Navegación con Tabs
- `/app` - Aplicación principal con tabs
  - `/app/inicio` - Tab de inicio
  - `/app/estadisticas` - Tab de estadísticas
  - `/app/perfil` - Tab de perfil

## Guards (Protecciones)

### AuthGuard
- Verifica si el usuario está autenticado
- Si no está autenticado → redirige a `/login`
- Si está autenticado pero no ha seleccionado género → redirige a `/seleccion-genero`

### GenderGuard
- Verifica que el usuario acceda solo a rutas de su género seleccionado
- Si un hombre intenta acceder a rutas de mujer → redirige a `/inicio-hombre`
- Si una mujer intenta acceder a rutas de hombre → redirige a `/inicio-mujer`

## Servicios

### NavigationService
Métodos útiles para navegación:
- `navigateToHome()` - Va a la página de inicio según el género
- `navigateToStats()` - Va a estadísticas según el género
- `navigateToTest()` - Va al test diario según el género
- `navigateAfterLogin()` - Navegación después del login
- `navigateAfterGenderSelection()` - Navegación después de seleccionar género
- `logout()` - Cierra sesión y limpia datos

### AuthService
- `login()` - Iniciar sesión
- `register()` - Registrar usuario
- `logout()` - Cerrar sesión
- `getUser()` - Obtener usuario actual
- `isAuthenticated()` - Verificar si está autenticado
- `hasSelectedGender()` - Verificar si ha seleccionado género

## Flujo de Usuario

1. **Primera visita**: Usuario va a `/` → redirige a `/login`
2. **Login/Registro**: Usuario inicia sesión o se registra
3. **Selección de género**: Redirige a `/seleccion-genero`
4. **Página principal**: Después de seleccionar género, va a `/inicio-{genero}`
5. **Navegación protegida**: Todas las rutas están protegidas por género y autenticación

## Datos en localStorage

- `correo` - Email del usuario autenticado
- `genero` - Género seleccionado ('hombre' o 'mujer')

## Rutas de Fallback

- Ruta no encontrada (`**`) → redirige a `/login`
- Usuario sin autenticar → redirige a `/login`
- Usuario sin género seleccionado → redirige a `/seleccion-genero`
