# UniEvent

## Stack
Next.js 16 (App Router, Turbopack) + React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), ESLint. Ruteo con el App Router de Next.js (`src/app/`) — navegación con `next/link` y `useRouter` de `next/navigation`, no con estado manual. Sin librería de manejo de estado global, sin cliente HTTP (todavía no se usa axios/fetch). Se usa `jspdf` para la generación de certificados.

Base de datos: ninguna en este repo — es solo frontend. Todos los datos (cursos, eventos, actividades) están **hardcodeados/mockeados inline** en los componentes de vista, no hay integración con un backend todavía.

## Contexto de negocio
Plataforma universitaria para gestionar y promocionar eventos/cursos extracurriculares, con inscripción de estudiantes, seguimiento de actividades y emisión de certificados. Proyecto de grado (tesis), usuario principal por ahora: estudiante.

## Cosas que NO debe olvidar / bugs pasados
- Ruteo con Next.js App Router: las rutas viven en `src/app/`. El grupo `(main)` (`src/app/(main)/layout.jsx`) envuelve Home/Login/Register/Recover/Cursos/Eventos con `Navbar`+`Footer`; `src/app/student-dashboard/` no usa ese layout porque el Dashboard trae su propio Sidebar/header. Para agregar una vista nueva hay que crear `src/app/<ruta>/page.jsx` (o dentro del grupo `(main)` si debe llevar Navbar/Footer) que renderice el componente de `src/views/`, no asumir que existe un `useState` central en `App.jsx` (ya no existe).
- Casi todos los componentes bajo `src/components/` y `src/views/` son interactivos (hooks, `onClick`, formularios) y llevan `'use client'` como primera línea del archivo. Si se agrega un componente nuevo con `useState`/`useEffect`/handlers de evento propios, hay que agregarle esa directiva.
- Los imports de imágenes (`import x from '../assets/...png'`) son objetos en Next (`{ src, width, height }`), no strings — hay que usar `x.src` en el `src` del `<img>` (o migrar a `next/image`, no usado todavía).
- Los datos de cursos/eventos (`EventsBoard.jsx`) y de actividades del estudiante son arrays hardcodeados dentro del componente — cualquier "bug de datos" reportado es de estos mocks, no de un backend.
- No hay backend ni base de datos conectados desde este repo; si se agrega integración con API, definir aquí la URL/env var usada.
- No hay suite de tests configurada (sin script `test` en `package.json`).
- Next.js agrega automáticamente un bloque de reglas para agentes de IA al final de este archivo cada vez que corre `next dev` (delimitado por comentarios HTML propios, ver `node_modules/next/dist/server/lib/generate-agent-files.js`). Es intencional y queda en inglés porque lo regenera la herramienta; no lo borres del diff ni intentes traducirlo a mano — solo vuelve a aparecer.

## Convenciones de este proyecto
- Rutas en `src/app/` (App Router): cada carpeta con `page.jsx` es una ruta; `page.jsx` normalmente solo importa y renderiza el componente real desde `src/views/`.
- Vistas en `src/views/<Nombre>/<Nombre>View.jsx`, con subcomponentes propios de esa vista en `src/views/<Nombre>/components/`. Es la lógica/UI real; la vista sigue viviendo ahí, la ruta en `src/app/` solo la expone en una URL.
- Vistas específicas del rol estudiante viven en `src/views/Student/<Seccion>/`.
- Componentes reutilizables genéricos en `src/components/` (ej. `Button`, `Checkbox`, `InputField`, `Navbar`, `Footer`); variantes de input específicas en `src/components/input/types/`.
- Estilos con Tailwind utility classes directamente en JSX; `src/app/globals.css` solo para lo global.
- Formularios multi-paso (ej. registro) se dividen en componentes `Step*.jsx` con un `StepIndicator.jsx` compartido.

## Comandos frecuentes
- `npm run dev` — servidor de desarrollo (Next.js + Turbopack).
- `npm run build` — build de producción.
- `npm run start` — servir el build de producción.
- `npm run lint` — ESLint.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
