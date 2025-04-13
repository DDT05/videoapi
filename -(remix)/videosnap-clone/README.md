# VideoSnap AI Clone

A modern, responsive clone of VideoSnap AI website with interactive animations and functional file upload.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Interactive File Upload**: Drag-and-drop functionality with validation
- **Animations**: Smooth transitions and animations powered by Framer Motion
- **Pixel-Perfect UI**: Faithful recreation of the original VideoSnap AI design

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd videosnap-clone
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Build for Production

To build the project for production:

```bash
bun run build
```

The build output will be placed in the `dist` directory.

## Project Structure

- `/src/components` - React components
- `/src/assets` - Static assets
- `/public` - Public files that are copied to the build directory

## License

MIT

## Acknowledgements

- Original design inspiration from VideoSnap AI
- Icons provided by [Heroicons](https://heroicons.com/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
