# hora-santa-cr-cantos

Repertorio de cantos para Hora Santa migrado a Vite + React.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: sirve la versión generada.
- `npm run lint`: ejecuta Oxlint.

## Cloudflare Pages

Configuración recomendada:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command: dejar vacío

No uses `npx wrangler deploy` como deploy command en Cloudflare Pages. Ese comando
intenta publicar un Worker y falla si la cuenta no tiene configurado un subdominio
`workers.dev` o una ruta de Worker.

## Contenido

Los datos migrados del sitio HTML original viven en `src/data/categories.json` y
`src/data/songs.json`.
