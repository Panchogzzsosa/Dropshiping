# Cómo obtener tu API Key de CJ Dropshipping

## Pasos (con imágenes de referencia)

### 1. Inicia sesión en CJ Dropshipping
- Ve a https://cjdropshipping.com
- Haz clic en **"Sign In"** o **"Log In"**
- Ingresa tu email y contraseña

### 2. Ve a My CJ
- En la barra superior, haz clic en **"My CJ"**
- Esto te lleva a tu dashboard personal

### 3. Accede a la sección API
- En el menú lateral **izquierdo**, busca **"Authorization"**
- Pasa el mouse sobre "Authorization" y selecciona **"API"**

```
Menú lateral:
├── Dashboard
├── Products
├── Orders
├── Authorization  ← Busca esto
│   ├── Stores
│   └── API        ← Selecciona esto
└── Settings
```

### 4. Genera tu API Key
- En la página de API, busca la pestaña **"API Key"**
- Haz clic en el botón **"Generate"** (o "Create")
- Se generará una nueva API Key

### 5. Copia tu API Key
- Verás un texto largo como este:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
- **IMPORTANTE:** Haz clic en **"Copy"** para copiarla al portapapeles
- **Guárdala en un lugar seguro** - CJ solo la muestra una vez

---

## Alternativa: Si no ves el menú "Authorization"

Algunas cuentas tienen el layout diferente. Prueba esto:

### Opción A: Perfil → API
1. Haz clic en tu **foto de perfil** (arriba a la derecha)
2. Selecciona **"Profile"** o **"Account Settings"**
3. Busca una pestaña llamada **"API"** o **"Developer"**

### Opción B: Apps → API
1. En el menú lateral, busca **"Apps"**
2. Selecciona **"API"** o **"API Access"**

### Opción C: Settings → API
1. Ve a **"Settings"** (Configuración)
2. Busca **"API Keys"** o **"Developer Tools"**

---

## ¿No tienes la opción de API?

Si no puedes encontrar la sección de API, puede ser porque:

1. **Tu cuenta es nueva** - Algunas funciones se activan después de 24-48 horas
2. **Necesitas verificar tu email** - Revisa tu correo y confirma tu cuenta
3. **Necesitas completar tu perfil** - Agrega tu información de negocio

### Para activar el API:
1. Ve a **"Profile"** o **"Account Settings"**
2. Completa toda tu información:
   - Nombre de empresa
   - Teléfono
   - Dirección
   - Tipo de negocio
3. Guarda los cambios
4. Espera 24 horas y revisa de nuevo

---

## Una vez que tengas tu API Key

Crea el archivo `.env.local` en tu proyecto:

```bash
# En la carpeta buenperro-files/
touch .env.local
```

Agrega tu API Key:
```
CJ_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Guarda el archivo y dime "**listo**" para que yo descargue las imágenes.

---

## ⚠️ Importante de seguridad

- **Nunca compartas tu API Key en público**
- **No la subas a GitHub** (el archivo .env.local ya está en .gitignore)
- **Si la pierdes**, puedes revocarla en CJ y generar una nueva
- **Si alguien la usa**, pueden acceder a tu cuenta de CJ

---

## ¿Problemas?

Si no puedes generar la API Key, contacta al soporte de CJ:
- Email: support@cjdropshipping.com
- Chat en vivo: Disponible en su página web
- WhatsApp: +86 186 2750 7949
