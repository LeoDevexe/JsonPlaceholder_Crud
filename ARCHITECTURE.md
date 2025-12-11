# Arquitectura del Proyecto

## Visión General

Este proyecto implementa una **Arquitectura Hexagonal** (también conocida como Ports & Adapters), que es un patrón de arquitectura de software que permite crear aplicaciones mantenibles, testeables y escalables.

## Principios Fundamentales

### 1. Separación de Responsabilidades

Cada capa tiene una responsabilidad específica y bien definida:

- **Domain**: Define el modelo de negocio
- **Application**: Implementa la lógica de negocio
- **Infrastructure**: Maneja detalles técnicos
- **Presentation**: Gestiona la interfaz de usuario

### 2. Inversión de Dependencias

Las capas internas no dependen de las externas. Las dependencias siempre apuntan hacia adentro:

```
Presentation → Application → Domain
Infrastructure → Application → Domain
```

### 3. Independencia de Frameworks

El core de la aplicación (Domain y Application) no depende de frameworks externos. Esto permite:

- Cambiar frameworks sin afectar la lógica de negocio
- Testear la lógica sin frameworks
- Mayor flexibilidad y portabilidad

## Estructura de Capas

### 🎯 Domain Layer (Capa de Dominio)

**Ubicación**: `src/core/domain/`

Es el corazón de la aplicación. Contiene:

#### Entities (Entidades)
```typescript
// Post.entity.ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

Representan los conceptos principales del negocio.

#### Value Objects
```typescript
// Pagination.vo.ts
export class Pagination {
  constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}
}
```

Objetos inmutables que representan conceptos del dominio con lógica de validación.

#### Repository Interfaces
```typescript
// PostRepository.interface.ts
export interface PostRepository {
  findAll(): Promise<Post[]>;
  findById(id: number): Promise<Post>;
  create(post: CreatePostDto): Promise<Post>;
  update(post: UpdatePostDto): Promise<Post>;
  delete(id: number): Promise<void>;
}
```

Definen contratos para acceso a datos sin especificar la implementación.

### ⚙️ Application Layer (Capa de Aplicación)

**Ubicación**: `src/core/application/`

Orquesta la lógica de negocio. Contiene:

#### Use Cases
```typescript
// GetPosts.usecase.ts
export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  
  async execute(page: number, limit: number): Promise<Post[]> {
    // Lógica del caso de uso
  }
}
```

Cada caso de uso representa una acción específica del usuario.

#### Services
```typescript
// PostService.ts
export class PostService implements PostServiceInputPort {
  constructor(private readonly postRepository: PostRepository) {}
  
  async getPosts(): Promise<Post[]> {
    return await this.getPostsUseCase.execute();
  }
}
```

Servicios de aplicación que coordinan casos de uso.

#### Ports (Puertos)

**Input Ports**: Interfaces que expone la aplicación
```typescript
export interface PostServiceInputPort {
  getPosts(): Promise<Post[]>;
}
```

**Output Ports**: Interfaces que la aplicación necesita
```typescript
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
}
```

### 🔧 Infrastructure Layer (Capa de Infraestructura)

**Ubicación**: `src/infrastructure/`

Implementa los detalles técnicos. Contiene:

#### Adapters
```typescript
// AxiosHttpClient.adapter.ts
export class AxiosHttpClientAdapter implements HttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }
}
```

Implementaciones concretas de los ports definidos en Application.

#### Repository Implementations
```typescript
// JsonPlaceholderPostRepository.ts
export class JsonPlaceholderPostRepository implements PostRepository {
  constructor(private readonly httpClient: HttpClient) {}
  
  async findAll(): Promise<Post[]> {
    const data = await this.httpClient.get('/posts');
    return PostMapper.toDomainList(data);
  }
}
```

#### Mappers
```typescript
// PostMapper.ts
export class PostMapper {
  static toDomain(data: any): Post {
    return {
      id: Number(data.id),
      userId: Number(data.userId),
      title: String(data.title),
      body: String(data.body),
    };
  }
}
```

Transforman datos entre diferentes representaciones.

### 🎨 Presentation Layer (Capa de Presentación)

**Ubicación**: `src/presentation/`

Gestiona la interfaz de usuario. Contiene:

#### Components
```typescript
// PostsTable.tsx
export const PostsTable = () => {
  const { posts, loading } = usePostContext();
  return <Table data={posts} loading={loading} />;
};
```

Componentes React organizados por tipo:
- `common/`: Componentes reutilizables
- `layout/`: Componentes de estructura
- `features/`: Componentes específicos de funcionalidad

#### Context
```typescript
// PostContext.tsx
export const PostProvider = ({ children, postService }) => {
  // Lógica de estado global
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
```

Gestión de estado global con React Context API.

#### Hooks
```typescript
// usePostContext.ts
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext must be used within PostProvider');
  return context;
};
```

Custom hooks para lógica reutilizable.

## Flujo de Datos

### 1. Lectura de Datos (Query)

```
User Interaction
    ↓
Component (Presentation)
    ↓
Context/Hook
    ↓
Service (Application)
    ↓
Use Case (Application)
    ↓
Repository Interface (Domain)
    ↓
Repository Implementation (Infrastructure)
    ↓
HTTP Adapter (Infrastructure)
    ↓
External API
```

### 2. Escritura de Datos (Command)

```
User Action
    ↓
Component Event Handler
    ↓
Context Method
    ↓
Service Method
    ↓
Use Case
    ↓
Repository
    ↓
HTTP Client
    ↓
API
    ↓
Update Local State
    ↓
Re-render Components
```

## Inyección de Dependencias

La aplicación utiliza inyección de dependencias manual:

```typescript
// AppProviders.tsx
const httpClient = new AxiosHttpClientAdapter();
const postRepository = new JsonPlaceholderPostRepository(httpClient);
const postService = new PostService(postRepository);

<PostProvider postService={postService}>
  {children}
</PostProvider>
```

Esto permite:
- Fácil testing con mocks
- Flexibilidad para cambiar implementaciones
- Menor acoplamiento entre componentes

## Patrones de Diseño Utilizados

### 1. Repository Pattern
Abstrae el acceso a datos detrás de interfaces.

### 2. Dependency Injection
Las dependencias se inyectan en lugar de crearse internamente.

### 3. Adapter Pattern
Los adapters convierten interfaces externas a las esperadas por la aplicación.

### 4. Factory Pattern
Se usa para crear instancias de Value Objects.

### 5. Provider Pattern
React Context actúa como proveedor de dependencias y estado.

## Beneficios de esta Arquitectura

### ✅ Testeable
- Cada capa se puede testear independientemente
- Fácil crear mocks de dependencias
- Tests más rápidos y confiables

### ✅ Mantenible
- Cambios en una capa no afectan a otras
- Código organizado y fácil de encontrar
- Responsabilidades claras

### ✅ Escalable
- Fácil agregar nuevas features
- Posible trabajar en paralelo en diferentes capas
- Preparado para crecer

### ✅ Flexible
- Fácil cambiar implementaciones
- Independiente de frameworks
- Adaptable a nuevos requisitos

## Convenciones de Código

### Nomenclatura

- **Entities**: `*.entity.ts`
- **Value Objects**: `*.vo.ts`
- **Use Cases**: `*.usecase.ts`
- **Services**: `*.service.ts`
- **Repositories**: `*Repository.interface.ts` (interfaces), `*Repository.ts` (implementaciones)
- **Adapters**: `*.adapter.ts`
- **Mappers**: `*Mapper.ts`

### Organización de Archivos

Cada feature/módulo tiene su propio directorio con:
```
feature/
├── FeatureComponent.tsx
├── FeatureComponent.test.tsx
├── hooks/
│   └── useFeature.ts
├── components/
│   └── FeatureSubComponent.tsx
└── index.ts (barrel export)
```

### Exports

Usar barrel exports (`index.ts`) para facilitar imports:

```typescript
// En lugar de:
import { Post } from '@domain/entities/Post.entity';
import { User } from '@domain/entities/User.entity';

// Hacer:
import { Post, User } from '@domain/entities';
```

## Testing

### Unit Tests
Testean lógica aislada sin dependencias externas.

```typescript
describe('GetPostsUseCase', () => {
  it('should return posts', async () => {
    const mockRepository = createMockRepository();
    const useCase = new GetPostsUseCase(mockRepository);
    const result = await useCase.execute();
    expect(result).toBeDefined();
  });
});
```

### Integration Tests
Testean interacción entre capas.

```typescript
describe('PostService Integration', () => {
  it('should fetch and transform posts', async () => {
    const httpClient = new MockHttpClient();
    const repository = new PostRepository(httpClient);
    const service = new PostService(repository);
    const posts = await service.getPosts();
    expect(posts).toHaveLength(10);
  });
});
```

## Conclusión

Esta arquitectura proporciona una base sólida para construir aplicaciones enterprise-level con React. La separación clara de responsabilidades, junto con los principios SOLID, garantiza que el código sea mantenible y escalable a largo plazo.

