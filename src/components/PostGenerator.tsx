'use client'

import { useState, useEffect } from 'react'
import { ClipboardIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'
import FeedbackEmojis from './FeedbackEmojis'
import { POST_TYPES } from './PostTypeSelector'
import FlavorSelector from './FlavorSelector'

interface PostType {
  id: number
  name: string
  description: string
}

interface PostGeneratorProps {
  flavor?: 'straight_fire' | 'fake_humility' |  'humblebrag'
}

interface GeneratedPost {
  _id: string
  content: string
  createdAt: string
}

export default function PostGenerator({ flavor: initialFlavor }: PostGeneratorProps) {
  const [post, setPost] = useState<GeneratedPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedFlavor, setSelectedFlavor] = useState<string>('straight_fire')
  const [remainingUses, setRemainingUses] = useState(20)
  
  useEffect(() => {
    // Initialize remaining uses from localStorage
    const storedUses = localStorage.getItem('remainingUses')
    if (storedUses === null) {
      localStorage.setItem('remainingUses', '20')
    } else {
      setRemainingUses(parseInt(storedUses))
    }
  }, [])

  const flavorOptions = [
    { id: 'straight_fire', label: 'Straight Fire 🔥' },
    { id: 'humblebrag', label: 'Humble Brag 😌' },
    { id: 'fake_humility', label: 'Fake Humility 🙏' }
  ]

  const getRandomPostType = () => {
    // Get the shown types from localStorage or initialize empty array
    const shownTypes = JSON.parse(localStorage.getItem('shownPostTypes') || '[]');
    
    // Get available types that haven't been shown
    const availableTypes = POST_TYPES.filter(type => !shownTypes.includes(type.id));
    
    // If all types have been shown, reset the list
    if (availableTypes.length === 0) {
      localStorage.setItem('shownPostTypes', '[]');
      return POST_TYPES[Math.floor(Math.random() * POST_TYPES.length)];
    }
    
    // Select a random type from available types
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    const selectedType = availableTypes[randomIndex];
    
    // Add the selected type to shown types
    shownTypes.push(selectedType.id);
    localStorage.setItem('shownPostTypes', JSON.stringify(shownTypes));
    
    return selectedType;
  }

  const generatePost = async () => {
    const currentUses = parseInt(localStorage.getItem('remainingUses') || '0')
    if (currentUses <= 0) {
      alert('You have reached your limit of 20 generations. Please try again later.')
      return
    }

    setLoading(true)
    try {
      const selectedPostType = getRandomPostType();
      const body = {
        flavor: 'straight_fire', // Always use straight_fire for first post
        postType: selectedPostType
      }
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.error === 'Rate limit exceeded') {
          alert('Please wait a moment before generating another post')
          return
        }
        throw new Error(data.error)
      }
      
      // Update remaining uses
      const newUses = currentUses - 1
      localStorage.setItem('remainingUses', newUses.toString())
      setRemainingUses(newUses)
      setPost(data.post)
    } catch (error) {
      console.error('Failed to generate post:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAnotherPost = async () => {
    const currentUses = parseInt(localStorage.getItem('remainingUses') || '0')
    if (currentUses <= 0) {
      alert('You have reached your limit of 20 generations. Please try again later.')
      return
    }

    setLoading(true)
    try {
      const selectedPostType = getRandomPostType();
      const body = {
        flavor: selectedFlavor,
        postType: selectedPostType
      }
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (!response.ok) {
        if (data.error === 'Rate limit exceeded') {
          alert('Please wait a moment before generating another post')
          return
        }
        throw new Error(data.error)
      }
      
      // Update remaining uses
      const newUses = currentUses - 1
      localStorage.setItem('remainingUses', newUses.toString())
      setRemainingUses(newUses)
      setPost(data.post)
    } catch (error) {
      console.error('Failed to generate post:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!post) return
    try {
      await navigator.clipboard.writeText(post.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleFeedback = async (feedback: string) => {
    if (!post) return
    try {
      const response = await fetch(`/api/posts/${post._id}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback })
      })
      if (!response.ok) throw new Error('Failed to submit feedback')
      const data = await response.json()
      setPost(data.post) // Update local state with the updated post
    } catch (error) {
      console.error('Failed to submit feedback:', error)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-right text-sm text-gray-500">
        Remaining generations: {remainingUses}/20
      </div>
      <div className="linkedin-card">
        {post ? (
          <div className="relative">
            {/* LinkedIn-style post header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-linkedin-blue to-linkedin-hover" />
                <div>
                  <h3 className="font-semibold text-linkedin-text">AI Post Generator</h3>
                  <p className="text-sm text-gray-500">Generated • {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Post content */}
            <div className="p-4 text-linkedin-text whitespace-pre-wrap min-h-[200px] text-[15px] leading-6">
              {post.content}
            </div>

            {/* Feedback and Copy section */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <FeedbackEmojis onFeedback={handleFeedback} />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-linkedin-light text-linkedin-blue hover:bg-opacity-80 transition-colors relative group"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="h-5 w-5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Flavor selector and generate button */}
            <div className="border-t border-gray-100 p-4 space-y-4">
             
              <FlavorSelector 
                selectedFlavor={selectedFlavor}
                onFlavorSelect={setSelectedFlavor}
              />
              
              <button
                onClick={generateAnotherPost}
                disabled={loading}
                className="linkedin-button w-full disabled:bg-opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  'Generate Another Post'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <button
              onClick={generatePost}
              disabled={loading}
              className="linkedin-button w-full disabled:bg-opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate LinkedIn Post'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}