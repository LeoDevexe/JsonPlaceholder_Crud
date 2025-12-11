# 📥 Guía de Instalación para Reclutadores

Esta guía proporciona instrucciones paso a paso para instalar y ejecutar el proyecto.

## ⚙️ Requisitos Previos

Antes de comenzar, verifica que tienes instalado:

- **Node.js** versión 18 o superior
- **npm** versión 9 o superior (viene con Node.js)

### Verificar versiones instaladas

```bash
node --version
# Debe mostrar v18.x.x o superior

npm --version
# Debe mostrar 9.x.x o superior
```

Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/)

## 📦 Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd jsonplaceholder-crud
```

### 2. Instalar Dependencias

⚠️ **MUY IMPORTANTE**: Usa el flag `--legacy-peer-deps`

```bash
npm install --legacy-peer-deps
```

**¿Por qué `--legacy-peer-deps`?**
- Resuelve conflictos menores de versiones entre dependencias
- Es completamente seguro y recomendado para este proyecto
- El proyecto funciona perfectamente con este flag

**Tiempo estimado**: 2-3 minutos (depende de tu conexión a internet)

### 3. Verificar la Instalación

```bash
# Verifica que node_modules se haya creado
ls node_modules
# o en Windows:
dir node_modules
```

Deberías ver una carpeta con muchas dependencias instaladas.

## 🚀 Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

**Resultado esperado:**
```
VITE v5.1.0  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Abrir en el Navegador

1. Abre tu navegador
2. Ve a: `http://localhost:3000`
3. Deberías ver la aplicación funcionando

## ✅ Verificar que Todo Funciona

Una vez que la aplicación esté corriendo:

1. **Ver la tabla de posts**: Deberías ver 100 posts cargados de la API
2. **Crear un post**: Click en "Nuevo Post" → Llenar formulario → Guardar
   - El post debería aparecer al inicio de la tabla con un badge "Nuevo"
3. **Editar un post**: Click en el ícono de lápiz azul → Modificar → Guardar
   - Los cambios deberían reflejarse inmediatamente
4. **Eliminar un post**: Click en el ícono de basura rojo → Confirmar
   - El post debería desaparecer de la tabla
5. **Ordenar columnas**: Click en los encabezados (ID, Usuario, etc.)
   - Los datos deberían ordenarse ascendente/descendente
6. **Filtrar datos**: 
   - Selecciona un campo (ej: Título)
   - Selecciona un operador (ej: Contiene)
   - Escribe un valor (ej: "qui")
   - Click en "Filtrar"
   - Deberías ver solo posts que cumplan el criterio
7. **Paginación**: Cambia las filas por página o navega entre páginas
   - Los datos deberían actualizarse correctamente

## 🎯 Funcionalidades Destacadas para Demostrar

### 1. Persistencia Local
- Crea un post nuevo
- Recarga la página (F5)
- ✅ El post creado sigue ahí

### 2. Ordenamiento Numérico Correcto
- Ordena por "Usuario" o "ID"
- ✅ Verás: 1, 2, 3... 9, 10, 11... 99, 100 (no "1, 10, 100, 2...")

### 3. Filtros Avanzados
- Prueba cada operador:
  - **Contiene**: Busca "qui" en Título → encuentra parcial
  - **Empieza con**: "sunt" en Título → solo los que empiezan así
  - **Termina con**: "rum" en Título → solo los que terminan así
  - **Igual**: ID "1" → exactamente el post con ID 1
  - **No igual**: ID "1" → todos excepto el ID 1

### 4. Múltiples Filtros Simultáneos
- Agrega filtro: Usuario = "1"
- Agrega filtro: Título contiene "qui"
- ✅ Solo posts del usuario 1 que contengan "qui" en el título

### 5. Limpiar Datos Locales
- Click en "Limpiar Datos"
- ✅ Todo vuelve al estado original de la API

## 🏗️ Otros Comandos Útiles

### Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Vista Previa de Producción

```bash
npm run preview
```

### Ejecutar Linter

```bash
npm run lint
```

### Formatear Código

```bash
npm run format
```

## 🐛 Solución de Problemas

### Error: "Puerto 3000 ya en uso"

**Solución 1**: Cierra la aplicación que está usando el puerto 3000

**Solución 2**: Cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 3001, // Cambia a 3001 u otro puerto
}
```

### Error al instalar dependencias

```bash
# Limpia todo y vuelve a intentar
npm cache clean --force
rm -rf node_modules package-lock.json  # Mac/Linux
# o
rmdir /s /q node_modules && del package-lock.json  # Windows

npm install --legacy-peer-deps
```

### La página no carga

1. Verifica que el servidor esté corriendo (deberías ver el mensaje de Vite en la terminal)
2. Verifica que no haya errores en la terminal
3. Abre las DevTools del navegador (F12) y revisa la consola

### Error de TypeScript en el editor

- Asegúrate de que VSCode esté usando la versión de TypeScript del workspace
- Presiona `Ctrl+Shift+P` → "TypeScript: Select TypeScript Version" → "Use Workspace Version"

## 📚 Documentación Adicional

- **README.md**: Visión general del proyecto
- **ARCHITECTURE.md**: Detalles de la arquitectura hexagonal
- **CONTRIBUTING.md**: Guía para contribuir al proyecto

## 📞 Contacto

Si tienes problemas durante la instalación o ejecución:

1. Revisa esta guía completa
2. Verifica que cumples los requisitos previos
3. Revisa los logs de error en la terminal
4. Verifica las DevTools del navegador (F12)

---

**Tiempo total estimado**: 5-10 minutos desde clonar hasta ver la aplicación funcionando.

¡Gracias por revisar este proyecto! 🎉

