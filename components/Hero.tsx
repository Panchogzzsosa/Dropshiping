import Link from 'next/link';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
              Envío gratis en compras +$35
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Todo lo que tu{' '}
              <span className="text-orange-500">perro</span>{' '}
              necesita
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Juguetes, higiene, alimentación y descanso. Productos seleccionados 
              por expertos con envío directo a tu puerta. Sin inventario, sin complicaciones.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#productos"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
              >
                Ver Productos
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/#bundles"
                className="inline-flex items-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition"
              >
                Ver Packs
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Envío 5-7 días</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Garantía 30 días</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <RotateCcw className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Devolución fácil</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-200 rounded-3xl transform rotate-3 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop"
              alt="Perro feliz con juguetes"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-[400px] lg:h-[500px]"
            />
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">4.9/5</p>
                  <p className="text-sm text-gray-500">+2,000 reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
