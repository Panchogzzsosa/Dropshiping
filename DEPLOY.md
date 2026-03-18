# BuenAmigo - Guía de Deploy

## 🚀 Deploy en Vercel (Recomendado)

### Opción 1: Deploy Automático con Git

1. **Sube tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Preparando para deploy"
   git push origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Selecciona el proyecto BuenAmigo

3. **Configuración del Proyecto:**
   - Framework Preset: Next.js
   - Build Command: `next build` (por defecto)
   - Output Directory: `dist` (configurado en next.config.js)
   - Install Command: `npm install`

4. **Variables de Entorno (si aplica):**
   ```
   STRIPE_PUBLIC_KEY=tu_clave_publica
   STRIPE_SECRET_KEY=tu_clave_secreta
   NEXT_PUBLIC_API_URL=https://tu-api.com
   ```

5. **Deploy:**
   - Haz clic en "Deploy"
   - Vercel generará una URL automáticamente

### Opción 2: Deploy Manual con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login y Deploy:**
   ```bash
   vercel login
   vercel
   ```

3. **Para producción:**
   ```bash
   vercel --prod
   ```

### Opción 3: Exportación Estática (Static Hosting)

El proyecto ya está configurado para exportación estática:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,  // Necesario para exportación estática
  },
}
```

**Build local:**
```bash
npm run build
```

Esto generará la carpeta `dist/` con archivos estáticos listos para subir a:
- Netlify
- GitHub Pages
- AWS S3
- Cualquier hosting estático

---

## 📁 Estructura de Assets

### Imágenes de Productos
```
public/products/
├── CJDOG001/          # SKU de CJ Dropshipping
│   ├── main.jpg       # Imagen principal
│   └── gallery/       # Imágenes adicionales
├── CJCAT001/
│   ├── main.jpg
│   └── gallery/
└── ...
```

### Secuencias 3D
```
public/sequences/
├── product-3d/        # Frames para showcase 3D
│   ├── frame_0001.webp
│   ├── frame_0002.webp
│   └── ...
└── default/           # Placeholders
```

---

## 🔧 Reemplazar Placeholders con Imágenes Reales

### Paso 1: Descargar imágenes de CJ Dropshipping
1. Ve a [cjdropshipping.com](https://cjdropshipping.com)
2. Busca los productos por SKU
3. Descarga las imágenes en alta resolución

### Paso 2: Organizar las imágenes
```bash
# Ejemplo para CJDOG001
public/products/CJDOG001/
├── main.jpg           # Imagen principal (800x800px)
├── angle-1.jpg        # Vista frontal
├── angle-2.jpg        # Vista lateral
├── angle-3.jpg        # Vista trasera
├── detail-1.jpg       # Detalle importante
└── lifestyle.jpg      # Foto en uso
```

### Paso 3: Actualizar el código
Si cambias de Unsplash a imágenes locales, modifica `lib/products.ts`:

```typescript
// Antes:
image: 'https://images.unsplash.com/...'

// Después:
image: '/products/CJDOG001/main.jpg'
images: [
  '/products/CJDOG001/angle-1.jpg',
  '/products/CJDOG001/angle-2.jpg',
]
```

---

## ✅ Pre-Deploy Checklist

- [ ] Todas las imágenes placeholders están en su lugar
- [ ] `npm run build` ejecuta sin errores
- [ ] No hay errores de TypeScript (`npx tsc --noEmit`)
- [ ] Las variables de entorno están configuradas
- [ ] El sitio funciona en modo desarrollo (`npm run dev`)
- [ ] Los productos tienen SKUs de CJ correctos
- [ ] Las secuencias 3D tienen placeholders (si aplica)

---

## 🐛 Solución de Problemas Comunes

### Error: "Image Optimization not supported"
**Solución:** Ya configurado en next.config.js con `unoptimized: true`

### Error: "Cannot find module"
**Solución:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript
**Solución:**
```bash
npx tsc --noEmit
# Corrige los errores mostrados
```

### Build muy lento
**Solución:** Verifica que las imágenes no sean muy grandes. Usa WebP cuando sea posible.

---

## 📊 Optimizaciones Post-Deploy

1. **Activar Analytics de Vercel:**
   - Ve a tu proyecto en Vercel
   - Analytics → Enable

2. **Configurar Dominio Personalizado:**
   - Settings → Domains
   - Añade tu dominio
   - Configura los DNS

3. **Activar Edge Network:**
   - Automático en Vercel
   - Para otros hosts: configura CDN

---

## 🔄 Flujo de Actualización

```bash
# Después de hacer cambios
git add .
git commit -m "Actualización: [descripción]"
git push origin main

# Vercel deployará automáticamente
```

O con Vercel CLI:
```bash
vercel --prod
```

---

## 📞 Soporte

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **CJ Dropshipping:** https://cjdropshipping.com
