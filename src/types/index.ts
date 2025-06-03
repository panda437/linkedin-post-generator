export interface Post {
    id: string
    content: string
    likes: number
    feedback: 'positive' | 'neutral' | 'negative' | null
  }
  
  export type PostFlavor = 'fanatic_leadership' | 'data_driven_hustle' | 'never_say_die'
  
  export type PostType = {
    id: number
    name: string
    description: string
  }