# 🌐 Guía de Despliegue a Producción

Esta guía te ayudará a desplegar la aplicación en diferentes plataformas.

## Opción 1: Heroku (Recomendado - Fácil)

### Requisitos:
- Cuenta en [Heroku](https://heroku.com)
- Heroku CLI instalado

### Pasos:

1. **Instalar Heroku CLI:**
```bash
# Mac
brew tap heroku/brew && brew install heroku

# Windows/Linux
# Descargar desde https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login y crear app:**
```bash
heroku login
heroku create mi-test-disc
```

3. **Configurar variables de entorno:**
```bash
heroku config:set NODE_ENV=production
heroku config:set EMAIL_HOST=smtp.gmail.com
heroku config:set EMAIL_PORT=587
heroku config:set EMAIL_USER=tu-email@gmail.com
heroku config:set EMAIL_PASS=tu-contraseña-de-aplicacion
heroku config:set FRONTEND_URL=https://mi-test-disc.herokuapp.com
heroku config:set MASTER_CODE=mastereymon63
```

4. **Desplegar:**
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

5. **Abrir app:**
```bash
heroku open
```

## Opción 2: Render (Gratis)

### Pasos:

1. **Crear cuenta en [Render](https://render.com)**

2. **Conectar repositorio de GitHub**

3. **Crear Web Service:**
   - Build Command: `npm run install-all && npm run build`
   - Start Command: `npm start`

4. **Agregar variables de entorno:**
   - `NODE_ENV`: production
   - `EMAIL_HOST`: smtp.gmail.com
   - `EMAIL_PORT`: 587
   - `EMAIL_USER`: tu-email@gmail.com
   - `EMAIL_PASS`: tu-contraseña-de-aplicacion
   - `FRONTEND_URL`: https://tu-app.onrender.com
   - `MASTER_CODE`: mastereymon63

5. **Deploy automático** se activará

## Opción 3: Railway

### Pasos:

1. **Crear cuenta en [Railway](https://railway.app)**

2. **New Project → Deploy from GitHub**

3. **Configurar variables:**
   - Mismas que en Heroku/Render

4. **Deploy automático**

## Opción 4: VPS (DigitalOcean, AWS, etc.)

### Requisitos:
- Servidor con Ubuntu 20.04+
- Dominio (opcional)

### Pasos:

1. **Conectar al servidor:**
```bash
ssh root@tu-servidor-ip
```

2. **Instalar Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Instalar PM2:**
```bash
sudo npm install -g pm2
```

4. **Clonar proyecto:**
```bash
cd /var/www
git clone https://github.com/tu-usuario/disc-leadership-test.git
cd disc-leadership-test
```

5. **Instalar dependencias:**
```bash
npm run install-all
```

6. **Configurar .env:**
```bash
nano .env
# Pega tu configuración
```

7. **Build frontend:**
```bash
npm run build
```

8. **Iniciar con PM2:**
```bash
NODE_ENV=production pm2 start server/index.js --name "disc-test"
pm2 save
pm2 startup
```

9. **Configurar Nginx:**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/disc-test
```

Contenido:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/disc-test /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **SSL con Let's Encrypt (opcional):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

## Opción 5: Vercel (Solo Frontend)

Si quieres frontend en Vercel y backend separado:

1. **Deploy backend en Heroku/Render**

2. **Deploy frontend en Vercel:**
```bash
cd client
vercel
```

3. **Configurar variable de entorno en Vercel:**
   - `VITE_API_URL`: URL de tu backend

## 📝 Checklist Pre-Despliegue

- [ ] Todas las dependencias instaladas
- [ ] Variables de entorno configuradas
- [ ] Frontend construido (`npm run build`)
- [ ] Email funcionando
- [ ] Base de datos inicializada
- [ ] Código maestro configurado
- [ ] Dominio apuntando al servidor (si aplica)
- [ ] SSL configurado (si aplica)

## 🔒 Seguridad en Producción

1. **Cambiar código maestro:**
```env
MASTER_CODE=tu-codigo-super-secreto-y-largo
```

2. **Usar contraseñas fuertes para email**

3. **Habilitar HTTPS siempre**

4. **Configurar CORS apropiadamente**

5. **Backup de base de datos regular:**
```bash
# Crear backup
cp database.db database-backup-$(date +%Y%m%d).db

# Automatizar con cron
crontab -e
# Agregar: 0 2 * * * cp /var/www/disc-leadership-test/database.db /backups/db-$(date +\%Y\%m\%d).db
```

## 📊 Monitoreo

### Con PM2:
```bash
pm2 logs disc-test
pm2 monit
```

### Con Heroku:
```bash
heroku logs --tail
```

## 🚀 Actualizar la App

### Heroku:
```bash
git add .
git commit -m "Update"
git push heroku main
```

### VPS con PM2:
```bash
cd /var/www/disc-leadership-test
git pull
npm run install-all
npm run build
pm2 restart disc-test
```

## ❓ Problemas Comunes

### App no inicia
- Verifica que NODE_ENV=production
- Revisa logs del servidor
- Asegúrate de que el puerto no esté ocupado

### Emails no se envían
- Verifica credenciales de email
- Revisa que EMAIL_HOST y EMAIL_PORT sean correctos
- Para Gmail, usa contraseña de aplicación

### Frontend muestra página blanca
- Verifica que `npm run build` se ejecutó
- Revisa la ruta en server/index.js
- Verifica que NODE_ENV=production

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs del servidor
2. Verifica todas las variables de entorno
3. Asegúrate de que el build del frontend fue exitoso
4. Revisa la conexión a la base de datos
