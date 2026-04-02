# Pick-One Initiative — Website

A clean, modular, multi-page static website for the **Pick-One** grassroots NGO.

## 📁 Project Structure

```
pick-one/
├── index.html            # Home page
├── about.html            # About the initiative & founder
├── programs.html         # All three programmes
├── impact.html           # Stats, stories & objectives
├── contact.html          # Contact form & info
├── vercel.json           # Vercel deployment config
├── .gitignore
├── README.md
├── assets/
│   ├── css/
│   │   ├── main.css        # Variables, reset, typography, utilities
│   │   ├── layout.css      # Header, footer, nav
│   │   ├── components.css  # Buttons, cards, forms, stat blocks
│   │   └── pages/          # Page-specific stylesheets
│   ├── js/
│   │   ├── main.js         # Nav, scroll, active links
│   │   ├── animations.js   # Scroll reveal & counters
│   │   ├── components.js   # Partial injection (header/footer)
│   │   └── pages/          # Page-specific scripts
│   └── images/
│       ├── wells/          # Well photos (add your own)
│       └── students/       # Beneficiary photos (add your own)
└── partials/
    ├── header.html         # Shared nav
    └── footer.html         # Shared footer
```

## 🚀 Running Locally

The shared header/footer are injected via `fetch()` which requires an HTTP
server. Open the project with any static server:

```bash
npx -y serve .
```

Then open [http://localhost:3000](http://localhost:3000).

> **Note:** Opening `index.html` directly via `file://` will render all page
> content correctly, but the shared header/footer partials won't load
> (CORS restriction). Use a local server for full testing.

## ☁️ Deploying to Vercel

1. Push the project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Leave build settings empty (no build command, no output directory).
4. Click **Deploy**.

`vercel.json` is already configured with clean URLs and security headers.

## ✏️ Adding Real Photos

Replace the photo placeholders in `impact.html` by:

1. Adding your images to `assets/images/wells/` or `assets/images/students/`.
2. Replacing the `.photo-placeholder` `<div>` elements with `<img>` tags.

## 🎨 Design System

All design tokens are in `assets/css/main.css` under `:root`. To adjust
the colour palette or typography, edit that file only.

| Token             | Value               | Purpose           |
| ----------------- | ------------------- | ----------------- |
| `--color-primary` | `#1a3d2b`           | Deep forest green |
| `--color-accent`  | `#5bbf8a`           | Mint accent       |
| `--font-heading`  | Bricolage Grotesque | Headings          |
| `--font-body`     | Inter Tight         | Body text         |
