# OlziiNaran's Project

A beautiful, modern, responsive website powered by [Cosmic](https://www.cosmicjs.com). This starter application provides a clean foundation that connects to your Cosmic bucket and dynamically renders your content types.

## Features

- ⚡ **Next.js 16 App Router** with React Server Components
- 🎨 **Modern, responsive design** using Tailwind CSS
- 🔌 **Dynamic Cosmic integration** that automatically discovers your content types
- 📱 **Fully responsive** across mobile, tablet, and desktop
- 🖼️ **Optimized images** via imgix
- 🚀 **TypeScript** with strict typing throughout
- ♿ **Accessible** and SEO-friendly markup

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a422dc75a70784f2710b957&clone_repository=6a422e3f5a70784f2710b968)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: 1"

### Code Generation Prompt

> "Build a Next.js application for a website called "OlziiNaran's Project". The content is managed in Cosmic CMS. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) - React framework with App Router
- [React 19](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling
- [Cosmic](https://www.cosmicjs.com/docs) - Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account and bucket

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (see below)
4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

This project requires the following environment variables:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

Fetching all object types:

```typescript
import { cosmic } from '@/lib/cosmic'

const { object_types } = await cosmic.objectTypes.find()
```

Fetching objects of a specific type with connected data:

```typescript
const { objects } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata', 'thumbnail'])
  .depth(1)
```

Fetching a single object by slug:

```typescript
const { object } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This application connects directly to your Cosmic bucket and dynamically discovers all of your content types using the [Object Types API](https://www.cosmicjs.com/docs). Each content type automatically gets:

- A listing page at `/content/[type-slug]`
- A detail page at `/content/[type-slug]/[object-slug]`

This means as you add content types and objects in Cosmic, they automatically appear on your site with no code changes required.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Add your environment variables
4. Deploy

For production, set the environment variables in your hosting platform's dashboard.

<!-- README_END -->