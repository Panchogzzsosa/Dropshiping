import { Dog, Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-full">
                <Dog className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BuenPerro</span>
            </div>
            <p className="text-gray-400">
              Todo lo que tu perro necesita, en un solo lugar. 
              Calidad, conveniencia y amor en cada producto.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Tienda</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#productos" className="hover:text-orange-500 transition">Todos los Productos</Link></li>
              <li><Link href="/#bundles" className="hover:text-orange-500 transition">Packs Especiales</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Nuevos Ingresos</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Más Vendidos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Ayuda</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-orange-500 transition">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Envíos y Entregas</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Devoluciones</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Suscríbete</h4>
            <p className="text-gray-400 mb-4">
              Recibe ofertas exclusivas y tips para tu mascota.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 BuenPerro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
