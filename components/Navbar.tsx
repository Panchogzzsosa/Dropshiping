'use client';

import { useCart } from './CartContext';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-2 rounded-full group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                BuenAmigo
              </span>
              <span className="text-[10px] text-gray-500 -mt-1 tracking-wider">TODO PARA TU MASCOTA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#productos" className="text-gray-600 hover:text-orange-500 transition font-medium">
              Productos
            </Link>
            <Link href="/#bundles" className="text-gray-600 hover:text-orange-500 transition font-medium">
              Packs
            </Link>
            <div className="flex items-center gap-1 text-xs text-gray-400 border-l border-gray-200 pl-6">
              <span>🐕</span>
              <span>🐈</span>
              <span>🦜</span>
              <span>🐠</span>
              <span>🐹</span>
              <span>🦎</span>
            </div>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-600 hover:text-orange-500 transition group"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <Link 
                href="/#productos" 
                className="text-gray-600 hover:text-orange-500 transition font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🛍️</span> Productos
              </Link>
              <Link 
                href="/#bundles" 
                className="text-gray-600 hover:text-orange-500 transition font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📦</span> Packs Especiales
              </Link>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Mascotas que amamos:</p>
                <div className="flex gap-3 text-2xl">
                  <span>🐕</span>
                  <span>🐈</span>
                  <span>🦜</span>
                  <span>🐠</span>
                  <span>🐹</span>
                  <span>🦎</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
