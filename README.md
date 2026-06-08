# AA2-DI — Rick & Morty Dashboard

Aplicación web fullstack desarrollada como Actividad de Aprendizaje 2 de la asignatura Diseño de Interfaces (2º DAM).

## Descripción

Evolución del proyecto de la primera evaluación, incorporando autenticación con JWT, gestión de estado global, dashboards diferenciados por rol, testing automatizado y arquitectura monorepo con frontend y backend separados.

## Tecnologías

**Frontend**
- React + TypeScript
- Vite
- React Router DOM
- Vitest

**Backend**
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcryptjs

**Control de versiones**
- Git + Gitflow

## Estructura del proyecto


```
AA2-DI/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── data/
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── context/
    │   ├── reducers/
    │   ├── services/
    │   ├── guards/
    │   ├── components/
    │   ├── pages/
    │   └── tests/
    └── package.json
```

## Instalación y uso

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor en `http://localhost:3001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación en `http://localhost:5173`

### Tests

```bash
cd frontend
npx vitest run
```

## Funcionalidades

- Registro e inicio de sesión con JWT
- Persistencia de sesión con localStorage
- Protección de rutas por sesión y por rol
- Dashboard de personajes para usuarios
- Panel de administración para admins
- Páginas de episodios y localizaciones con filtros
- Navbar lateral con navegación entre páginas
- 6 tests automatizados con Vitest

## Endpoints del backend

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | /api/auth/register | Registro de usuario | Público |
| POST | /api/auth/login | Inicio de sesión | Público |
| GET | /api/auth/me | Datos del usuario actual | Autenticado |
| GET | /api/auth/users | Lista de usuarios | Solo admin |

## Control de versiones

El proyecto sigue la metodología **Gitflow**:
- `main` → versión estable (release 1.0.0)
- `develop` → rama de desarrollo
- `feature/*` → ramas de funcionalidades
