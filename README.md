# Fotobook generator

Select images from your computer and generate lots of collages.
Export as Powerpoint

## How to build

doesnt work: - `npm run dev` => Serve the svelte app over HTTP with live reload. Visit http://localhost:5000.
- `npm run electron` => Compiles the svelte app & opens it in Electron.
- `npm run electron-dev` => Compiles the svelte app & open it in Electron with live reload.
- `npm run dist-darwin` => Builds a OS X app. Open it with `open dist/mac/template-electron-svelte.app/`.


build for windows, but with tens of thousands of files:
````
{npm install electron-packager -g}

electron-packager ./ fotobuchbauer --platform=win32
````


    https://stackoverflow.com/a/69054528

    electron-builder --win portable