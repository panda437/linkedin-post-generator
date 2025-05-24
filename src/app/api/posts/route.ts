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
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn post generator. Generate a ${flavor} style post about ${postTypeDescription}. Make it sound enthusiastic and viral-worthy, around 200 words. No emoji usage. Embody the AI techbro, short punchy sentences, bulletpoints in between, sense of self importance, and a touch of arrogance. Use a tone that is confident and slightly provocative. replace xyz with real companies and products from news`,
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