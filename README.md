# Youssef Al-Ashry — Portfolio

A bilingual English and Arabic portfolio for Youssef Al-Ashry. It presents selected projects, services, work process, packages, and contact options.

## Built with

- React and TypeScript
- Vite
- Three.js and React Three Fiber for interactive 3D sections
- GSAP for motion and scroll interactions
- CSS for layout, responsive design, and themes

## Run locally

Requirements: Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

Vite prints the local development URL. Create and preview a production build with:

```sh
npm run build
npm run preview
```

## Deployment

The default build uses `/`, which works for a domain root such as Vercel. Vite also picks up the repository path automatically when a build runs in GitHub Actions.

For a manual GitHub Pages build in PowerShell:

```powershell
$env:VITE_BASE_PATH = "/my-portfolio/"
npm run build
```

Use the repository name in the path and keep the trailing slash. Public asset URLs are built from Vite's base path, so images, icons, and 3D resources work from a project subpath too.

## Project structure

```text
assets-source/
  models/                 Original 3D model used to create the browser asset
  project-previews/       Original project screenshots
public/
  draco/                  Draco decoder files for the 3D model
  images/                 Optimized previews and technology icons
  models/                 Browser assets used at runtime
scripts/                  Asset preparation scripts
src/
  components/             Page sections and reusable UI
  context/                Shared loading state
  i18n/                   English and Arabic content and language state
  utils/                  Shared helpers, including base-aware asset URLs
```

Edit the bilingual content and project descriptions in `src/i18n/translations.ts`. Update project links and filters in `src/components/Work.tsx`.

### Project preview images

The original PNG screenshots are kept in `assets-source/project-previews`; the site serves compressed JPEG copies from `public/images/projects`. On Windows, regenerate those copies with:

```sh
npm run optimize:previews
```

The originals stay intact. The production build only copies files from `public`, keeping the full-size source images out of the deployed site.

### 3D model

The original `character.glb` is stored outside `public` and is not copied into the deployed site. To regenerate the runtime file after replacing the model, run:

```sh
npm run encrypt:character
```

The browser decrypts this file, so the encryption key is part of the client application. Treat this as asset obfuscation only; never use it to protect secrets.

## Repository

[GitHub: yuossef-ashry/my-portfolio](https://github.com/yuossef-ashry/my-portfolio)
