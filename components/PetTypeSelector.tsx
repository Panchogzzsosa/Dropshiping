'use client';

import { motion } from 'framer-motion';
import { petTypes } from '@/lib/products';

interface PetTypeSelectorProps {
  selectedPet: string;
  onSelectPet: (petId: string) => void;
}

export default function PetTypeSelector({ selectedPet, onSelectPet }: PetTypeSelectorProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex gap-3 px-4 md:justify-center min-w-max">
        {petTypes.map((pet) => (
          <motion.button
            key={pet.id}
            onClick={() => onSelectPet(pet.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative flex items-center gap-2 px-5 py-3 rounded-full font-medium
              transition-all duration-300 border-2
              ${selectedPet === pet.id 
                ? `${pet.color} text-white border-transparent shadow-lg shadow-${pet.color}/30` 
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <span className="text-2xl">{pet.emoji}</span>
            <span className="whitespace-nowrap">{pet.name}</span>
            {selectedPet === pet.id && (
              <motion.div
                layoutId="activePet"
                className="absolute inset-0 rounded-full border-2 border-white/50"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
