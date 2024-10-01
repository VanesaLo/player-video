# Instrucciones para Comenzar

### Instalación de dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
pnpm install
```

### Migrar la base de datos

Aplica las migraciones necesarias para la base de datos:

```bash
pnpm migrate
```

### Cargar datos iniciales (seed)

Para cargar los datos iniciales en la base de datos:

```bash
pnpm seed
```

### Iniciar el servidor de desarrollo

Una vez configurado, puedes iniciar el servidor de desarrollo con:

```bash
pnpm dev
```

## Comandos Adicionales

### Iniciar migración manual

Si necesitas crear o aplicar una migración nueva:

```bash
npx prisma migrate dev --name init
```

### Abrir Prisma Studio

Prisma Studio es una interfaz visual para explorar y editar tu base de datos:

```bash
npx prisma studio
```
