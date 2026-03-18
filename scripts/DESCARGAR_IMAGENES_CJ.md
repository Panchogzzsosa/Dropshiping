# Script para obtener imágenes reales de CJ Dropshipping

## Opción 1: Usando la API oficial (Recomendada)

### Requisitos
- API Key de CJ Dropshipping (obtenida de tu cuenta)
- Product ID (PID) o SKU real de CJ

### Endpoint
```
GET https://developers.cjdropshipping.com/api2.0/v1/product/query
```

### Headers requeridos
```
CJ-Access-Token: tu-api-key-aqui
Content-Type: application/json
```

### Script Node.js

```javascript
// scripts/download-cj-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');

const CJ_API_KEY = process.env.CJ_API_KEY;
const CJ_BASE_URL = 'developers.cjdropshipping.com';

// Productos que queremos descargar (necesitas los PIDs reales de CJ)
const products = [
  { sku: 'CJDOG001', pid: 'PID_REAL_AQUI', category: 'dog' },
  { sku: 'CJDOG002', pid: 'PID_REAL_AQUI', category: 'dog' },
  // ... más productos
];

async function getProductDetails(pid) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CJ_BASE_URL,
      path: `/api2.0/v1/product/query?pid=${pid}`,
      method: 'GET',
      headers: {
        'CJ-Access-Token': CJ_API_KEY,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const product of products) {
    try {
      console.log(`Descargando imágenes para ${product.sku}...`);
      
      const data = await getProductDetails(product.pid);
      
      if (data.result && data.data) {
        const productData = data.data;
        
        // Crear carpeta si no existe
        const dir = path.join(__dirname, '../public/products', product.sku);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Descargar imagen principal
        if (productData.bigImage) {
          await downloadImage(
            productData.bigImage,
            path.join(dir, 'main.jpg')
          );
          console.log(`  ✓ Imagen principal descargada`);
        }
        
        // Descargar galería de imágenes
        if (productData.productImageSet && Array.isArray(productData.productImageSet)) {
          const galleryDir = path.join(dir, 'gallery');
          if (!fs.existsSync(galleryDir)) {
            fs.mkdirSync(galleryDir, { recursive: true });
          }
          
          for (let i = 0; i < Math.min(productData.productImageSet.length, 5); i++) {
            await downloadImage(
              productData.productImageSet[i],
              path.join(galleryDir, `${String(i + 1).padStart(2, '0')}.jpg`)
            );
            console.log(`  ✓ Imagen de galería ${i + 1} descargada`);
          }
        }
        
        // Guardar datos del producto
        fs.writeFileSync(
          path.join(dir, 'data.json'),
          JSON.stringify({
            name: productData.productNameEn,
            price: productData.sellPrice,
            weight: productData.productWeight,
            category: productData.categoryName,
            description: productData.description
          }, null, 2)
        );
      }
    } catch (error) {
      console.error(`Error con ${product.sku}:`, error.message);
    }
  }
}

main();
```

### Uso
```bash
# Instalar dependencias (si es necesario)
npm install

# Configurar API key
export CJ_API_KEY="tu-api-key-de-cj"

# Ejecutar
node scripts/download-cj-images.js
```

---

## Opción 2: Búsqueda manual en CJ Dropshipping

### Paso 1: Obtener API Key
1. Ve a https://cjdropshipping.com
2. Inicia sesión en tu cuenta
3. Ve a Profile → API Key
4. Copia tu API Key

### Paso 2: Buscar productos por categoría

```javascript
// scripts/search-cj-products.js
const https = require('https');

const CJ_API_KEY = process.env.CJ_API_KEY;

async function searchProducts(keyword, categoryId = null) {
  const postData = JSON.stringify({
    keyword: keyword,
    categoryId: categoryId,
    pageNum: 1,
    pageSize: 20
  });

  const options = {
    hostname: 'developers.cjdropshipping.com',
    path: '/api2.0/v1/product/list',
    method: 'POST',
    headers: {
      'CJ-Access-Token': CJ_API_KEY,
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Buscar productos para perros
searchProducts('dog toy').then(data => {
  console.log(JSON.stringify(data, null, 2));
});
```

### Paso 3: Guardar PIDs encontrados

Una vez encuentres productos que te gusten, guarda sus PIDs:

```json
{
  "dogProducts": [
    { "pid": "PID_REAL_1", "name": "Juguete interactivo", "ourSku": "CJDOG001" },
    { "pid": "PID_REAL_2", "name": "Pelota con sonido", "ourSku": "CJDOG002" }
  ]
}
```

---

## Opción 3: Chrome Extension de CJ (Más fácil, manual)

1. Instala la extensión oficial de CJ Dropshipping en Chrome
2. Ve a cjdropshipping.com y busca productos
3. La extensión permite descargar todas las imágenes en ZIP
4. Extrae y organiza las imágenes manualmente en `public/products/`

---

## Respuesta de la API (estructura)

```json
{
  "result": true,
  "message": "success",
  "data": {
    "pid": "PID_DEL_PRODUCTO",
    "productNameEn": "Nombre del producto en inglés",
    "productSku": "CJSKU123456",
    "bigImage": "https://cf.cjdropshipping.com/.../imagen-principal.jpg",
    "productImageSet": [
      "https://cf.cjdropshipping.com/.../imagen-1.jpg",
      "https://cf.cjdropshipping.com/.../imagen-2.jpg",
      "https://cf.cjdropshipping.com/.../imagen-3.jpg"
    ],
    "sellPrice": 12.99,
    "productWeight": 250,
    "categoryName": "Pet Supplies > Dog Supplies",
    "description": "Descripción HTML del producto"
  }
}
```

---

## Notas importantes

1. **Los SKUs que usamos (CJDOG001, etc.) son inventados** - Necesitas encontrar los productos reales de CJ que quieres vender

2. **Las imágenes de CJ están protegidas** - No puedes hotlinkear directamente, debes descargarlas a tu servidor

3. **Términos de servicio** - CJ permite usar sus imágenes para dropshipping, pero verifica sus TOS actualizados

4. **Optimización** - Las imágenes de CJ pueden ser grandes (2-5MB). Usa el script de optimización:

```bash
# Optimizar todas las imágenes descargadas
find public/products -name "*.jpg" -exec cwebp -q 85 {} -o {}.webp \;
```

---

## Próximos pasos

1. **Obtén tu API Key** de CJ Dropshipping
2. **Busca productos reales** usando los scripts de búsqueda
3. **Actualiza el mapeo** de PIDs reales a nuestros SKUs (CJDOG001, etc.)
4. **Ejecuta el script de descarga** para obtener todas las imágenes
5. **Optimiza las imágenes** para web

¿Necesitas que te ayude con algún paso específico?
