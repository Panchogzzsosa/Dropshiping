const fs = require('fs');
const path = require('path');

// Productos de muestra (en producción se importarían del archivo real)
const products = [
  { name: 'Juguete Interactivo Inteligente', price: 24.99, petType: 'perro', cjSku: 'CJDOG001', description: 'Bola automática con movimiento impredecible' },
  { name: 'Pelota con Sonido Chip-Chip', price: 12.99, petType: 'perro', cjSku: 'CJDOG002', description: 'Pelota resistente con sonido' },
  { name: 'Guante Quitapelos Mágico', price: 18.99, petType: 'perro', cjSku: 'CJDOG004', description: 'Guante de silicona con 255 pines' },
  { name: 'Fuente de Agua Automática', price: 39.99, originalPrice: 49.99, petType: 'perro', cjSku: 'CJDOG005', description: 'Fuente de 2.4L con filtro' },
  { name: 'Cama Ortopédica Memory Foam', price: 59.99, originalPrice: 79.99, petType: 'perro', cjSku: 'CJDOG007', description: 'Cama ergonómica con espuma' },
  { name: 'Rascador Circular de Cartón', price: 19.99, petType: 'gato', cjSku: 'CJCAT001', description: 'Rascador duradero con diseño circular' },
  { name: 'Varita con Plumas Interactiva', price: 8.99, petType: 'gato', cjSku: 'CJCAT002', description: 'Varita extensible con plumas naturales' },
  { name: 'Fuente Flor de Agua para Gatos', price: 29.99, originalPrice: 39.99, petType: 'gato', cjSku: 'CJCAT003', description: 'Diseño de flor con 3 modos' },
  { name: 'Jaula Deluxe para Loros', price: 149.99, originalPrice: 189.99, petType: 'ave', cjSku: 'CJBIRD001', description: 'Jaula espaciosa de 120cm' },
  { name: 'Habitat Deluxe para Hámsters', price: 69.99, originalPrice: 89.99, petType: 'roedor', cjSku: 'CJROD001', description: 'Jaula de 3 niveles con túneles' },
  { name: 'Acuario Completo 20 Litros', price: 89.99, originalPrice: 119.99, petType: 'pez', cjSku: 'CJFISH001', description: 'Kit todo incluido con filtro' },
  { name: 'Terrario de Cristal 60x40x40cm', price: 129.99, originalPrice: 159.99, petType: 'reptil', cjSku: 'CJREP001', description: 'Terrario de vidrio templado' },
];

// Crear directorio para contenido
const contentDir = path.join(__dirname, '..', 'content', 'instagram');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Generar prompts de imagen para IA
function generateImagePrompt(product, type) {
  const prompts = {
    product: `Professional product photography of "${product.name}" for ${product.petType}, clean white background, soft studio lighting, 4K quality, e-commerce catalog style, high-end pet product aesthetic`,
    
    lifestyle: `Lifestyle photo of happy ${product.petType} using "${product.name}" in modern home setting, natural window light, cozy atmosphere, Instagram aesthetic, candid moment, warm tones`,
    
    flatlay: `Flat lay product photography of "${product.name}" arranged with complementary pet accessories on marble surface, minimalist styling, pastel colors, Pinterest aesthetic, top-down view`,
    
    promo: `Promotional Instagram post design for "${product.name}", price tag "${product.price} MXN", discount badge, orange (#FF6B35) and teal (#4ECDC4) color scheme, modern typography, call-to-action button`,
    
    educational: `Instagram infographic about pet care tips for ${product.petType}, modern flat design, icons, orange and teal colors, easy to read typography, engaging layout`,
    
    testimonial: `Happy ${product.petType} with satisfied expression, natural lighting, cozy home background, bokeh effect, Instagram portrait style, warm and inviting`,
  };
  
  return prompts[type] || prompts.product;
}

// Generar caption
function generateCaption(product, type) {
  const petEmoji = {
    perro: '🐕',
    gato: '🐈', 
    ave: '🦜',
    roedor: '🐹',
    pez: '🐠',
    reptil: '🦎'
  };
  
  const templates = {
    product: `¿Tu ${product.petType} necesita esto? ${petEmoji[product.petType] || '🐾'}✨

${product.name}

✅ ${product.description}
✅ Calidad premium garantizada
✅ Envío gratis en compras +$499

💰 $${product.price.toFixed(2)} MXN
${product.originalPrice ? `🔥 Oferta especial (Antes $${product.originalPrice.toFixed(2)})` : ''}

🔗 Link en bio para comprar
👇 Comenta "INFO" para más detalles

¿Qué le comprarías a tu peludo amigo? 🐾
.
.
.
#BuenAmigo #${product.petType.charAt(0).toUpperCase() + product.petType.slice(1)}Mexico #PetLovers #ProductosParaMascotas #Mexico #TiendaDeMascotas #MascotasFelices #CuidadoAnimal`,

    lifestyle: `Así de feliz está tu ${product.petType} con ${product.name} 💙${petEmoji[product.petType] || ''}

${product.description}

📦 Envío a todo México
✨ Garantía de satisfacción

💬 ¿A tu mascota le gustaría? Cuéntanos en los comentarios 👇

#BuenAmigo #MascotasFelices #${product.petType} #PetLoversMexico`,

    educational: `💡 SABÍAS QUE...

Tu ${product.petType} necesita estimulación mental para ser feliz 🧠${petEmoji[product.petType] || ''}

Un ${product.petType} aburrido puede desarrollar comportamientos destructivos. Los juguetes interactivos como nuestro ${product.name} son la solución perfecta.

✅ Reduce ansiedad
✅ Ejercita la mente
✅ Diversión garantizada

💬 ¿Tu ${product.petType} muestra signos de aburrimiento? Cuéntanos 👇

Guarda este post para recordarlo 📌

#BuenAmigo #TipsMascotas #Cuidado${product.petType.charAt(0).toUpperCase() + product.petType.slice(1)} #EducaciónPet #MascotasMexico`,

    testimonial: `⭐ CLIENTE FELIZ ⭐

"A mi ${product.petType} le encantó su ${product.name}. ¡No lo suelta desde que llegó! La mejor compra que he hecho." 💙

— María G. y su ${product.petType} Luna ${petEmoji[product.petType] || '🐾'}

Nos encanta ver a nuestras mascotas clientes disfrutando sus productos 🥰

¿Quieres que tu mascota aparezca aquí?
📸 Súbete foto usando nuestros productos con #BuenAmigo y etiquétanos

🛒 Link en bio para unirte a la familia

#BuenAmigo #Testimonio #ClientesFelices #${product.petType}Mexico`,

    bundle: `🎁 PACK ESPECIAL DE FIN DE SEMANA 🎁

Lleva TODO lo que tu ${product.petType} necesita:

✅ ${product.name}
✅ Accesorios premium
✅ Envío gratis

💰 Solo $${Math.round(product.price * 0.8).toFixed(2)} MXN
❌ Valor normal: $${Math.round(product.price * 1.3).toFixed(2)} MXN
💸 Ahorras: $${Math.round(product.price * 0.5).toFixed(2)} MXN

⚠️ Solo 10 unidades disponibles

🔗 Link en bio para aprovechar

¿Para qué mascota es este pack? ${petEmoji[product.petType] || '🐾'} Comenta 👇

#BuenAmigo #Promo #Oferta #Bundle #${product.petType}Mexico`,

    behind: `📦 DETRÁS DE CÁMARAS 📦

Así empacamos cada pedido con amor 💙

En BuenAmigo cada caja incluye:
✨ Producto verificado y probado
✨ Stickers exclusivos de mascotas
✨ Guía de cuidado personalizada
✨ Sorpresita para tu peludo amigo

¿Ya recibiste tu pedido? Cuéntanos qué te pareció en los comentarios 👇

— El equipo BuenAmigo ${petEmoji[product.petType] || '🐾'}

#BuenAmigo #BehindTheScenes #Equipo #EmprendedorMexico #HechoConAmor`,
  };
  
  return templates[type] || templates.product;
}

// Generar contenido para 30 días
function generateMonthContent() {
  const posts = [];
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  
  const contentTypes = [
    { type: 'product', name: 'Producto Destacado' },
    { type: 'educational', name: 'Tip Educativo' },
    { type: 'lifestyle', name: 'Estilo de Vida' },
    { type: 'product', name: 'Nuevo Producto' },
    { type: 'bundle', name: 'Pack Especial' },
    { type: 'testimonial', name: 'Testimonio Cliente' },
    { type: 'behind', name: 'Detrás de Cámaras' },
  ];
  
  for (let day = 1; day <= 30; day++) {
    const product = shuffled[day % shuffled.length];
    const contentType = contentTypes[day % contentTypes.length];
    
    const post = {
      day,
      date: new Date(2026, 2, day).toISOString().split('T')[0],
      type: contentType.type,
      typeName: contentType.name,
      product: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        petType: product.petType,
        cjSku: product.cjSku,
      },
      imagePrompt: generateImagePrompt(product, contentType.type),
      caption: generateCaption(product, contentType.type),
      hashtags: `#BuenAmigo #${product.petType}Mexico #PetLovers #ProductosParaMascotas #Mexico`,
      bestTime: day % 7 === 0 || day % 7 === 6 ? '11:00 AM' : '1:00 PM',
    };
    
    posts.push(post);
  }
  
  return posts;
}

// Generar y guardar
const monthContent = generateMonthContent();

// Guardar JSON completo
fs.writeFileSync(
  path.join(contentDir, 'content-marzo-2026.json'),
  JSON.stringify(monthContent, null, 2)
);

// Generar archivo de texto para cada post
monthContent.forEach(post => {
  const content = `
═══════════════════════════════════════════════════════════
📅 DÍA ${post.day} - ${post.date} - ${post.typeName.toUpperCase()}
═══════════════════════════════════════════════════════════

🎨 PROMPT PARA IMAGEN (Copia y pega en Midjourney/DALL-E):
───────────────────────────────────────────────────────────
${post.imagePrompt}

───────────────────────────────────────────────────────────
📝 CAPTION PARA INSTAGRAM:
───────────────────────────────────────────────────────────
${post.caption}

───────────────────────────────────────────────────────────
#️⃣ HASHTAGS:
${post.hashtags}

───────────────────────────────────────────────────────────
⏰ MEJOR HORA PARA PUBLICAR: ${post.bestTime}
🏷️ SKU: ${post.product.cjSku}
💰 PRECIO: $${post.product.price.toFixed(2)} MXN
${post.product.originalPrice ? `🏷️ PRECIO ORIGINAL: $${post.product.originalPrice.toFixed(2)} MXN` : ''}

═══════════════════════════════════════════════════════════
`;

  fs.writeFileSync(
    path.join(contentDir, `dia-${post.day.toString().padStart(2, '0')}-${post.type}.txt`),
    content
  );
});

// Generar resumen semanal
const weeks = [];
for (let week = 1; week <= 4; week++) {
  const weekPosts = monthContent.slice((week - 1) * 7, week * 7);
  weeks.push({
    week,
    posts: weekPosts.map(p => ({
      day: p.day,
      type: p.typeName,
      product: p.product.name,
      time: p.bestTime,
    }))
  });
}

fs.writeFileSync(
  path.join(contentDir, 'resumen-semanal.json'),
  JSON.stringify(weeks, null, 2)
);

// Generar CSV para importar a Buffer/Later
const csvHeader = 'Día,Fecha,Tipo,Producto,Hora,Caption,Prompt\n';
const csvRows = monthContent.map(post => 
  `"${post.day}","${post.date}","${post.typeName}","${post.product.name}","${post.bestTime}","${post.caption.replace(/"/g, '""')}","${post.imagePrompt.replace(/"/g, '""')}"`
).join('\n');

fs.writeFileSync(
  path.join(contentDir, 'calendario-marzo-2026.csv'),
  '\uFEFF' + csvHeader + csvRows // BOM para Excel
);

console.log('✅ CONTENIDO GENERADO PARA 30 DÍAS');
console.log('═══════════════════════════════════════════════════════════');
console.log(`📁 Carpeta: ${contentDir}`);
console.log(`📄 ${monthContent.length} posts individuales (.txt)`);
console.log(`📊 JSON completo: content-marzo-2026.json`);
console.log(`📅 CSV para Buffer/Later: calendario-marzo-2026.csv`);
console.log(`📈 Resumen semanal: resumen-semanal.json`);
console.log('');
console.log('🎨 PARA GENERAR IMÁGENES:');
console.log('   1. Abre cada archivo .txt');
console.log('   2. Copia el PROMPT para imagen');
console.log('   3. Pégalo en Midjourney, DALL-E 3, Leonardo.ai o Canva AI');
console.log('   4. Descarga la imagen generada');
console.log('   5. Súbela a Instagram con el CAPTION del archivo');
console.log('');
console.log('📅 PARA PROGRAMAR PUBLICACIONES:');
console.log('   1. Importa el archivo CSV a Buffer, Later o Meta Business Suite');
console.log('   2. Configura las imágenes correspondientes');
console.log('   3. Programa y olvídate 🎉');
console.log('');
console.log('═══════════════════════════════════════════════════════════');
