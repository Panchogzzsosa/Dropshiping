export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'juguetes' | 'higiene' | 'alimentacion' | 'descanso' | 'accesorios';
  rating: number;
  reviews: number;
  inStock: boolean;
  cjSku?: string;
  isBundle?: boolean;
  bundleItems?: string[];
  savings?: number;
}

// PRODUCTOS INDIVIDUALES
export const individualProducts: Product[] = [
  {
    id: 'juguete-interactivo',
    name: 'Juguete Interactivo Inteligente',
    description: 'Bola automática con movimiento impredecible. Mantiene a tu perro entretenido por horas. Carga USB, 3 modos de velocidad.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&auto=format&fit=crop',
    category: 'juguetes',
    rating: 4.8,
    reviews: 127,
    inStock: true,
    cjSku: 'CJ123456789',
  },
  {
    id: 'pelota-sonido',
    name: 'Pelota con Sonido Chip-Chip',
    description: 'Pelota resistente con sonido que activa el instinto de caza. Material no tóxico, tamaño perfecto para morder.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&auto=format&fit=crop',
    category: 'juguetes',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    cjSku: 'CJ987654321',
  },
  {
    id: 'cuerda-morder',
    name: 'Cuerda de Algodón Premium',
    description: 'Cuerda trenzada 100% algodón para morder y jalar al. Ideal para limpieza dental mientras juega.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&auto=format&fit=crop',
    category: 'juguetes',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    cjSku: 'CJ456789123',
  },
  {
    id: 'guante-quitapelos',
    name: 'Guante Quitapelos Mágico',
    description: 'Guante de silicona con 255 pines que remueve pelo suelto mientras acaricias a tu perro. Lavable y reutilizable.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop',
    category: 'higiene',
    rating: 4.9,
    reviews: 342,
    inStock: true,
    cjSku: 'CJ789123456',
  },
  {
    id: 'fuente-agua',
    name: 'Fuente de Agua Automática',
    description: 'Fuente de 2.4L con filtro de carbón activado. Flujo continuo que incentiva a tu perro a hidratarse más. Ultra silenciosa.',
    price: 39.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop',
    category: 'alimentacion',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    cjSku: 'CJ321654987',
  },
  {
    id: 'comedero-lento',
    name: 'Comedero Slow-Feed',
    description: 'Plato laberinto que reduce la velocidad de alimentación hasta 10x. Previene hinchazón y mejora digestión.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&auto=format&fit=crop',
    category: 'alimentacion',
    rating: 4.8,
    reviews: 178,
    inStock: true,
    cjSku: 'CJ654987321',
  },
  {
    id: 'cepillo-dental',
    name: 'Cepillo Dental Masticable',
    description: 'Cepillo de goma con cerdas que limpian dientes mientras tu perro mastica. Sabor a pollo. Reduce mal aliento y placa.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&auto=format&fit=crop',
    category: 'higiene',
    rating: 4.5,
    reviews: 94,
    inStock: true,
    cjSku: 'CJ147258369',
  },
  {
    id: 'cama-ortopedica',
    name: 'Cama Ortopédica Memory Foam',
    description: 'Cama ergonómica con espuma viscoelástica. Alivia presión en articulaciones. Funda lavable, base antideslizante.',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400&auto=format&fit=crop',
    category: 'descanso',
    rating: 4.9,
    reviews: 267,
    inStock: true,
    cjSku: 'CJ369258147',
  },
  {
    id: 'transportadora',
    name: 'Transportadora Plegable',
    description: 'Bolsa de transporte con ventilación 360°, cojín acolchado y correa de seguridad. Plegable para guardar fácil.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601758124096-1fd661873b95?w=400&auto=format&fit=crop',
    category: 'accesorios',
    rating: 4.6,
    reviews: 145,
    inStock: true,
    cjSku: 'CJ258369741',
  },
  {
    id: 'botella-portatil',
    name: 'Botella de Agua Portátil',
    description: 'Botella dispensadora para paseos. Un botón libera agua en el recipiente integrado. No desperdicias una gota.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&auto=format&fit=crop',
    category: 'accesorios',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    cjSku: 'CJ741852963',
  },
];

// BUNDLES/PACKS
export const bundles: Product[] = [
  {
    id: 'pack-diversion',
    name: 'Pack Diversión Total',
    description: 'El combo perfecto para perros activos. Incluye juguete interactivo, pelota con sonido y cuerda de algodón.',
    price: 39.99,
    originalPrice: 47.97,
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&auto=format&fit=crop',
    category: 'juguetes',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isBundle: true,
    bundleItems: ['juguete-interactivo', 'pelota-sonido', 'cuerda-morder'],
    savings: 7.98,
    cjSku: 'CJPACK001',
  },
  {
    id: 'pack-hidratacion',
    name: 'Pack Hidratación Saludable',
    description: 'Todo lo que necesitas para mantener a tu perro hidratado. Fuente automática + botella portátil para paseos.',
    price: 49.99,
    originalPrice: 55.98,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop',
    category: 'alimentacion',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    isBundle: true,
    bundleItems: ['fuente-agua', 'botella-portatil'],
    savings: 5.99,
    cjSku: 'CJPACK002',
  },
  {
    id: 'pack-higiene',
    name: 'Pack Spa Canino',
    description: 'Kit completo de cuidado personal. Guante quitapelos + cepillo dental masticable + comedero slow-feed.',
    price: 44.99,
    originalPrice: 50.97,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400&auto=format&fit=crop',
    category: 'higiene',
    rating: 4.9,
    reviews: 134,
    inStock: true,
    isBundle: true,
    bundleItems: ['guante-quitapelos', 'cepillo-dental', 'comedero-lento'],
    savings: 5.98,
    cjSku: 'CJPACK003',
  },
  {
    id: 'pack-nuevo-perro',
    name: 'Kit Bienvenida Cachorro',
    description: 'Todo lo esencial para tu nuevo compañero. Juguetes, higiene, alimentación y descanso en un solo pack.',
    price: 89.99,
    originalPrice: 109.95,
    image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400&auto=format&fit=crop',
    category: 'juguetes',
    rating: 5.0,
    reviews: 56,
    inStock: true,
    isBundle: true,
    bundleItems: ['juguete-interactivo', 'guante-quitapelos', 'comedero-lento', 'cama-ortopedica'],
    savings: 19.96,
    cjSku: 'CJPACK004',
  },
];

// Todos los productos juntos
export const allProducts = [...individualProducts, ...bundles];

// Función para obtener producto por ID
export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

// Función para obtener productos por categoría
export function getProductsByCategory(category: string): Product[] {
  return individualProducts.filter(p => p.category === category);
}

// Función para calcular envío gratis
export function qualifiesForFreeShipping(cartTotal: number): boolean {
  return cartTotal >= 35;
}

// Calcular costo de envío
export function calculateShipping(cartTotal: number): number {
  return qualifiesForFreeShipping(cartTotal) ? 0 : 5.99;
}
