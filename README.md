# 🧑‍💻 Portfolio Personal — Diego Tepichin

> Portafolio profesional personal construido con React, Vite y Tailwind CSS. Diseñado para mostrar proyectos de ingeniería de sistemas, automatización e infraestructura.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 🌐 Demo en vivo

> 🚀 **Próximamente** — En proceso de despliegue en Vercel/Netlify.

---

## 📋 Descripción

Portfolio web personal desarrollado con un stack moderno para presentar mi perfil profesional, proyectos de automatización e infraestructura y un formulario de contacto. Incluye:

- **Modo oscuro/claro** persistido en `localStorage`.
- **Navegación SPA** fluida con React Router.
- **Animaciones de entrada** con Framer Motion.
- **Formulario de contacto** validado con React Hook Form.
- **Diseño responsive** — mobile-first con Tailwind CSS v4.

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [React](https://react.dev/) | 19 | UI y gestión de estado |
| [Vite](https://vite.dev/) | 8 | Bundler y dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [React Router](https://reactrouter.com/) | 7 | Enrutamiento SPA |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animaciones |
| [React Hook Form](https://react-hook-form.com/) | 7 | Formulario y validaciones |

---

## 🚀 Instalación y uso local

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (v18 o superior) y `npm`.

### 1. Clona el repositorio

```bash
git clone https://github.com/DiegoTepichin/portfolio-web.git
cd portfolio-web
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Inicia el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en **`http://localhost:5173`**.

### 4. Build para producción

```bash
npm run build
```

Los archivos estáticos optimizados se generarán en la carpeta `dist/`.

---

## 📂 Estructura del Proyecto

```
src/
├── assets/             # Recursos estáticos
├── components/         # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación con toggle de tema
│   └── Footer.jsx      # Pie de página
├── context/
│   └── ThemeContext.jsx # Contexto y custom hook useTheme()
├── hooks/              # Custom hooks adicionales
├── pages/              # Componentes de página
│   ├── Home.jsx        # Página de inicio (Hero + Skills)
│   ├── Projects.jsx    # Cuadrícula de proyectos
│   └── Contact.jsx     # Formulario de contacto
├── utils/              # Funciones auxiliares
├── App.jsx             # Layout principal y configuración de rutas
└── main.jsx            # Punto de entrada
```

---

## 📬 Contacto

¿Tienes alguna propuesta o quieres colaborar?

- **GitHub**: [github.com/DiegoTepichin](https://github.com/DiegoTepichin)
- **LinkedIn**: [linkedin.com/in/diego-duron-tepichin](https://www.linkedin.com/in/diego-duron-tepichin)
- **Email**: [durontepichindiego@gmail.com](mailto:durontepichindiego@gmail.com)

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más información.
