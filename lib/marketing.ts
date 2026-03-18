import { Product } from '@/lib/products';

export interface InstagramPost {
  id: string;
  date: string;
  type: 'product' | 'educational' | 'testimonial' | 'bundle' | 'behind-scenes' | 'reel';
  title: string;
  imagePrompt: string;
  caption: string;
  hashtags: string[];
  product?: Product;
  scheduledTime: string;
}

export interface WeeklyContent {
  week: number;
  posts: InstagramPost[];
}

// Generador de prompts para imágenes de IA
export function generateImagePrompt(product: Product, type: string): string {
  const basePrompts: Record<string, string> = {
    product: `Professional product photography of ${product.name}, ${product.petType} using it, soft natural lighting, clean white background, high-end pet product catalog style, 4K quality, realistic textures`,
    
    lifestyle: `Lifestyle photography of happy ${product.petType} enjoying ${product.name} in cozy home setting, warm golden hour lighting, modern apartment interior, pet owner blurred in background, Instagram aesthetic, candid moment`,
    
    flatlay: `Flat lay photography of ${product.name} with complementary pet accessories, minimalist styling, pastel colors, marble or wood surface, overhead shot, Pinterest aesthetic, professional product photography`,
    
    testimonial: `Happy ${product.petType} with ${product.name}, pet looking satisfied, natural lighting, bokeh background, emotional connection moment, soft focus, Instagram portrait style`,
  };
  
  return basePrompts[type] || basePrompts.product;
}

// Plantillas de captions
const captionTemplates = {
  product: (product: Product) => `
¿Tu ${product.petType} necesita esto? ✨

${product.name}

✅ ${product.description.split('.')[0]}
✅ Calidad premium garantizada
✅ Envío gratis en compras +$499

💰 $${product.price.toFixed(2)} MXN
${product.originalPrice ? `🔥 Antes $${product.originalPrice.toFixed(2)}` : ''}

🔗 Link en bio para comprar
👇 Comenta "${product.cjSku}" y te mandamos info

¿Qué le comprarías a tu peludo amigo? 🐾
`,

  educational: (topic: string, tip: string, product?: Product) => `
💡 SABÍAS QUE...

${topic}

${tip}

${product ? `💙 Nuestro ${product.name} está diseñado específicamente para esto. ¡Tu ${product.petType} te lo agradecerá!` : ''}

💬 ¿Ya sabías este dato? Cuéntanos en los comentarios 👇

Guarda este post para recordarlo 📌
`,

  bundle: (bundleName: string, items: string[], price: number, originalPrice: number) => `
🎁 PACK ESPECIAL DE FIN DE SEMANA 🎁

${bundleName}

Incluye:
${items.map(item => `✅ ${item}`).join('\n')}

💰 Solo $${price.toFixed(2)} MXN
❌ Valor normal: $${originalPrice.toFixed(2)} MXN
💸 Ahorras: $${(originalPrice - price).toFixed(2)} MXN

⚠️ Solo 10 unidades disponibles

🔗 Link en bio para aprovechar

¿Para qué mascota es este pack? 🐕🐈🐹
`,

  testimonial: (customer: string, pet: string, quote: string) => `
⭐ CLIENTE FELIZ ⭐

"${quote}"

— ${customer} y ${pet} 🐾

Nos encanta ver a nuestras mascotas clientes disfrutando sus productos. 💙

¿Quieres que tu mascota aparezca aquí?
📸 Súbete foto usando nuestros productos con #BuenAmigo y etiquétanos

🛒 Link en bio para unirte a la familia
`,

  behindScenes: () => `
📦 Detrás de cámaras en BuenAmigo

Así empacamos cada pedido con amor 💙

Cada caja incluye:
✨ Producto verificado
✨ Stickers exclusivos
✨ Guía de cuidado
✨ Sorpresita para tu mascota

¿Ya recibiste tu pedido? Cuéntanos qué te pareció 👇

— El equipo BuenAmigo 🐾
`,
};

// Hashtags optimizados
const hashtagSets = {
  general: ['#BuenAmigo', '#MascotasMexico', '#PetLovers', '#CuidadoAnimal', '#ProductosParaMascotas', '#Mexico', '#TiendaDeMascotas'],
  dog: ['#PerrosMexico', '#DogLover', '#PerritosFelices', '#CuidadoCanino', '#PerritosDeInstagram', '#DogMom', '#DogDad'],
  cat: ['#GatosMexico', '#CatLover', '#Michi', '#CuidadoFelino', '#Gatitos', '#CatMom', '#GatosDeInstagram'],
  bird: ['#AvesMexico', '#BirdLover', '#Pajaros', '#CuidadoAves', '#AvesExoticas', '#PetsBirds'],
  fish: ['#Acuario', '#FishLover', '#PecesMexico', '#Acuarismo', '#Aquascape', '#PecesTropicales'],
  rodent: ['#Hamsters', '#Conejos', '#RoedoresMexico', '#SmallPets', '#Hurones', '#Cobayas'],
  reptile: ['#ReptilesMexico', '#ReptileLover', '#Terrario', '#Geckos', '#Serpientes', '#Tortugas'],
  engagement: ['#InstaPet', '#PetOfTheDay', '#MascotasDeInstagram', '#PetFriendly', '#PetCommunity'],
};

export function generateCaption(type: string, data: any): string {
  const template = captionTemplates[type as keyof typeof captionTemplates];
  if (!template) return '';
  return template(data as any);
}

export function generateHashtags(petType: string, includeEngagement = true): string[] {
  const base = hashtagSets.general;
  const specific = hashtagSets[petType as keyof typeof hashtagSets] || [];
  const engagement = includeEngagement ? hashtagSets.engagement : [];
  
  return [...base, ...specific, ...engagement];
}

// Generar contenido para una semana completa
export function generateWeeklyContent(weekNumber: number, products: Product[]): WeeklyContent {
  const posts: InstagramPost[] = [];
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Lunes - Producto
  posts.push({
    id: `week${weekNumber}-monday`,
    date: `Week ${weekNumber} - Monday`,
    type: 'product',
    title: 'Producto de la Semana',
    imagePrompt: generateImagePrompt(products[0], 'product'),
    caption: generateCaption('product', products[0]),
    hashtags: generateHashtags(products[0].petType),
    product: products[0],
    scheduledTime: '13:00',
  });
  
  // Martes - Educativo
  posts.push({
    id: `week${weekNumber}-tuesday`,
    date: `Week ${weekNumber} - Tuesday`,
    type: 'educational',
    title: 'Tip de Cuidado',
    imagePrompt: `Infographic style design about "5 signs your ${products[1]?.petType || 'pet'} is bored", modern flat design, ${products[1]?.petType === 'perro' ? 'orange and blue' : 'teal and yellow'} color scheme, icons, clean typography, Instagram post format`,
    caption: generateCaption('educational', {
      topic: `5 señales de que tu ${products[1]?.petType || 'mascota'} está aburrido`,
      tip: 'Una mascota aburrida puede desarrollar comportamientos destructivos. Los juguetes interactivos son la mejor solución para mantenerlos estimulados.',
      product: products[1],
    }),
    hashtags: generateHashtags(products[1]?.petType || 'perro'),
    scheduledTime: '12:00',
  });
  
  // Miércoles - Reel
  posts.push({
    id: `week${weekNumber}-wednesday`,
    date: `Week ${weekNumber} - Wednesday`,
    type: 'reel',
    title: 'Video Producto',
    imagePrompt: `Short video storyboard: ${products[2]?.petType || 'dog'} unboxing ${products[2]?.name || 'product'}, happy excited energy, trending audio visualization, text overlay "POV: Your pet when the package arrives", TikTok/Reel style`,
    caption: `POV: Tu ${products[2]?.petType || 'mascota'} cuando llega su paquete de BuenAmigo 📦✨\n\n${products[2]?.name || 'Producto'} disponible ahora 💙\n\n🔗 Link en bio`,
    hashtags: [...hashtagSets.general, '#Reels', '#TikTok', '#Viral'],
    product: products[2],
    scheduledTime: '15:00',
  });
  
  // Jueves - Producto diferente
  posts.push({
    id: `week${weekNumber}-thursday`,
    date: `Week ${weekNumber} - Thursday`,
    type: 'product',
    title: 'Nuevo Producto',
    imagePrompt: generateImagePrompt(products[3] || products[0], 'lifestyle'),
    caption: generateCaption('product', products[3] || products[0]),
    hashtags: generateHashtags((products[3] || products[0]).petType),
    product: products[3] || products[0],
    scheduledTime: '13:00',
  });
  
  // Viernes - Bundle
  posts.push({
    id: `week${weekNumber}-friday`,
    date: `Week ${weekNumber} - Friday`,
    type: 'bundle',
    title: 'Pack Fin de Semana',
    imagePrompt: `Product bundle flat lay, ${products[0]?.name || 'products'} arranged beautifully, gift box aesthetic, confetti, "Weekend Special" text overlay, promotional style, warm lighting`,
    caption: generateCaption('bundle', {
      bundleName: 'Pack Fin de Semana Especial',
      items: (products.slice(0, 3) || []).map(p => p.name),
      price: 89.99,
      originalPrice: 129.99,
    }),
    hashtags: [...hashtagSets.general, '#Promo', '#Oferta', '#Bundle'],
    scheduledTime: '14:00',
  });
  
  // Sábado - Testimonio
  posts.push({
    id: `week${weekNumber}-saturday`,
    date: `Week ${weekNumber} - Saturday`,
    type: 'testimonial',
    title: 'Cliente Feliz',
    imagePrompt: `Happy ${products[0]?.petType || 'dog'} with ${products[0]?.name || 'product'}, satisfied expression, natural window light, cozy home background, bokeh effect, Instagram portrait style, warm tones`,
    caption: generateCaption('testimonial', {
      customer: 'María G.',
      pet: 'Luna',
      quote: 'A Luna le encantó su juguete. No lo suelta desde que llegó. ¡La mejor compra!',
    }),
    hashtags: [...hashtagSets.general, '#Testimonio', '#ClientesFelices', '#Review'],
    scheduledTime: '11:00',
  });
  
  // Domingo - Behind Scenes
  posts.push({
    id: `week${weekNumber}-sunday`,
    date: `Week ${weekNumber} - Sunday`,
    type: 'behind-scenes',
    title: 'Detrás de Cámaras',
    imagePrompt: `Behind the scenes at pet store, hands packing boxes, BuenAmigo stickers, cute packaging, workspace aesthetic, natural lighting, authentic moment, brand storytelling`,
    caption: captionTemplates.behindScenes(),
    hashtags: [...hashtagSets.general, '#BehindTheScenes', '#Equipo', '#Emprendedor'],
    scheduledTime: '12:00',
  });
  
  return {
    week: weekNumber,
    posts,
  };
}

// Guardar contenido generado como JSON
export function exportContentToJSON(content: WeeklyContent): string {
  return JSON.stringify(content, null, 2);
}
