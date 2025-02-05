# Buscador de Recetas de Comida  

## Descripcion
Página web que permite buscar recetas de comida utilizando la API de TheMealDB. 
Los usuarios seleccionan una categoría de platillos desde un menú desplegable y se muestran los resultados en tarjetas con la imagen, nombre y un botón para ver más detalles. 
Al hacer clic en "Ver más", aparece un modal de Bootstrap con la descripción, ingredientes y cantidades del platillo, además de opciones para agregarlo o eliminarlo de favoritos. 
Los platillos favoritos se guardan en Local Storage y pueden consultarse en una página separada. Se utiliza HTML, Bootstrap, CSS personalizado y JavaScript para la funcionalidad.

## Características  
- **Búsqueda por categoría**:  
  - Se obtiene la lista de categorías desde la API.  
  - El usuario selecciona una categoría y se muestran recetas en tarjetas.  
- **Detalles de la receta**:  
  - Imagen, nombre, descripción, ingredientes y cantidades.  
  - Se muestra en un **modal de Bootstrap**.  
- **Sistema de favoritos**:  
  - Los usuarios pueden guardar recetas en favoritos.  
  - Los favoritos se almacenan en **Local Storage**.  
  - Página especial para ver todas las recetas favoritas.  
  - Opción para eliminar recetas de favoritos.  
- **Interfaz optimizada** con **Bootstrap y CSS personalizado**.  

## Tecnologías Utilizadas  
- **HTML5**  
- **Bootstrap** (estilos y modales)  
- **CSS personalizado**  
- **JavaScript** (manejo de API y lógica de la app)  
- **API TheMealDB** (para obtener recetas)  
- **Local Storage** (para guardar favoritos)  

## Instalación y Uso  
1. Clona este repositorio:  
   ```bash
   git clone https://github.com/Hugo9591/BuscadorRecetas.git

Abre el archivo index.html en tu navegador.
Selecciona una categoría del menú desplegable.
Explora las recetas y usa el botón "Ver más" para detalles.
Guarda recetas en favoritos y consultalos despues.
- Notas
Necesitas una clave de API de TheMealDB. Puedes obtenerla en:
https://www.themealdb.com/api.php
