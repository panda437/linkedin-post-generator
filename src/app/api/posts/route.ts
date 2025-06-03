import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import OpenAI from 'openai'
import { connectToDatabase } from '@/lib/mongodb'
import Post from '@/models/Post'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { postType, flavor } = await req.json()
    
    const postTypeDescription = postType 
      ? `${postType.name}: ${postType.description}` 
      : 'a general topic'

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 1,
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn post generator. Generate a ${flavor} style post about lessons from RCB's title win for corporate life. Topic: ${postTypeDescription}. Make it enthusiastic and viral-worthy, around 200 words. No emoji usage. Keep short punchy sentences, bullet points, and a hint of sarcasm. Replace xyz with real companies and products from news`,
        }
      ],
    })

    const generatedPost = completion.choices[0].message.content

    await connectToDatabase()
    
    const cleanPostType = {
      id: postType.id,
      name: postType.name,
      description: postType.description
    }
    
    const post = await Post.create({
      content: generatedPost,
      postType: cleanPostType,
      flavor,
    })

    const postObject = post.toObject()

    return NextResponse.json({ post: postObject })
  } catch (error: any) {
    console.error('Post generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate post' },
      { status: 500 }
    )
  }
}