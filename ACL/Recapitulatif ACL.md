name: Deploy Vite site to GitHub Pages

on:
  push:
    branches: [ gh-pages ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      # Récupération du repo
      - name: Checkout
        uses: actions/checkout@v4

      # Installation de Node
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      # Aller dans le bon dossier
      - name: Install dependencies
        working-directory: siteweb/lessonApp
        run: npm install

      - name: Build Vite
        working-directory: siteweb/lessonApp
        run: npm run build

      # Upload artifact pour déploiement
      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: siteweb/lessonApp/dist

  deploy:
    runs-on: ubuntu-latest
    needs: build

    permissions:
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
