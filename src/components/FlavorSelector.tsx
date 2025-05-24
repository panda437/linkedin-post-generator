import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const FLAVORS = [
  { 
    id: 'humblebrag', 
    name: 'Humble Brag', 
    description: 'Subtle flex while appearing modest' 
  },
  { 
    id: 'fake_humility', 
    name: 'Fake Humility', 
    description: 'Overly modest about achievements' 
  },
  { 
    id: 'straight_fire', 
    name: 'Straight Fire 🔥', 
    description: 'No holds barred, pure hype' 
  }
]

interface FlavorSelectorProps {
  selectedFlavor: string;
  onFlavorSelect: (flavor: string) => void;
}

export default function FlavorSelector({ selectedFlavor, onFlavorSelect }: FlavorSelectorProps) {
  const flavorOptions = [
    { id: 'straight_fire', label: 'Straight Fire 🔥' },
    { id: 'humblebrag', label: 'Humble Brag 😌' },
    { id: 'fake_humility', label: 'Fake Humility 🙏' }
  ];

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Select Post Style:</label>
      <div className="flex space-x-2">
        {flavorOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onFlavorSelect(option.id)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedFlavor === option.id
                ? 'bg-linkedin-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}