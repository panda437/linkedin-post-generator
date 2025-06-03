import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const POST_TYPES = [
  {
    id: 1,
    name: 'Never Give Up',
    description:
      'Sixteen seasons of heartbreak and finally a trophy. Persistence is apparently the ultimate KPI.'
  },
  {
    id: 2,
    name: 'Hire Superstar Talent',
    description:
      "Poach impact players mid-season like you're grabbing your rival's star engineer the day before launch."
  },
  {
    id: 3,
    name: 'Brand Building 101',
    description:
      "Kohli sells more jerseys than wins. Pump up social presence even if results lag behind."
  },
  {
    id: 4,
    name: 'Data-Driven Decisions',
    description:
      'Match-ups, powerplays, spreadsheets. Imagine using analytics before each Monday meeting.'
  },
  {
    id: 5,
    name: 'Fan Engagement Mania',
    description:
      'Fans stuck around for years of memes. Keep customers cheering even when the product is buggy.'
  },
  {
    id: 6,
    name: 'Leadership Overhaul',
    description:
      'New captain, new success. Sometimes that outsider CEO vibe is all you need.'
  },
  {
    id: 7,
    name: 'Play Bold Culture',
    description:
      'The motto finally paid off. Maybe drop the corporate-safe talk and embrace risk.'
  },
  {
    id: 8,
    name: 'Celebration Overload',
    description:
      "They partied like there's no tomorrow. Hold more town halls for small wins too."
  },
  {
    id: 9,
    name: 'Merch and Money',
    description:
      'Victory tees sold out in minutes. Can your team monetize success this fast?'
  },
  {
    id: 10,
    name: 'From Chokers to Champions',
    description:
      'Rebrand the narrative after one good quarter. Works for sports, works for business.'
  }
]

interface PostTypeSelectorProps {
  selected: number
  setSelected: (value: number) => void
}

export default function PostTypeSelector({ selected, setSelected }: PostTypeSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Listbox value={selected} onChange={setSelected}>
        {/* ...rest of the component remains the same... */}
      </Listbox>
    </div>
  )
}
