'use client';

import { useCart } from './CartContext';
import { ShoppingCart, Menu, X, Dog } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-full">
              <Dog className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BuenPerro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#productos" className="text-gray-600 hover:text-orange-500 transition">
              Productos
            </Link>
            <Link href="/#bundles" className="text-gray-600 hover:text-orange-500 transition">
              Packs
            </Link>
            <Link href="/#categorias" className="text-gray-600 hover:text-orange-500 transition">
              Categorías
            </Link>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link 
                href="/#productos" 
                className="text-gray-600 hover:text-orange-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                href="/#bundles" 
                className="text-gray-600 hover:text-orange-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Packs
              </Link>
              <Link 
                href="/#categorias" 
                className="text-gray-600 hover:text-orange-500 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categorías
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
