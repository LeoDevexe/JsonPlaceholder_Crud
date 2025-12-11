# JSONPlaceholder CRUD

Aplicación web responsive desarrollada con React, TypeScript y arquitectura hexagonal para realizar operaciones CRUD sobre la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## 🚀 Características

- ✅ **CRUD completo** de posts (Crear, Leer, Actualizar, Eliminar)
- ✅ **Tabla de datos** con Material-UI DataGrid
- ✅ **Paginación del lado del servidor** (simulada)
- ✅ **Ordenamiento ascendente/descendente** por columnas
- ✅ **Filtros avanzados** por columna con múltiples operadores:
  - Contiene
  - No Contiene
  - Igual
  - No Igual
  - Empieza con
  - Termina con
- ✅ **Responsive Design** para móviles, tablets y desktop
- ✅ **Arquitectura Hexagonal** (Clean Architecture)
- ✅ **React Context** para gestión de estado
- ✅ **TypeScript** para tipado fuerte
- ✅ **Material-UI** como biblioteca de componentes

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** v18 o superior
- **npm** v9 o superior (incluido con Node.js)

Para verificar las versiones instaladas:

```bash
node --version
npm --version
```

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd jsonplaceholder-crud
```

### 2. Instalar dependencias

⚠️ **Importante**: Usa el flag `--legacy-peer-deps` para evitar conflictos de dependencias:

```bash
npm install --legacy-peer-deps
```

Este comando instalará todas las dependencias necesarias especificadas en `package.json`.

## 🏃‍♂️ Ejecución

### Modo Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

El modo desarrollo incluye:
- Hot Module Replacement (HMR)
- Logs de desarrollo en consola
- Recargas automáticas al guardar cambios

### Compilación para Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Vista Previa de Producción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

## 🧪 Testing

### Ejecutar tests

```bash
npm run test
```

### Tests con interfaz UI

```bash
npm run test:ui
```

### Cobertura de tests

```bash
npm run test:coverage
```

## 📐 Arquitectura

El proyecto sigue los principios de **Arquitectura Hexagonal (Ports & Adapters)**, separando las responsabilidades en capas claramente definidas:

```
src/
├── core/                      # Lógica de negocio
│   ├── domain/               # Entidades, repositorios, value objects
│   └── application/          # Casos de uso, servicios, ports
├── infrastructure/           # Implementaciones técnicas
│   ├── adapters/            # HTTP, repositories, logger
│   ├── config/              # Configuración
│   └── mappers/             # Transformación de datos
├── presentation/            # Interfaz de usuario
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas
│   ├── context/           # Context API
│   ├── hooks/             # Custom hooks
│   ├── routes/            # Configuración de rutas
│   └── styles/            # Estilos y tema
└── shared/                # Código compartido
    ├── types/            # Tipos TypeScript
    ├── enums/            # Enumeraciones
    ├── constants/        # Constantes
    └── utils/            # Utilidades
```

### Capas de la Arquitectura

1. **Domain (Dominio)**: Contiene las entidades del negocio y las interfaces de los repositorios. Es independiente de frameworks y tecnologías.

2. **Application (Aplicación)**: Contiene los casos de uso y la lógica de negocio. Define los puertos (interfaces) que serán implementados por la capa de infraestructura.

3. **Infrastructure (Infraestructura)**: Implementa los adaptadores para servicios externos (HTTP, base de datos, etc.). Depende del dominio pero el dominio no depende de ella.

4. **Presentation (Presentación)**: Contiene los componentes visuales y la lógica de UI. Interactúa con la capa de aplicación a través de los servicios.

## 🎨 Stack Tecnológico

- **React 18**: Biblioteca para construcción de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Build tool y dev server ultrarrápido
- **Material-UI (MUI)**: Biblioteca de componentes UI
- **React Router**: Navegación en la aplicación
- **Axios**: Cliente HTTP para consumir APIs
- **React Query**: Gestión de estado del servidor
- **Emotion**: CSS-in-JS para estilos

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter (ESLint) |
| `npm run format` | Formatea el código con Prettier |
| `npm test` | Ejecuta los tests |
| `npm run test:ui` | Ejecuta tests con interfaz visual |
| `npm run test:coverage` | Genera reporte de cobertura |

## 🌐 Configuración

El proyecto usa configuración basada en código en lugar de archivos `.env`. 

La configuración se encuentra en `src/infrastructure/config/environment.ts`:

```typescript
export const environment = {
  apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  appName: 'JSONPlaceholder CRUD',
  enableLogger: true,
};
```

Si necesitas modificar la configuración, edita este archivo directamente.

## 📱 Características de la Interfaz

### Tabla de Posts

- **Columnas ordenables**: Click en los encabezados para ordenar (ascendente/descendente)
- **Ordenamiento numérico correcto**: Los números se ordenan correctamente (1, 2, 3... 10, 11... 100)
- **Filtros por columna**: Sistema avanzado de filtrado con múltiples operadores
- **Paginación**: Configurable (5, 10, 25, 50, 100 registros por página)
- **Acciones**: Editar y eliminar posts directamente desde la tabla
- **Persistencia local**: Los cambios se guardan en localStorage del navegador
- **Badge "Nuevo"**: Identifica posts creados localmente

### Formularios

- **Validación en tiempo real**: Validación de campos antes de enviar
- **Feedback visual**: Mensajes de error claros
- **Diálogos modales**: Para crear y editar posts

### Responsive

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: Adaptación automática a tablets y desktop
- **Touch friendly**: Botones y controles optimizados para touch

## 🔧 Resolución de Problemas

### El puerto 3000 está en uso

Si el puerto 3000 está ocupado, puedes cambiar el puerto en `vite.config.ts`:

```typescript
server: {
  port: 3001, // Cambia a otro puerto
}
```

### Error al instalar dependencias

Si tienes problemas al instalar dependencias:

```bash
# Limpia el cache de npm
npm cache clean --force

# Elimina node_modules y package-lock.json
# En Windows:
rmdir /s /q node_modules
del package-lock.json

# En Mac/Linux:
rm -rf node_modules package-lock.json

# Reinstala las dependencias con el flag correcto
npm install --legacy-peer-deps
```

### Errores de TypeScript

Asegúrate de que tu editor esté usando la versión de TypeScript del proyecto:

```bash
# En VSCode, presiona Ctrl+Shift+P y busca:
# "TypeScript: Select TypeScript Version"
# Selecciona "Use Workspace Version"
```

## 👨‍💻 Principios de Desarrollo

El código sigue estos principios:

- **SOLID**: Principios de diseño orientado a objetos
- **Clean Code**: Código limpio y legible
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **Separation of Concerns**: Separación de responsabilidades
- **Dependency Injection**: Inyección de dependencias

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue si es necesario

---

## 📄 Documentación Adicional

- **[INSTALLATION.md](./INSTALLATION.md)**: Guía completa de instalación paso a paso
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Documentación detallada de la arquitectura hexagonal
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Guía para contribuir al proyecto

---

Desarrollado con ❤️ usando React y TypeScript
