import { getProductById, individualProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Star, Truck, Shield, RotateCcw, Package, Check } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/AddToCartButton';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  // Buscar productos relacionados
  const relatedProducts = individualProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-orange-500">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/#productos" className="hover:text-orange-500">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagen del Producto */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm capitalize">
                {product.category}
              </span>
              {product.isBundle && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                  PACK ESPECIAL
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reseñas)</span>
            </div>

            {/* Precio */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.savings && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Ahorras ${product.savings.toFixed(2)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features del Pack */}
            {product.isBundle && product.bundleItems && (
              <div className="bg-orange-50 p-6 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Este Pack Incluye:
                </h3>
                <ul className="space-y-3">
                  {product.bundleItems.map((itemId) => {
                    const item = getProductById(itemId);
                    return item ? (
                      <li key={itemId} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-400 line-through text-sm ml-auto">
                          ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
                <div className="mt-4 pt-4 border-t border-orange-200 flex justify-between items-center">
                  <span className="text-gray-600">Valor individual:</span>
                  <span className="font-bold text-gray-900">
                    ${product.originalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Botón de Compra */}
            <AddToCartButton product={product} />

            {/* Garantías */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Envío 5-7 días</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Garantía 30 días</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Devolución fácil</p>
              </div>
            </div>
          </div>
        </div>

        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/producto/${related.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {related.name}
                    </h3>
                    <p className="text-lg font-bold text-orange-500 mt-2">
                      ${related.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
