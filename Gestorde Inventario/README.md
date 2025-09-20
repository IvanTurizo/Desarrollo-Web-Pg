# Gestor de Inventario para Tienda Pequeña

Un sistema completo de gestión de inventario desarrollado con JavaScript, jQuery y Bootstrap, diseñado específicamente para pequeñas tiendas.

## 🚀 Características Principales

### 📊 Dashboard Intuitivo
- Estadísticas en tiempo real del inventario
- Resumen de productos totales, valor del inventario y stock bajo
- Vista de productos recientes
- Interfaz moderna y responsive

### 📦 Gestión de Productos
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Validación de formularios** con HTML5 y JavaScript
- **Control de stock** con alertas de stock bajo
- **Categorización** de productos
- **Búsqueda y filtros** avanzados
- **Imágenes de productos** opcionales

### 🏷️ Sistema de Categorías
- Gestión completa de categorías
- Asociación de productos con categorías
- Validación para evitar eliminación de categorías con productos

### 📈 Reportes y Exportación
- **Exportación a JSON** para respaldo completo
- **Exportación a CSV** para análisis en Excel
- **Importación de datos** desde archivos JSON
- Interfaz de importación/exportación intuitiva

### 📱 Diseño Responsive
- Compatible con dispositivos móviles y tablets
- Interfaz adaptativa usando Bootstrap 5
- Navegación optimizada para pantallas pequeñas

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos personalizados y animaciones
- **Bootstrap 5**: Framework CSS responsive
- **JavaScript ES6+**: Lógica de la aplicación
- **jQuery 3.7**: Manipulación del DOM y eventos
- **Bootstrap Icons**: Iconografía consistente
- **LocalStorage**: Persistencia de datos local

## 📁 Estructura del Proyecto

```
Gestor de Inventario/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Lógica de la aplicación
└── README.md           # Documentación
```

## 🚀 Instalación y Uso

1. **Clona o descarga** el proyecto
2. **Abre** `index.html` en tu navegador web
3. **¡Listo!** El sistema está listo para usar

No requiere instalación de dependencias ni servidor web.

## 📖 Guía de Uso

### Primeros Pasos

1. **Accede al Dashboard** para ver el resumen general
2. **Crea categorías** en la sección "Categorías"
3. **Registra productos** en la sección "Productos"
4. **Configura el stock mínimo** para cada producto

### Gestión de Productos

#### Agregar Producto
1. Haz clic en "Nuevo Producto"
2. Completa los campos obligatorios (*)
3. Selecciona una categoría
4. Establece precio y stock
5. Guarda el producto

#### Editar Producto
1. Haz clic en el ícono de editar (lápiz)
2. Modifica los campos necesarios
3. Guarda los cambios

#### Eliminar Producto
1. Haz clic en el ícono de eliminar (basura)
2. Confirma la eliminación

### Búsqueda y Filtros

- **Búsqueda por texto**: Busca por nombre o descripción
- **Filtro por categoría**: Muestra solo productos de una categoría
- **Filtro por stock**: Filtra por stock bajo o sin stock

### Gestión de Categorías

#### Agregar Categoría
1. Ve a la sección "Categorías"
2. Haz clic en "Nueva Categoría"
3. Completa nombre y descripción
4. Guarda la categoría

#### Editar/Eliminar Categoría
- Similar a los productos
- **Nota**: No se pueden eliminar categorías con productos asociados

### Exportación e Importación

#### Exportar Datos
1. Ve a la sección "Reportes"
2. Selecciona formato (JSON o CSV)
3. Descarga el archivo

#### Importar Datos
1. Ve a la sección "Reportes"
2. Selecciona archivo JSON
3. Confirma la importación

## 🎨 Características de Diseño

### Colores y Temas
- **Primario**: Azul (#0d6efd)
- **Éxito**: Verde (#198754)
- **Advertencia**: Amarillo (#ffc107)
- **Peligro**: Rojo (#dc3545)
- **Info**: Cian (#0dcaf0)

### Componentes
- **Cards** con sombras y efectos hover
- **Tablas** responsivas con ordenamiento
- **Modales** para formularios
- **Alertas** para notificaciones
- **Badges** para estados

### Responsive Design
- **Mobile First**: Optimizado para móviles
- **Breakpoints**: Adaptación a diferentes pantallas
- **Navegación**: Menú colapsable en móviles

## 🔧 Funcionalidades Técnicas

### Persistencia de Datos
- **LocalStorage**: Almacenamiento local del navegador
- **JSON**: Formato de datos estructurado
- **Backup**: Exportación para respaldo

### Validaciones
- **HTML5**: Validación nativa del navegador
- **JavaScript**: Validación personalizada
- **Formularios**: Campos obligatorios y tipos de datos

### Rendimiento
- **jQuery**: Manipulación eficiente del DOM
- **Event Delegation**: Gestión optimizada de eventos
- **Lazy Loading**: Carga de datos bajo demanda

## 📊 Métricas del Dashboard

- **Total de Productos**: Contador de productos registrados
- **Valor Total**: Suma del valor de todo el inventario
- **Stock Bajo**: Productos con stock menor al mínimo
- **Categorías**: Número total de categorías

## 🔒 Seguridad y Privacidad

- **Datos Locales**: Toda la información se almacena localmente
- **Sin Servidor**: No se envían datos a servidores externos
- **Privacidad**: Control total sobre los datos

## 🚀 Próximas Mejoras

- [ ] Gráficos y estadísticas avanzadas
- [ ] Sistema de usuarios y permisos
- [ ] Notificaciones push
- [ ] Integración con códigos de barras
- [ ] Reportes en PDF
- [ ] Sincronización en la nube
- [ ] API REST para integraciones

## 🤝 Contribuciones

Este es un proyecto de código abierto. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor

Desarrollado como un proyecto educativo para demostrar el uso práctico de JavaScript, jQuery y Bootstrap en aplicaciones web reales.

---

**¡Gracias por usar el Gestor de Inventario!** 🎉

Para soporte o preguntas, por favor abre un issue en el repositorio.
