'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Product3DProps {
  productName: string;
  imageUrl?: string;
}

export function Product3DShowcase({ productName, imageUrl }: Product3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Rotate based on scroll
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  useEffect(() => {
    const unsubscribe = scrollRotation.on("change", (v) => {
      setRotation(v);
    });
    return () => unsubscribe();
  }, [scrollRotation]);

  // Auto rotation when not scrolling
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#F7F7F7] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1A1A2E] to-transparent opacity-10" />
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-64 h-64 bg-[#4ECDC4]/10 rounded-full blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3D Product Viewer */}
        <div 
          className="relative h-[500px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-to-r from-[#FF6B35]/20 to-[#4ECDC4]/20 rounded-full blur-[60px]" />
          </div>
          
          {/* 3D Card */}
          <motion.div
            className="relative w-72 h-96 preserve-3d"
            style={{
              transform: `perspective(1000px) rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Front */}
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'translateZ(20px)'
              }}
            >
              <img 
                src={imageUrl || '/products/CJDOG001/main.jpg'} 
                alt={productName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Back */}
            <div 
              className="absolute inset-0 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-8"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg) translateZ(20px)'
              }}
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#4ECDC4] flex items-center justify-center">
                  <span className="text-5xl">🐕</span>
                </div>
                <p className="text-gray-500">{productName}</p>
              </div>
            </div>
            
            {/* Side reflection */}
            <div 
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-transparent pointer-events-none"
              style={{ transform: 'translateZ(21px)' }}
            />
          </motion.div>
          
          {/* Rotation indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm">Scroll para rotar</span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-6"
          >
            Experiencia 3D
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#1A1A2E] mb-6"
          >
            Descubre cada
            <span className="text-[#FF6B35]"> detalle</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
          >
            Explora nuestros productos en 360°. Rota, haz zoom y conoce 
            cada característica antes de comprar.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {[
              { icon: '🔄', text: '360° View' },
              { icon: '🔍', text: 'Detalles HD' },
              { icon: '✨', text: 'Calidad Premium' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                <span>{feature.icon}</span>
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
