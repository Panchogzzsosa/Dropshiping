# Guía de Reemplazo de Imágenes Placeholder

## 📸 Estado Actual

El proyecto tiene **imágenes placeholder** descargadas de Unsplash para cada producto. Estas imágenes son temporales y deben ser reemplazadas por las imágenes reales de CJ Dropshipping antes del lanzamiento.

## 📁 Estructura de Imágenes

```
public/products/
├── [SKU]/                    ← Carpeta nombrada por SKU de CJ
│   └── main.jpg             ← Imagen principal del producto
└── ...
```

**Total de productos con imágenes:** 38 SKUs

---

## 🔄 Pasos para Reemplazar Imágenes

### Paso 1: Descargar imágenes de CJ Dropshipping

1. Inicia sesión en [CJ Dropshipping](https://cjdropshipping.com)
2. Busca cada producto por su SKU:
   - CJDOG001, CJDOG002, etc. (perros)
   - CJCAT001, CJCAT002, etc. (gatos)
   - CJBIRD001, etc. (aves)
   - CJROD001, etc. (roedores)
   - CJFISH001, etc. (peces)
   - CJREP001, etc. (reptiles)
   - CJPACK*** (bundles)

3. Descarga las imágenes en alta resolución
4. Guarda la imagen principal como `main.jpg` en la carpeta correspondiente

### Paso 2: Formato de Imágenes Recomendado

| Propiedad | Valor Recomendado |
|-----------|-------------------|
| **Formato** | JPG (productos) o WebP (mejor compresión) |
| **Resolución** | 800x800px mínimo para thumbnail |
| **Tamaño máximo** | 500KB por imagen |
| **Fondo** | Blanco (#FFFFFF) o transparente |
| **Aspect ratio** | 1:1 (cuadrado) o 4:3 |

### Paso 3: Optimización de Imágenes

Antes de subir, optimiza las imágenes:

```bash
# Usando ImageMagick (si está instalado)
convert input.jpg -resize 800x800 -quality 85 output.jpg

# Usando cwebp para convertir a WebP
 cwebp -q 85 input.jpg -o output.webp
```

O usa herramientas online:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/mac)

### Paso 4: Reemplazo Manual

```bash
# Ejemplo: Reemplazar imagen del juguete interactivo para perros
# 1. Descarga la imagen real de CJ Dropshipping
# 2. Copia a la carpeta correspondiente:
cp ~/Downloads/juguete-interactivo-real.jpg public/products/CJDOG001/main.jpg

# 3. Repite para cada producto
```

### Paso 5: Actualizar URLs en el Código (Opcional)

Si cambias de URLs de Unsplash a imágenes locales, actualiza `lib/products.ts`:

```typescript
// ANTES (Unsplash):
image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&auto=format&fit=crop',

// DESPUÉS (Local):
image: '/products/CJDOG001/main.jpg',
```

**Nota:** Esto ya está configurado para usar imágenes locales en la próxima actualización.

---

## 📋 Checklist de Reemplazo

### Perros (CJDOG001-007)
- [ ] CJDOG001 - Juguete Interactivo Inteligente
- [ ] CJDOG002 - Pelota con Sonido Chip-Chip
- [ ] CJDOG003 - Cuerda de Algodón Premium
- [ ] CJDOG004 - Guante Quitapelos Mágico
- [ ] CJDOG005 - Fuente de Agua Automática
- [ ] CJDOG006 - Comedero Slow-Feed
- [ ] CJDOG007 - Cama Ortopédica Memory Foam

### Gatos (CJCAT001-007)
- [ ] CJCAT001 - Rascador Circular de Cartón
- [ ] CJCAT002 - Varita con Plumas Interactiva
- [ ] CJCAT003 - Fuente Flor de Agua para Gatos
- [ ] CJCAT004 - Hamaca de Ventana para Gatos
- [ ] CJCAT005 - Arenero Autolimpiable Eléctrico
- [ ] CJCAT006 - Cepillo de Silicona para Gatos
- [ ] CJCAT007 - Torre Rascador 3 Niveles

### Aves (CJBIRD001-005)
- [ ] CJBIRD001 - Jaula Deluxe para Loros
- [ ] CJBIRD002 - Juguete Masticable Natural
- [ ] CJBIRD003 - Comedero Automático Inteligente
- [ ] CJBIRD004 - Bañera de Lujo para Aves
- [ ] CJBIRD005 - Columpio con Campana

### Roedores (CJROD001-005)
- [ ] CJROD001 - Habitat Deluxe para Hámsters
- [ ] CJROD002 - Rueda de Ejercicio Silenciosa
- [ ] CJROD003 - Bebedero Automático con Soporte
- [ ] CJROD004 - Casa de Madera para Conejos
- [ ] CJROD005 - Túnel Extensible de Plástico

### Peces (CJFISH001-005)
- [ ] CJFISH001 - Acuario Completo 20 Litros
- [ ] CJFISH002 - Filtro Externo Canister Pro
- [ ] CJFISH003 - Lámpara LED RGB para Acuario
- [ ] CJFISH004 - Calentador Sumergible 50W
- [ ] CJFISH005 - Set Decoración Natural

### Reptiles (CJREP001-004)
- [ ] CJREP001 - Terrario de Cristal 60x40x40cm
- [ ] CJREP002 - Lámpara Calefactora UVA/UVB
- [ ] CJREP003 - Sustrato de Fibra de Coco 10L
- [ ] CJREP004 - Cueva de Resina Grande

### Bundles (CJPACK***)
- [ ] CJPACKCAT001 - Kit Bienvenida Gatuno
- [ ] CJPACKROD001 - Habitat Completo Hámster
- [ ] CJPACKFISH001 - Kit Acuario Principiante
- [ ] CJPACKDOG001 - Pack Premium Canino
- [ ] CJPACKALL001 - Super Pack Familia de Mascotas

---

## 🎬 Secuencias 3D

Algunos productos tienen experiencia 3D (`has3D: true`). Para estos necesitas:

1. **Secuencia de imágenes** (120 frames recomendados)
2. **Formato:** WebP o JPG
3. **Resolución:** 1920x1080px
4. **Ubicación:** `public/sequences/product-3d/`

### Productos con 3D:
- CJDOG001 - Juguete Interactivo Perro
- CJDOG005 - Fuente de Agua Perro
- CJCAT003 - Fuente Flor de Agua Gato
- CJCAT005 - Arenero Autolimpiable
- CJBIRD001 - Jaula Deluxe para Loros
- CJFISH001 - Acuario Completo 20L
- CJREP001 - Terrario de Cristal

### Estructura de secuencia 3D:
```
public/sequences/product-3d/
├── frame_0001.webp    ← Frame 1
├── frame_0002.webp    ← Frame 2
├── frame_0003.webp    ← Frame 3
├── ...
└── frame_0120.webp    ← Frame 120 (último)
```

**Nota:** Si no tienes secuencias 3D, el componente mostrará una imagen estática fallback.

---

## 🔧 Comandos Útiles

### Verificar imágenes faltantes
```bash
# Lista carpetas sin main.jpg
for dir in public/products/CJ*/; do
  if [ ! -f "$dir/main.jpg" ]; then
    echo "Falta: $dir"
  fi
done
```

### Optimizar todas las imágenes
```bash
# Requiere ImageMagick
find public/products -name "*.jpg" -exec mogrify -resize 800x800 -quality 85 {} \;
```

### Convertir a WebP
```bash
# Requiere cwebp
for file in public/products/*/main.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

---

## 📊 Validación Final

Antes del deploy final:

1. **Verifica todas las imágenes:**
   ```bash
   ls public/products/*/main.jpg | wc -l
   # Debe mostrar: 38
   ```

2. **Testea el build:**
   ```bash
   npm run build
   ```

3. **Verifica en modo desarrollo:**
   ```bash
   npm run dev
   # Abre http://localhost:3000 y revisa cada producto
   ```

---

## 🆘 Solución de Problemas

### Imagen no aparece
- Verifica que el archivo existe: `ls public/products/CJXXX/main.jpg`
- Verifica que la extensión es correcta (.jpg, no .jpeg)
- Limpia caché: `rm -rf .next && npm run dev`

### Imagen borrosa
- Usa imágenes de mayor resolución (mínimo 800x800px)
- Verifica que no esté sobrecomprimida

### Build falla
- Asegúrate de que todas las imágenes tengan el mismo formato declarado
- Verifica que no haya espacios en los nombres de archivo

---

## 📞 Recursos

- **CJ Dropshipping:** https://cjdropshipping.com
- **Optimización de imágenes:** https://squoosh.app/
- **Guía de Next.js Image:** https://nextjs.org/docs/app/building-your-application/optimizing/images
