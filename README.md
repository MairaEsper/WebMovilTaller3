# WebMovilTaller3

### Grupo 6

### Integrantes:
- Felipe Blanco Pizarro | 21.301.314-9
- Guillermo Bustamante Rodríguez | 20.460.106-2
- Maira Cortés Araya | 21.324.438-8
- Francisco Plaza Pizarro | 20.007.355-K

---
### Descripción del proyecto
Se realizó una aplicación web de gestión de inventario de productos. Para ello se visualiza un dashboard principal con la información de los productos en distintos tipos de gráficos.
---
### Instalación y ejecución local
1. Entrar en dashboard e instalar paquetes.
```
cd dashboard
npm install
```

2. Abrir Docker y ejecutar contenedor con base de datos de MongoDB.
```
docker run --name datamobile-mongo -p 27017:27017 -d mongo
```

3. Asegurarse de tener el archivo .env con el siguiente contenido:
```
MONGODB_URI=mongodb://localhost:27017/datamobile_db
```

4. Ejecutar la aplicación.
```
npm run dev
```