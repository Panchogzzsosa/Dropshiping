'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded-md',
        className
      )}
    />
  );
}

// Skeleton para tarjetas de producto
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Imagen */}
      <div className="aspect-square relative bg-gray-100">
        <Skeleton className="absolute inset-0 rounded-none" />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-4 space-y-3">
        {/* Categoría */}
        <Skeleton className="w-20 h-4" />
        
        {/* Título */}
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-2/3 h-5" />
        
        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-full" />
          ))}
        </div>
        
        {/* Precio y botón */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-24 h-6" />
          </div>
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para grid de productos
interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Skeleton para página de producto
export function ProductPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="space-y-6">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-full h-10" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5 rounded-full" />
            ))}
            <Skeleton className="w-24 h-5" />
          </div>
          <Skeleton className="w-32 h-10" />
          <div className="space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
          </div>
          <Skeleton className="w-full h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para hero
export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full rounded-none bg-gray-800" />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center space-y-6 max-w-4xl px-4">
          <Skeleton className="w-48 h-8 mx-auto bg-gray-700" />
          <Skeleton className="w-full max-w-2xl h-16 mx-auto bg-gray-700" />
          <Skeleton className="w-64 h-6 mx-auto bg-gray-600" />
          <div className="flex gap-4 justify-center pt-4">
            <Skeleton className="w-40 h-14 rounded-full bg-gray-700" />
            <Skeleton className="w-40 h-14 rounded-full bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton para selector de mascotas
export function PetSelectorSkeleton() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {[...Array(7)].map((_, i) => (
        <Skeleton key={i} className="w-24 h-10 rounded-full flex-shrink-0" />
      ))}
    </div>
  );
}
