'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { petTypes } from '@/lib/products';

export function PetTypeSelector() {
  const [selectedPet, setSelectedPet] = useState('all');

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex gap-3 px-4 md:justify-center min-w-max">
        <button
          onClick={() => setSelectedPet('all')}
          className={`
            relative flex items-center gap-2 px-5 py-3 rounded-full font-medium
            transition-all duration-300 border-2
            ${selectedPet === 'all' 
              ? 'bg-[#FF6B35] text-white border-transparent shadow-lg shadow-[#FF6B35]/30' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }
          `}
        >
          <span className="text-2xl">🐾</span>
          <span className="whitespace-nowrap">Todos</span>
        </button>

        {petTypes.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setSelectedPet(pet.id)}
            className={`
              relative flex items-center gap-2 px-5 py-3 rounded-full font-medium
              transition-all duration-300 border-2
              ${selectedPet === pet.id 
                ? `${pet.color} text-white border-transparent shadow-lg` 
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="text-2xl">{pet.emoji}</span>
            <span className="whitespace-nowrap">{pet.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
