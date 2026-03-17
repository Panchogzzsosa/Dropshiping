import { individualProducts, bundles } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Package, Sparkles } from 'lucide-react';

export function ProductGrid() {
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
              Combos seleccionados por expertos. Ahorra hasta $20 y recibe todo 
              lo que tu perro necesita en una sola compra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bundles.map((bundle) => (
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
              Todo para Tu Perro
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Productos individuales seleccionados por calidad. Compra lo que 
              necesitas o arma tu propio pack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {individualProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: CATEGORÍAS */}
      <section id="categorias" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explora por Categoría
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Juguetes', icon: '🎾', color: 'bg-blue-100' },
              { name: 'Higiene', icon: '🛁', color: 'bg-green-100' },
              { name: 'Alimentación', icon: '🍖', color: 'bg-orange-100' },
              { name: 'Descanso', icon: '🛏️', color: 'bg-purple-100' },
              { name: 'Accesorios', icon: '🦮', color: 'bg-pink-100' },
            ].map((cat) => (
              <button
                key={cat.name}
                className={`${cat.color} p-6 rounded-2xl hover:scale-105 transition text-center`}
              >
                <span className="text-4xl mb-2 block">{cat.icon}</span>
                <span className="font-medium text-gray-900">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
