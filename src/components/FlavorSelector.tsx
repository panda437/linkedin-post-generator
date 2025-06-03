import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const FLAVORS = [
  {
    id: 'fanatic_leadership',
    name: 'Fanatic Leadership',
    description: 'Channel your inner Kohli and manage by sheer passion'
  },
  {
    id: 'data_driven_hustle',
    name: 'Data-Driven Hustle',
    description: 'Every move backed by spreadsheets and adrenaline'
  },
  {
    id: 'never_say_die',
    name: 'Never Say Die',
    description: 'Because waiting sixteen seasons builds character'
  }
]

interface FlavorSelectorProps {
  selectedFlavor: string;
  onFlavorSelect: (flavor: string) => void;
}

export default function FlavorSelector({ selectedFlavor, onFlavorSelect }: FlavorSelectorProps) {
  const flavorOptions = [
    { id: 'fanatic_leadership', label: 'Fanatic Leadership' },
    { id: 'data_driven_hustle', label: 'Data-Driven Hustle' },
    { id: 'never_say_die', label: 'Never Say Die 💪' }
  ];

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Pick Your Lesson:</label>
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