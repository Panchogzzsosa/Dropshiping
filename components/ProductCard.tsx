'use client';

import { motion } from 'framer-motion';
import { useCart } from './CartContext';
import { ShoppingCart, Star, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { petTypes } from '@/lib/products';
import { LazyImage } from './LazyLoad';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isBundle: product.isBundle,
    });
  };

  // Obtener emoji según el tipo de mascota
  const petTypeEmoji = petTypes.find(p => p.id === product.petType)?.emoji || '🐾';
  const petTypeColor = petTypes.find(p => p.id === product.petType)?.color || 'bg-gray-500';

  return (
    <motion.div 
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Image Container con Lazy Loading */}
      <Link href={`/producto/${product.id}`} className="block relative">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="transition-transform duration-500 group-hover:scale-110"
            containerClassName="w-full h-full"
          />
          
          {/* Overlay con acciones rápidas */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full text-gray-900 hover:text-orange-500 transition"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
            {product.isBundle && (
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                PACK
              </span>
            )}
            {product.has3D && (
              <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                3D 🎬
              </span>
            )}
          </div>

          {/* Badge de tipo de mascota */}
          <div className="absolute top-3 right-3">
            <span className={`${petTypeColor} text-white text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-lg`}>
              {petTypeEmoji}
            </span>
          </div>

          {/* Badge de stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Categoría y SKU */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          {product.cjSku && (
            <span className="text-[10px] text-gray-400 font-mono">
              {product.cjSku}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews} reseñas)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Savings Badge */}
        {product.savings && (
          <div className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-sm px-3 py-2 rounded-lg inline-flex items-center gap-1 border border-green-200">
            <Sparkles className="h-4 w-4" />
            Ahorras ${product.savings.toFixed(2)}
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          whileHover={{ scale: product.inStock ? 1.02 : 1 }}
          whileTap={{ scale: product.inStock ? 0.98 : 1 }}
          className={`
            w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all
            ${product.inStock 
              ? 'bg-gray-900 text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 shadow-lg hover:shadow-orange-500/25' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? 'Añadir al Carrito' : 'Agotado'}
        </motion.button>
      </div>
    </motion.div>
  );
}
