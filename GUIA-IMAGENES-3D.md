# 🎬 Guía: Implementación de Scroll 3D y Fotos Reales

## PARTE 1: Efecto Scroll 3D (Estilo Apple)

### El Concepto
El efecto consiste en:
1. Crear una secuencia de imágenes (frames) que simulen rotación 3D
2. Usar GSAP ScrollTrigger para cambiar frames según el scroll
3. Canvas para renderizado suave y performante

### Herramientas necesarias
- **Generación de imágenes**: Midjourney, Leonardo AI, DALL-E, o fotos reales en rotación
- **Edición**: Photoshop, GIMP, o After Effects (para video → frames)
- **Optimización**: Squoosh, ImageMagick

### Paso a paso

#### 1. Generar imágenes con IA (Opción A - Rápida)

Prompt recomendado para Midjourney:
```
Product photography of a [PRODUCTO], floating in white studio background, 
cinematic lighting, ultra-detailed, 8k. Multiple angles of the same product 
shown in a grid: front view, 45 degree angle, side view, back view, top view. 
Consistent lighting and product positioning.
```

#### 2. Crear video rotativo (Opción B - Profesional)

Usa Blender o After Effects:
- Importa tu modelo 3D o fotos del producto
- Crea una rotación de 360°
- Exporta a video 24fps, 5 segundos = 120 frames

#### 3. Extraer frames del video

```bash
# Usando FFmpeg
ffmpeg -i input.mp4 -vf "fps=24,scale=1280:-1:flags=lanczos" frames/frame_%04d.webp

# Optimizar todas las imágenes
for file in frames/*.webp; do
  cwebp -q 80 "$file" -o "${file%.webp}.webp"
done
```

#### 4. Estructura de archivos

```
public/
  sequences/
    product-3d/
      frame_0001.webp
      frame_0002.webp
      ...
      frame_0120.webp
```

#### 5. Uso del componente

```tsx
import Scroll3DShowcase from '@/components/Scroll3DShowcase';

// En tu página
<Scroll3DShowcase 
  productName="Juguete Interactivo"
  frameCount={120}
  framePath="/sequences/product-3d"
  fileExtension="webp"
/>
```

### Recomendaciones de performance

| Aspecto | Recomendación |
|---------|---------------|
| Formato | WebP (mejor compresión) o AVIF (más nuevo) |
| Resolución | 1280x720 o 1920x1080 máximo |
| Frame count | 60-120 frames (menos = más ligero) |
| Calidad | 75-85% (balance calidad/peso) |
| Precarga | Cargar solo los primeros 10 frames inicialmente |

---

## PARTE 2: Imágenes Reales de CJ Dropshipping

### Método 1: Descarga manual desde CJ Dashboard

1. Ve a https://cjdropshipping.com
2. Busca tu producto
3. Click en "Product Images"
4. Descarga todas las fotos disponibles
5. Optimiza con Squoosh.app

### Método 2: API de CJ Dropshipping

```typescript
// lib/cj-api.ts

const CJ_API_KEY = process.env.CJ_API_KEY;
const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1';

export async function getProductImages(sku: string) {
  const response = await fetch(`${CJ_BASE_URL}/product/query`, {
    method: 'POST',
    headers: {
      'CJ-Access-Token': CJ_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pid: sku,
    }),
  });

  const data = await response.json();
  
  // Extraer URLs de imágenes
  return {
    mainImage: data.data.productImage,
    variantImages: data.data.variants?.map((v: any) => v.variantImage),
    videoUrl: data.data.videoUrl,
  };
}
```

### Método 3: Chrome Extension de CJ

Instala la extensión oficial de CJ Dropshipping:
1. Ve a la página del producto en CJ
2. Click en el icono de la extensión
3. Descarga todas las imágenes en un ZIP

---

## PARTE 3: Flujo de trabajo recomendado

### Para cada producto:

1. **Obtener imágenes base**
   - Descarga 5-10 fotos reales de CJ
   - Separa: foto principal, detalles, en uso

2. **Crear versión 3D (opcional)**
   - Si el producto es popular (>50 ventas/mes)
   - Genera 60-120 frames de rotación
   - Usa IA si no tienes modelo 3D

3. **Optimizar todo**
   ```bash
   # Script de optimización
   mkdir -p public/products/${SKU}
   
   # Optimizar imágenes
   for img in raw/*; do
     cwebp -q 85 "$img" -o "public/products/${SKU}/$(basename ${img%.*}).webp"
   done
   ```

4. **Actualizar producto en la base de datos**
   ```typescript
   {
     id: 'juguete-interactivo',
     images: [
       '/products/CJDOG001/main.webp',
       '/products/CJDOG001/detail-1.webp',
       '/products/CJDOG001/detail-2.webp',
       '/products/CJDOG001/in-use.webp',
     ],
     has3D: true,
     sequencePath: '/sequences/CJDOG001-3d'
   }
   ```

---

## PARTE 4: Prompts de IA para diferentes productos

### Para juguetes:
```
Professional product photo of a colorful dog toy, made of durable rubber, 
floating in white void, studio lighting, soft shadows, highly detailed texture.
360 product photography style, 8 angles shown in grid.
```

### Para camas:
```
Luxury pet bed product photography, plush memory foam, neutral beige color, 
white background, soft studio lighting, showing texture of fabric.
Multiple angles: front, side, top-down.
```

### Para fuentes de agua:
```
Modern pet water fountain, white and transparent plastic, LED light, 
flowing water effect, product photography, clean white background, 
professional studio lighting, 8k resolution.
```

---

## PARTE 5: Testing y QA

### Checklist antes de deploy:

- [ ] Todas las imágenes cargan en <2s
- [ ] Secuencia 3D no se traba en móvil
- [ ] Fallback si el usuario tiene reduced-motion
- [ ] Imagen placeholder mientras carga
- [ ] Lazy loading para imágenes debajo del fold

### Comandos útiles:

```bash
# Ver tamaño de imágenes
find public/products -type f -exec ls -lh {} \; | awk '{ print $5 ": " $9 }'

# Contar frames en secuencia
ls public/sequences/product-3d/ | wc -l

# Comprimir todo para deploy
zip -r deploy.zip . -x "node_modules/*" ".next/*" "*.log"
```

---

## Recursos adicionales

- **Midjourney**: https://midjourney.com
- **Leonardo AI**: https://leonardo.ai
- **Squoosh**: https://squoosh.app
- **FFmpeg**: https://ffmpeg.org
- **CJ API Docs**: https://developers.cjdropshipping.cn

---

*Nota: Para producción, considera usar un CDN como Cloudflare o CloudFront para servir las imágenes más rápido.*
