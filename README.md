# Portfolio Website - Falola Olufemi Adedeji

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Dark Mode Support**: Automatic theme detection with manual toggle
- **Smooth Animations**: Scroll-triggered animations and micro-interactions
- **Performance Optimized**: Fast loading times with optimized fonts and images
- **SEO Ready**: Proper meta tags and structured data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main portfolio page
│   ├── globals.css     # Global styles and Tailwind
│   └── fonts.ts        # Font configuration
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── Navigation.tsx  # Navigation bar
│   ├── Experience.tsx  # Work experience section
│   ├── Projects.tsx    # Projects showcase
│   ├── ...            # Other components
├── lib/
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## Customization

### Colors

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --primary: 262 83% 58%;
  /* Add your custom colors */
}
```

### Content

All content is directly embedded in the components. To update:
- Edit experience in `components/Experience.tsx`
- Update projects in `components/Projects.tsx`
- Modify skills in `components/TechnicalSkills.tsx`

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **clsx & tailwind-merge**: Utility for conditional CSS classes

## License

MIT License

## Contact

Falola Olufemi Adedeji
- Email: femi.deji0@gmail.com
- LinkedIn: [linkedin.com/in/falola-olufemi](https://linkedin.com/in/falola-olufemi)
- GitHub: [github.com/femi-deji](https://github.com/femi-deji)