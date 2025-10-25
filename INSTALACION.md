# 🚀 Guía Rápida de Instalación

## Paso 1: Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** versión 16 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** (viene con Node.js)

Verifica tu instalación:
```bash
node --version
npm --version
```

## Paso 2: Clonar o Descargar el Proyecto

Si tienes Git:
```bash
git clone https://github.com/tu-usuario/disc-leadership-test.git
cd disc-leadership-test
```

O simplemente descomprime el archivo ZIP del proyecto.

## Paso 3: Instalar Dependencias

Ejecuta este comando en la raíz del proyecto:
```bash
npm run install-all
```

Esto instalará todas las dependencias del backend y frontend automáticamente.

## Paso 4: Configurar Variables de Entorno

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus datos:

### Para Gmail:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion
```

### ⚠️ Importante para Gmail:
1. Ve a tu cuenta de Google
2. Activa la **verificación en 2 pasos**
3. Ve a https://myaccount.google.com/apppasswords
4. Genera una "Contraseña de aplicación"
5. Copia esa contraseña (16 caracteres) en `EMAIL_PASS`

### Para otros proveedores:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=tu-email@outlook.com
EMAIL_PASS=tu-contraseña
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=tu-email@yahoo.com
EMAIL_PASS=tu-contraseña-de-aplicacion
```

## Paso 5: Iniciar la Aplicación

### En Desarrollo (recomendado para probar):
```bash
npm run dev
```

Esto iniciará:
- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

Abre tu navegador en http://localhost:5173

### En Producción:
```bash
# Construir el frontend
npm run build

# Iniciar servidor
npm start
```

## 🎯 Paso 6: Probar la Aplicación

1. Abre http://localhost:5173
2. Haz clic en "Registrarme"
3. Completa el formulario
4. Revisa tu email (y carpeta de spam)
5. Copia el código que recibiste
6. Regresa a la app e inicia el test

## 🔐 Acceso de Administrador

Código maestro: `mastereymon63`

1. En la página principal, ingresa el código en "Iniciar Test"
2. Te redirigirá al panel de administración
3. Podrás ver estadísticas y exportar resultados

## ❓ Solución de Problemas

### Error de Email
Si no puedes enviar emails en desarrollo, la app mostrará el código en la consola del navegador (modo desarrollo).

### Error de Puerto en Uso
Si el puerto 3000 o 5173 están ocupados:
```bash
# Cambiar puerto del backend en .env
PORT=3001

# El frontend se ajustará automáticamente
```

### Error al Instalar Dependencias
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar
rm -rf node_modules
rm -rf client/node_modules
npm run install-all
```

### Base de Datos
La base de datos SQLite se crea automáticamente en `database.db` al iniciar por primera vez.

## 📱 Acceso desde Otro Dispositivo

1. Encuentra tu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` o `ip addr`

2. Actualiza `.env`:
```env
FRONTEND_URL=http://TU-IP-LOCAL:5173
```

3. Accede desde otro dispositivo:
   - Frontend: http://TU-IP-LOCAL:5173
   - Backend: http://TU-IP-LOCAL:3000

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando. Si tienes problemas, revisa los logs en la terminal.

## 📞 Soporte

Si encuentras algún error:
1. Revisa los logs en la terminal
2. Verifica que todas las dependencias se instalaron correctamente
3. Asegúrate de que los puertos 3000 y 5173 estén disponibles
4. Revisa la configuración de email en `.env`
