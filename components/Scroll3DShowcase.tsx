'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugin solo en cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scroll3DShowcaseProps {
  productName: string;
  frameCount?: number;
  framePath?: string; // Ruta base: "/sequences/product-3d/"
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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const frameIndexRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Intersection Observer - solo cargar cuando esté en viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Empezar a cargar 100px antes
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Lazy loading de imágenes - solo cargar cuando está en viewport
  useEffect(() => {
    if (!isInView) return;

    const preloadImages = () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;
      let errorCount = 0;

      // Limitar frames para evitar sobrecarga (cargar cada 2do frame)
      const effectiveFrameCount = Math.min(frameCount, 60);
      const frameStep = Math.ceil(frameCount / effectiveFrameCount);

      for (let i = 0; i < effectiveFrameCount; i++) {
        const actualFrame = i * frameStep;
        const img = new Image();
        const frameNumber = (actualFrame + 1).toString().padStart(4, '0');
        
        // Intentar webp primero, fallback a jpg
        img.src = `${framePath}/frame_${frameNumber}.${fileExtension}`;
        
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / effectiveFrameCount) * 100));
          
          if (loadedCount + errorCount === effectiveFrameCount) {
            setIsLoaded(true);
          }
        };

        img.onerror = () => {
          errorCount++;
          // Intentar con jpg si webp falla
          img.src = `${framePath}/frame_${frameNumber}.jpg`;
          
          if (loadedCount + errorCount === effectiveFrameCount) {
            if (loadedCount > 0) {
              setIsLoaded(true);
            } else {
              setHasError(true);
            }
          }
        };
        
        loadedImages.push(img);
      }
      
      setImages(loadedImages);
    };

    preloadImages();
  }, [isInView, frameCount, framePath, fileExtension]);

  // Setup canvas y animación scroll - solo cuando está en viewport
  useEffect(() => {
    if (!isInView || !isLoaded || !canvasRef.current || !containerRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      renderFrame();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Renderizar frame
    const renderFrame = () => {
      const img = images[frameIndexRef.current];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Centrar imagen manteniendo aspect ratio
        const imgAspect = img.naturalWidth / img.naturalHeight;
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

    // ScrollTrigger animation - solo si GSAP está disponible
    if (typeof window !== 'undefined' && ScrollTrigger) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`, // Reducido de 3 a 2 viewports
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          frameIndexRef.current = Math.min(
            Math.floor(progress * (images.length - 1)),
            images.length - 1
          );
          requestAnimationFrame(renderFrame);
        }
      });
    }

    // Render inicial
    renderFrame();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [images, isLoaded, isInView]);

  // Si hay error, mostrar imagen estática fallback
  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-[70vh] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl flex items-center justify-center"
      >
        <div className="text-center p-8">
          <p className="text-gray-400 mb-4">Vista previa 3D no disponible</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {productName}
          </h2>
          <p className="text-gray-400">
            Disfruta de nuestra experiencia 3D en dispositivos de escritorio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[70vh] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl"
    >
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg mb-2">Cargando experiencia 3D...</p>
            <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">{loadingProgress}%</p>
          </div>
        </div>
      )}

      {/* Canvas para la secuencia 3D */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Overlay con información del producto */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {productName}
          </h2>
          <p className="text-lg text-gray-300 mb-6">
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
    </div>
  );
}
