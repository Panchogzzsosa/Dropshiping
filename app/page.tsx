import { HeroV2 } from '@/components/HeroV2';
import { NavbarV2 } from '@/components/NavbarV2';
import { ProductCardV2 } from '@/components/ProductCardV2';
import { Product3DShowcase } from '@/components/Product3DShowcase';
import { PetTypeSelector } from '@/components/PetTypeSelector';
import { allProducts } from '@/lib/products';
import { Cart } from '@/components/Cart';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <NavbarV2 />
      
      <HeroV2 />
      
      <Product3DShowcase 
        productName="Juguete Interactivo 3D"
        imageUrl="/products/CJDOG001/main.jpg"
      />
      
      <section id="productos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-sm font-medium mb-4">
              Nuestros Productos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-4">
              Todo para tu
              <span className="text-[#FF6B35]"> mejor amigo</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de productos premium para mascotas. 
              Calidad garantizada y envío rápido.
            </p>
          </div>

          <PetTypeSelector />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {allProducts.slice(0, 8).map((product, index) => (
              <ProductCardV2 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a 
              href="/productos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A2E] text-white font-medium rounded-full hover:bg-[#FF6B35] transition-colors"
            >
              Ver todos los productos
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="bundles" className="py-20 bg-[#1A1A2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/20 text-[#FF6B35] text-sm font-medium mb-4">
              Mejores Ofertas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Packs Especiales
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ahorra más con nuestros bundles curados. Todo lo que tu mascota necesita en un solo paquete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts
              .filter(p => p.isBundle)
              .map((product, index) => (
                <ProductCardV2 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <Cart />
    </main>
  );
}
