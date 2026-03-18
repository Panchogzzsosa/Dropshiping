# Guía: Descargar Imágenes Manualmente de CJ Dropshipping

## Método 1: Descarga Directa desde el Website (Recomendado)

### Paso 1: Buscar Productos
1. Ve a https://cjdropshipping.com
2. Inicia sesión con tu cuenta
3. Usa el buscador para encontrar productos:
   - "dog toy" para CJDOG001
   - "cat fountain" para CJCAT003
   - "bird cage" para CJBIRD001
   - etc.

### Paso 2: Seleccionar Producto
1. Encuentra un producto que te guste
2. Click en el producto para ver detalles
3. **IMPORTANTE:** Copia el PID (Product ID) - aparece en la URL o en los detalles

### Paso 3: Descargar Imágenes
1. En la página del producto, busca las imágenes
2. Click derecho en la imagen principal → "Guardar imagen como..."
3. Guarda como: `public/products/CJDOG001/main.jpg`
4. Repite para las imágenes de galería (guarda en `public/products/CJDOG001/gallery/`)

---

## Método 2: Extensión de Chrome (Más Rápido)

1. Instala la extensión "Image Downloader" o "Download All Images"
2. Ve a la página del producto en CJ
3. Click en el icono de la extensión
4. Selecciona todas las imágenes del producto
5. Descarga en ZIP y extrae a la carpeta correcta

---

## Método 3: Script con Autenticación Web (Alternativa técnica)

Si prefieres automatizar, podemos intentar web scraping con Puppeteer/Playwright:

```javascript
// scripts/scrape-cj-images.js
const { chromium } = require('playwright');

async function scrapeProductImages(keyword) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Login
  await page.goto('https://cjdropshipping.com/login');
  await page.fill('input[name="email"]', 'tu-email');
  await page.fill('input[name="password"]', 'tu-password');
  await page.click('button[type="submit"]');
  
  // Wait for login
  await page.waitForNavigation();
  
  // Search
  await page.goto(`https://cjdropshipping.com/product/search?keyword=${keyword}`);
  
  // Get first product
  const productLink = await page.$('.product-item a');
  await productLink.click();
  
  // Get images
  const images = await page.$$eval('.product-image img', imgs => 
    imgs.map(img => img.src)
  );
  
  console.log('Images found:', images);
  
  await browser.close();
}
```

**Instalación:**
```bash
npm install playwright
npx playwright install chromium
```

---

## Estructura de Carpetas Final

```
public/products/
├── CJDOG001/
│   ├── main.jpg          ← Imagen principal (obligatoria)
│   └── gallery/
│       ├── 01.jpg        ← Vista adicional
│       └── 02.jpg        ← Detalle
├── CJDOG002/
│   ├── main.jpg
│   └── gallery/
├── CJCAT001/
│   ├── main.jpg
│   └── gallery/
└── ... (repite para los 33 productos)
```

---

## Productos Prioritarios (descarga primero estos)

Si no vas a descargar los 33, empieza con estos:

### Alta Prioridad (más vendidos)
1. **CJDOG001** - Juguete interactivo perro
2. **CJCAT003** - Fuente de agua gato
3. **CJDOG005** - Fuente de agua perro
4. **CJDOG007** - Cama ortopédica perro
5. **CJCAT001** - Rascador gato

### Media Prioridad
6. **CJBIRD001** - Jaula loro
7. **CJFISH001** - Acuario
8. **CJROD001** - Jaula hámster
9. **CJREP001** - Terrario
10. **CJDOG004** - Guante quitapelos

---

## Optimización de Imágenes

Después de descargar, optimiza las imágenes:

```bash
# Instala cwebp si no lo tienes
npm install -g cwebp

# Convierte todas a WebP (mejor compresión)
find public/products -name "*.jpg" -exec cwebp -q 85 {} -o {}.webp \;
```

O usa Squoosh.app para hacerlo manual arrastrando las imágenes.

---

## Verificación

Una vez descargadas las imágenes, verifica:

```bash
# Cuenta cuántas tienes
find public/products -name "main.jpg" | wc -l

# Debería decir: 33 (o el número que hayas descargado)
```

---

## Nota sobre Derechos de Autor

Las imágenes de CJ Dropshipping están destinadas a ser usadas por sus dropshippers. Sin embargo:
- No modifiques las imágenes (excepto compresión/optimización)
- Menciona CJ Dropshipping como proveedor si es requerido
- Usa las imágenes solo para vender los productos de CJ

---

## Próximos Pasos

1. Descarga las imágenes manualmente desde CJ
2. Organízalas en las carpetas correspondientes
3. Corre el build: `npm run build`
4. Deploy a Vercel

¿Necesitas ayuda con algún paso específico?
