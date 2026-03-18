'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from './CartContext';

interface ProductCardV2Props {
  product: Product;
  index?: number;
}

export function ProductCardV2({ product, index = 0 }: ProductCardV2Props) {
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

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const getPetEmoji = (petType: string) => {
    const emojis: { [key: string]: string } = {
      dog: '🐕',
      cat: '🐈',
      bird: '🦜',
      rodent: '🐹',
      fish: '🐠',
      reptile: '🦎',
    };
    return emojis[petType] || '🐾';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <Link href={`/producto/${product.id}`}>
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick actions */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-white text-[#1A1A2E] py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#FF6B35] hover:text-white transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Añadir
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discount > 0 && (
                <span className="px-3 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full">
                  -{discount}%
                </span>
              )}
              
              {product.isBundle && (
                <span className="px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FFE66D] text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  PACK
                </span>
              )}
            </div>

            {/* Pet type indicator */}
            <div className="absolute top-4 right-4">
              <span className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-lg shadow-sm">
                {getPetEmoji(product.petType)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h3 className="font-bold text-[#1A1A2E] mb-2 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-[#FFE66D] text-[#FFE66D]' 
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#1A1A2E]">
                ${product.price.toFixed(2)}
              </span>
              
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Savings */}
            {product.savings && (
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                Ahorras ${product.savings.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
