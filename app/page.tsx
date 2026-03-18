'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '@/components/Hero3D';
import PetTypeSelector from '@/components/PetTypeSelector';
import ProductGrid from '@/components/ProductGrid';
import Scroll3DShowcase from '@/components/Scroll3DShowcase';
import { individualProducts, getProductsByPetType, petTypes } from '@/lib/products';

export default function Home() {
  const [selectedPet, setSelectedPet] = useState('todos');
  const [filteredProducts, setFilteredProducts] = useState(individualProducts);
  const [show3DShowcase, setShow3DShowcase] = useState(false);

  useEffect(() => {
    setFilteredProducts(getProductsByPetType(selectedPet));
  }, [selectedPet]);

  const featuredProduct = individualProducts.find(p => p.has3D);

  return (
    <>
      {/* Hero 3D */}
      <Hero3D />

      {/* Sección de Showcase 3D (opcional - se muestra solo si hay producto con 3D) */}
      {featuredProduct && (
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Explora en{' '}
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  3D
                </span>
              </motion.h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Desplázate para ver cada detalle de nuestros productos. 
                Una experiencia de compra completamente nueva.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden">
              <Scroll3DShowcase 
                productName={featuredProduct.name}
                frameCount={120}
                framePath="/sequences/product-3d"
              />
            </div>
          </div>
        </section>
      )}

      {/* Selector de tipo de mascota */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto">
          <PetTypeSelector 
            selectedPet={selectedPet}
            onSelectPet={setSelectedPet}
          />
        </div>
      </section>

      {/* Productos filtrados */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPet}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {selectedPet === 'todos' 
                      ? 'Todos los Productos' 
                      : `Productos para ${petTypes.find(p => p.id === selectedPet)?.name}`
                    }
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} productos disponibles
                  </p>
                </div>

                {selectedPet !== 'todos' && (
                  <div className="text-4xl">
                    {petTypes.find(p => p.id === selectedPet)?.emoji}
                  </div>
                )}
              </div>

              <ProductGrid products={filteredProducts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Sección de envío gratis */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🚚 Envío GRATIS en compras mayores a $35
            </h2>
            <p className="text-white/90 text-lg">
              Sin importar qué mascota tengas, ¡el envío es gratis!
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
