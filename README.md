# LinkedIn Post Generator

A modern web application built with Next.js that generates AI-powered LinkedIn posts with different styles and flavors. The application uses GPT-4 to create engaging, viral-worthy content that mimics popular LinkedIn posting styles.

## Features

- **AI-Powered Post Generation**: Uses OpenAI's GPT-4 model to generate contextually relevant LinkedIn posts
- **Multiple Post Styles**: 
  - Straight Fire 🔥: Bold, confident, and slightly provocative
  - Humble Brag 😌: Subtle flexing while maintaining modesty
  - Fake Humility 🙏: Overly modest posts about achievements
- **Post Management**:
  - 20 post generation limit per user
  - Copy to clipboard functionality
  - Post feedback system with emoji reactions (👍, ❤️, 😮, 😂, 👎)
  - Local storage for tracking usage limits

## Tech Stack

- **Frontend**: 
  - Next.js 13.4
  - React 18
  - TailwindCSS for styling
  - HeadlessUI for UI components
  - HeroIcons for icons
- **Backend**:
  - Next.js API routes
  - MongoDB with Mongoose for data persistence
  - OpenAI API for content generation
- **Deployment**:
  - Vercel (recommended)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Generate LinkedIn Post" to create your first post
2. After generation, you can:
   - Copy the post using the copy button
   - Provide feedback using emoji reactions
   - Select a different post style
   - Generate another post with the selected style
3. Track your remaining generations (limit of 20 per user)

## Project Structure

- `/src/app`: Main application routes and API endpoints
- `/src/components`: React components including PostGenerator and FeedbackEmojis
- `/src/lib`: Database connection and utility functions
- `/src/models`: MongoDB schemas and models
- `/src/types`: TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
