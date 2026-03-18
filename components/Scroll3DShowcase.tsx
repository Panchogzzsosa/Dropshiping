'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scroll3DShowcaseProps {
  productName: string;
  frameCount?: number;
  framePath?: string; // Ruta base: "/products/sequence/"
  fileExtension?: string;
}

export default function Scroll3DShowcase({
  productName,
  frameCount = 120,
  framePath = '/sequences/product-3d',
  fileExtension = 'webp'
}: Scroll3DShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndexRef = useRef(0);

  // Precargar imágenes
  useEffect(() => {
    const preloadImages = () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNumber = (i + 1).toString().padStart(4, '0');
        img.src = `${framePath}/frame_${frameNumber}.${fileExtension}`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setIsLoaded(true);
          }
        };
        
        loadedImages.push(img);
      }
      
      setImages(loadedImages);
    };

    preloadImages();
  }, [frameCount, framePath, fileExtension]);

  // Setup canvas y animación scroll
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      const aspectRatio = 16 / 9;
      const windowAspect = window.innerWidth / window.innerHeight;
      
      if (windowAspect > aspectRatio) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / aspectRatio;
      } else {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * aspectRatio;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Renderizar frame
    const renderFrame = () => {
      const img = images[frameIndexRef.current];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Centrar imagen manteniendo aspect ratio
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (canvasAspect > imgAspect) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgAspect;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgAspect;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    // ScrollTrigger animation
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 3}`, // 3 viewport heights de scroll
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        frameIndexRef.current = Math.floor(progress * (frameCount - 1));
        requestAnimationFrame(renderFrame);
      }
    });

    // Render inicial
    renderFrame();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      scrollTriggerInstance.kill();
    };
  }, [images, frameCount]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Cargando experiencia 3D...</p>
          </div>
        </div>
      )}

      {/* Canvas para la secuencia 3D */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Overlay con información del producto */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {productName}
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Desplázate para explorar cada detalle
          </p>
          <div className="flex items-center justify-center gap-2 text-orange-400">
            <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm uppercase tracking-wider">Scroll para rotar</span>
          </div>
        </div>
      </div>

      {/* Indicador de progreso */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block">
        <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="w-full bg-orange-500 rounded-full transition-all duration-100"
            style={{ height: isLoaded ? '0%' : '0%' }}
            id="scroll-progress"
          />
        </div>
      </div>
    </div>
  );
}
