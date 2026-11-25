# Saran Kitchen 🍽️

A responsive, front-end online food ordering website built with **HTML, CSS and vanilla JavaScript**.

## Features
- Responsive layout for mobile, tablet and desktop
- Food menu with category filters and live search
- Add-to-cart and quantity controls
- Automatic subtotal, delivery fee and tax calculation
- Checkout form with basic validation
- Demo order confirmation and order history saved in browser `localStorage`
- Easy-to-edit menu, prices, images and theme

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. No server, package installation or build step is required.

## Publish with GitHub Pages
1. Create a GitHub repository named `saran-kitchen`.
2. Upload `index.html`, `css/`, `js/` and this `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish your site. The website link will appear in the Pages section.

## Customize
- Edit dishes, categories, prices and food photos in `js/menu.js`.
- Change delivery fee and tax rate at the top of `js/menu.js`.
- Change colours, fonts and layout in `css/style.css`.
- Change headings and page sections in `index.html`.

## Project structure
```text
saran-kitchen/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── menu.js
```

## Important note
This is a learning/demo project. Checkout does not process real payments or send orders to a restaurant. Orders are stored only in the visitor's browser. A real ordering service needs a secure backend, database and payment provider integration.

Made by **Saran**.
