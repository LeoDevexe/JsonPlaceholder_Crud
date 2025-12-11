# Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender cómo puedes colaborar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

## Cómo Contribuir

### 1. Fork del Repositorio

```bash
# Clona tu fork
git clone https://github.com/TU_USUARIO/jsonplaceholder-crud.git
cd jsonplaceholder-crud

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/USUARIO_ORIGINAL/jsonplaceholder-crud.git
```

### 2. Crea una Rama

```bash
# Crea una rama desde main
git checkout -b feature/mi-nueva-feature

# O para un bug fix
git checkout -b fix/descripcion-del-bug
```

### 3. Realiza tus Cambios

- Escribe código limpio y legible
- Sigue las convenciones del proyecto
- Agrega tests cuando sea apropiado
- Actualiza la documentación si es necesario

### 4. Commit tus Cambios

```bash
# Agrega los archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agrega filtro por fecha en posts"
```

#### Convención de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan el código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

### 5. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/mi-nueva-feature
```

Luego crea un Pull Request en GitHub.

## Configuración del Entorno

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
# Instala dependencias
# 2. Instalar (importante el flag)
npm install --legacy-peer-deps


# Inicia el servidor de desarrollo
npm run dev
```

### Verifica tu Entorno

```bash
# Ejecuta el linter
npm run lint

# Ejecuta los tests
npm test

# Compila el proyecto
npm run build
```

## Estándares de Código

### TypeScript

- Usa tipos explícitos cuando sea necesario
- Evita usar `any`, prefiere `unknown`
- Define interfaces para objetos complejos

```typescript
// ✅ Bueno
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User {
  // ...
}

// ❌ Malo
function getUser(id: any): any {
  // ...
}
```

### React

- Usa componentes funcionales con hooks
- Prefiere arrow functions para componentes
- Usa destructuring en props

```typescript
// ✅ Bueno
export const UserCard = ({ name, email }: UserCardProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// ❌ Malo
export function UserCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.email}</p>
    </div>
  );
}
```

### Arquitectura

- Respeta la estructura de capas
- No importes desde capas internas a externas
- Usa inyección de dependencias

```typescript
// ✅ Bueno - Infrastructure depende de Domain
export class PostRepository implements PostRepositoryInterface {
  constructor(private httpClient: HttpClient) {}
}

// ❌ Malo - Domain no debe depender de Infrastructure
export interface PostRepository {
  httpClient: AxiosInstance; // ❌ Axios es de infrastructure
}
```

### Naming Conventions

- **Components**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useUser.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Interfaces**: PascalCase (`UserRepository`)

### Estructura de Archivos

```
Feature/
├── Feature.tsx           # Componente principal
├── Feature.test.tsx      # Tests del componente
├── Feature.styles.ts     # Estilos (si se usan styled-components)
├── hooks/
│   └── useFeature.ts    # Custom hooks
├── components/          # Sub-componentes
│   └── SubComponent.tsx
└── index.ts            # Barrel export
```

## Proceso de Pull Request

### Antes de Crear el PR

- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] El linter no muestra errores
- [ ] Has actualizado la documentación
- [ ] Has agregado tests para nuevo código
- [ ] Has revisado tu propio código

```bash
# Verifica todo antes de crear el PR
npm run lint
npm test
npm run build
```

### Descripción del PR

Tu Pull Request debe incluir:

1. **Título descriptivo**: "feat: agrega ordenamiento por fecha"
2. **Descripción detallada**:
   - ¿Qué problema resuelve?
   - ¿Cómo lo resuelve?
   - ¿Hay breaking changes?
   - Screenshots (si aplica)

Ejemplo:

```markdown
## Descripción
Agrega la funcionalidad de ordenar posts por fecha de creación.

## Cambios
- Nuevo campo `createdAt` en la entidad Post
- Componente de ordenamiento en la tabla
- Tests unitarios para el ordenamiento

## Screenshots
[Imagen del nuevo control de ordenamiento]

## Checklist
- [x] Tests agregados
- [x] Documentación actualizada
- [x] No hay breaking changes
```

### Revisión de Código

- Se requiere al menos una aprobación
- Responde a los comentarios de manera constructiva
- Haz los cambios solicitados
- Re-solicita revisión después de cambios

## Reportar Bugs

### Antes de Reportar

1. Busca en los issues existentes
2. Verifica que sea un bug y no una feature faltante
3. Reproduce el bug en la última versión

### Template de Bug Report

```markdown
## Descripción del Bug
[Descripción clara y concisa del bug]

## Pasos para Reproducir
1. Ve a '...'
2. Haz click en '...'
3. Observa el error

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Screenshots
[Si aplica]

## Entorno
- SO: [e.g. Windows 10]
- Navegador: [e.g. Chrome 120]
- Versión de Node: [e.g. 18.0.0]

## Información Adicional
[Cualquier otro contexto útil]
```

## Sugerir Mejoras

### Template de Feature Request

```markdown
## Descripción de la Feature
[Descripción clara de la funcionalidad propuesta]

## Problema que Resuelve
[¿Qué problema o necesidad aborda?]

## Solución Propuesta
[Cómo funcionaría la feature]

## Alternativas Consideradas
[Otras formas de resolver el problema]

## Información Adicional
[Mockups, ejemplos, etc.]
```

## Estilo de Código

### Prettier

El proyecto usa Prettier para formateo automático:

```bash
# Formatea todo el código
npm run format
```

### ESLint

Para mantener calidad de código:

```bash
# Ejecuta el linter
npm run lint
```

## Testing

### Escribiendo Tests

```typescript
// Feature.test.tsx
import { render, screen } from '@testing-library/react';
import { Feature } from './Feature';

describe('Feature', () => {
  it('should render correctly', () => {
    render(<Feature />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const { user } = render(<Feature />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

### Cobertura de Tests

Mantenemos una cobertura mínima del 70%:

```bash
npm run test:coverage
```

## Comunicación

- **Issues**: Para bugs y features
- **Discussions**: Para preguntas y discusiones generales
- **Pull Requests**: Para contribuciones de código

## Agradecimientos

Gracias por contribuir y ayudar a mejorar este proyecto. ¡Tu tiempo y esfuerzo son muy apreciados! 🎉

---

¿Preguntas? Abre un issue o inicia una discusión.

