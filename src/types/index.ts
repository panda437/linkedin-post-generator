export interface Post {
    id: string
    content: string
    likes: number
    feedback: 'positive' | 'neutral' | 'negative' | null
  }
  
  export type PostFlavor = 'humblebrag' | 'fake_humility' | 'straight_fire'
  
  export type PostType = {
    id: number
    name: string
    description: string
  }