# Portfolio 2.0

My personal developer portfolio built with Next.js (App Router), React, TypeScript, and Tailwind CSS. 

The site features a responsive dark/light grid layout, high-end interactive micro-animations using Framer Motion, and a custom developer command console.

## 🚀 Key Features

*   **Interactive Profile Modal**: Clicking the circular profile avatar in the Navbar triggers a rotating layout shift that slides open a custom developer console detailing my profile sequentially with typewriter effects.
*   **3D Tilt Cards (`TiltCard`)**: Physics-based grid cards that rotate in response to mouse position, complete with a monochrome light glare spotlight and zinc glow borders.
*   **Ambient Spotlights**: A background grid mesh overlay with a mouse-tracking radial spotlight (fades out of view on mobile viewports for smooth scrolling).
*   **Playful Scroll Follower**: A custom peeking monkey indicator that tracks scroll percentage.
*   **Tailwind + Next-Themes**: Unified responsive container styling with smooth system/manual dark mode toggles.

## 🛠️ Tech Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Animations**: Framer Motion
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React

## ⚙️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 3. Production Build
```bash
npm run build
npm start
```
