'use client'

import PostGenerator from '@/components/PostGenerator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          LinkedIn Post Generator
        </h1>
        
        <PostGenerator />
      </div>
    </main>
  )
}