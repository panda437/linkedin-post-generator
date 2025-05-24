import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const POST_TYPES = [
  { 
    id: 1, 
    name: 'AI Taking All Jobs', 
    description: 'I just fixed my kitchen leak using ChatGPT live video. The latest model is so good, there will be no software jobs from next year. Entire consulting sector is doomed...'
  },
  { 
    id: 2, 
    name: 'Human Superiority', 
    description: "I just asked ChatGPT to do xyz and it couldn't. To experts, AI responses are too bad, mediocrity in a field you don't know sounds brilliant..."
  },
  { 
    id: 3, 
    name: 'AI Augmentation', 
    description: 'I just saw a junior finish 10 hours of work in one hour, I just made an app in 2 minutes, AI is bad but those who know how to use it are great...'
  },
  { 
    id: 4, 
    name: 'Prompt Guide Promo', 
    description: 'Get my prompt guide on xyz topic, this literally changes the whole field, comment AI guide below to get the free guide worth thousands of dollars...'
  },
  { 
    id: 5, 
    name: 'Product Launch', 
    description: 'Company x just launched AI product xyz. This is brilliant it can do soo soo much, its groundbreaking, this changes everything...'
  },
  { 
    id: 6, 
    name: 'Course Promotion', 
    description: 'This person dropped the full course on how to do xyz with AI, watch the 10 hour masterclass...'
  },
  { 
    id: 7, 
    name: 'AI Criticism', 
    description: 'AI is making xyz worse, its full of hallucinations, inaccuracies...'
  },
  { 
    id: 8, 
    name: 'AI Services', 
    description: 'Try therapy with AI, interviews with AI, conflict resolution with AI, quote full made up stories of personal experiences...'
  },
  { 
    id: 9, 
    name: 'AI Development', 
    description: 'Join my masterclass on how to build full end to end apps with AI, why use LinkedIn when you can make your own...'
  },
  { 
    id: 10, 
    name: 'Agent Workflow', 
    description: 'Announce an agentic workflow they have created, connect random apps with each other and ask people to comment xyz to get it...'
  }
]

interface PostTypeSelectorProps {
  selected: number;
  setSelected: (value: number) => void;
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