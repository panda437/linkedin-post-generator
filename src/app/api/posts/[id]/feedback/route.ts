import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Post from '@/models/Post'
import mongoose from 'mongoose'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { feedback } = await request.json()
    
    // Validate feedback value
    const validEmojis = ['👍', '❤️', '😮', '😂', '👎', null]
    if (!validEmojis.includes(feedback)) {
      return NextResponse.json(
        { error: 'Invalid feedback value. Must be one of: 👍, ❤️, 😮, 😂, 👎' },
        { status: 400 }
      )
    }

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid post ID format' },
        { status: 400 }
      )
    }

    await connectToDatabase()
    
    const post = await Post.findById(params.id)
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    post.feedback = feedback
    await post.save()

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}