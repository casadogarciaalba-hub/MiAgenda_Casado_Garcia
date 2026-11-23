# MiAgenda · Angular básico

Práctica de DWEC — Alba Casado García (2º DAW)

App Angular de un solo componente (`App`) que convierte la maqueta de MiAgenda en una agenda que funciona.

## Cómo arrancarla

```bash
npm install
npx ng serve
```

Y abrir http://localhost:4200

## Qué hace

- Las 8 tarjetas salen de `public/contactos.json` (se lee con `fetch` + `async/await`). En `app.html` hay una sola tarjeta dentro de un `@for`.
- Iniciales con `iniciales()` (`split`, `slice`, `map`, `join`) y enlace de correo con `[href]`.
- La estrella usa `@if / @else` y `(click)`: `cambiarFavorito()` crea una lista nueva con `update()`, `map()` y spread. El menú muestra `Favoritos (N)` con un `computed`.
- Buscador con `#caja` + `(input)` que guarda el texto en el signal `busqueda`; `filtrados` es un `computed` con `filter`, `toLowerCase()` e `includes()`. Si no hay resultados sale el `@empty`.

## Retos extra

1. **Filtro por grupo**: botones Todos, Clase, Familia y Trabajo que se combinan con el buscador.
2. **Favoritos que sobreviven a F5**: se guardan en `localStorage` y se recuperan al cargar.

## Archivos que he tocado

- `src/index.html` (solo el `<link>` de Bootstrap)
- `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`
- `public/contactos.json`
