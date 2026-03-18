import { ProductCard } from './ProductCard';
import { Package, Sparkles, Heart } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductGridProps {
  products?: Product[];
  showBundles?: boolean;
}

export default function ProductGrid({ products, showBundles = false }: ProductGridProps) {
  // Si no hay productos, mostrar mensaje
  if (products && products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No encontramos productos</h3>
        <p className="text-gray-600">Prueba seleccionando otra categoría de mascota</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Productos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mensaje de amor por todas las mascotas */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 text-gray-500">
          <Heart className="w-4 h-4 text-pink-500" />
          <span>Amamos a todas las mascotas por igual 🐕🐈🦜🐠🐹🦎</span>
        </div>
      </div>
    </div>
  );
}

// Versión legacy para backwards compatibility
export function ProductGridLegacy() {
  // Importamos aquí para evitar circular dependencies
  const { individualProducts, bundles } = require('@/lib/products');
  
  return (
    <div className="bg-white">
      {/* SECCIÓN: PACKS DESTACADOS */}
      <section id="bundles" className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Package className="h-4 w-4" />
              Mejor Valor
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Packs Especiales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Combos seleccionados por expertos. Ahorra hasta $60 y recibe todo 
              lo que tu mascota necesita en una sola compra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundles?.map((bundle: Product) => (
              <ProductCard key={bundle.id} product={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: PRODUCTOS INDIVIDUALES */}
      <section id="productos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Productos Populares
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Todo para Tu Mascota
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Productos individuales seleccionados por calidad. Compra lo que 
              necesitas o arma tu propio pack. Perros, gatos, aves, peces y más.
            </p>
          </div>

          <ProductGrid products={individualProducts} />
        </div>
      </section>
    </div>
  );
}
