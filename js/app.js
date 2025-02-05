function iniciarApp(){
    const selectCategorias = document.querySelector('#categorias');
    const resultado = document.querySelector('#resultado');

    const modal = new bootstrap.Modal('#modal', {});

    if(selectCategorias){//si exista el elemento

        obtenerCategorias();//LLena el select de opciones

        selectCategorias.addEventListener('change', seleccionarCategoria);
    }

    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv){
        obtenerFavoritos();
    }

    function obtenerCategorias(){
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';//Categorias enn la API

        fetch(url)
            .then( respuesta => respuesta.json())
            .then( resultado => {
                // console.log(resultado.categories);
                mostrarCategorias(resultado.categories)//Arreglo de objetos (idCategory: id, strCategory: categoria, strCategoryDescrciption:descripcion, img)
            })
    }

    //Mostrar categorias
    function mostrarCategorias( categorias = []){
        categorias.forEach( categoria => {

            const opcion = document.createElement('OPTION');
            opcion.value = categoria.strCategory;
            opcion.textContent = categoria.strCategory;

            //Agregar al HMTL
            selectCategorias.appendChild(opcion);
            
        });
    }

   
    function seleccionarCategoria(e){
        
        const categoria = e.target.value;//Nombre del option(Beef, Checken, Dessert)
        // console.log(e.target.value)
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;//Categoria es dinamica

            fetch(url)
                .then( respuesta => respuesta.json())
                .then( resultado => {
                    // console.log(resultado.meals);
                    mostrarRecetas(resultado.meals)});//Devuelve arreglo de objetos: Meals(idMeal: id, strMeal:nombre, strMealThumb:img)
    }

    //Mostrar recetas toma un arreglo si no hay, toma un arreglo vacio
    function mostrarRecetas(recetas = []){

        limpiarHTML(resultado);

        //Poner heading si no hay resultados o no
        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-3')
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        resultado.appendChild(heading);

        //Imprimir datos en tarjetas
        recetas.forEach(receta => {

            const {idMeal, strMeal, strMealThumb} = receta; 

            //contenedor
            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4', 'mb-4');

            //ConttenedorImagen
            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal ?? receta.titulo}`;
            recetaImagen.src = strMealThumb ?? receta.img;//si existe en la api, si no agrega lo que hay en el localStoage (Que es lo mismo)
            //Si no es un llamado a la api se comprueba lo qu hay en el localStorage

            //Cada card debe de tener un body
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            //Titulo
            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            //Boton
            const recetaBtn = document.createElement('BUTTON');
            recetaBtn.classList.add('btn', 'w-100', 'bg-gradient');
            recetaBtn.textContent = 'Ver Receta';
            // recetaBtn.dataset.bsTarget = '#modal';
            // recetaBtn.dataset.bsToggle = 'modal';

            //Consultar la API para  traer info de un platillo en especifico mediante si id
            recetaBtn.onclick =  function(){
                seleccionarReceta(idMeal ?? receta.id);
            }

            //Inyectar en el codigo HTML/Imprimir el orden del appenChild es el orden como queda en el html
            
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaBtn);
             
            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            //Se tiene que usa un elemento que ya exista en el HTML por ejemplo resultado
            resultado.appendChild(recetaContenedor);

            //console.log(recetaHeading);
            //console.log(recetaImagen);
        });
    }

    function seleccionarReceta(id){
        //Generar dinamicamente la url con base a la comida seleccionada
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then( respuesta =>  respuesta.json())
            .then( resultado => {
                // console.log(resultado.meals)
                mostraRecetaModal(resultado.meals[0])//Arreglo de objetos(idMeal, strMeal, strCategory, strArea, strInstructions, strThumb, strTags, strYoutub, strIngredients, strMeasure)
            })
    }


    function mostraRecetaModal(receta){
        
        const {idMeal, strInstructions, strMeal, strMealThumb} = receta;//No se usara toda la informacion(id, receta, nombre, imagen)

        //--------------------------------------------------------------------INSTRUCCIONES--------------------------------------
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
                <img class="img-fluid" src="${strMealThumb}" alt="Receta de ${strMeal}" />
                <h3 class="my-3">Instrucciones</h3>
                <p>${strInstructions}</p>
                <h3 class="my-3">Ingredientes y Cantidades</h3>
            `;//InnerHTML es seguro siempre y cunado sepas de donde vienen los datos


        //----------------------------------------------------------------------INGREDIENTES--------------------------------------
        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        //mostrar Ingredientes
        for(let i = 1; i <= 20; i++){
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                //console.log(receta[`strIngredient${i}`]);//nos muestra todos los ingredientes de la comida
                //console.log(receta[`strMeasure${i}`]);//Nos mustra las antiades de los ingredientees como ingredinetes y 
                                                     //cantidades estan matcheados en el arreglo de la API(ingrediente1 con cantidad1)

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                //Agregar li al ul
                listGroup.appendChild(ingredienteLi);
            }
        }
        //Agregarconstenido de ingredientes al HTML
        modalBody.appendChild(listGroup);

        //Botnoes de cerrar y favoritos
        const modalFooter = document.querySelector('.modal-footer');

        limpiarHTML(modalFooter);//Se limpiar el html de los botones que se agreguen de mas

        ///Boton para cerrar el modal
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'col');
        btnFavorito.textContent = existeStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

        //Almacenar en el localStorage para agregar a favoritos
        btnFavorito.onclick = function(){

            //Validar que no se repita una receta en favoritos
            if(existeStorage(idMeal)){
                eliminarFavorito(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';//Eto para que cambie al instante la palabra eliminar por guardar y alrevez
                mostrartToast('Eliminado Correctamente');
                return;
            }

            agregarFavorito({
                            id: idMeal, 
                            titulo: strMeal, 
                            img: strMealThumb
                            });//se pasa un obj(id, nombre, imagen)

                btnFavorito.textContent = 'Eliminar Favorito';
                mostrartToast('Agregado Correctamente');
        }

        //Boton cerrar
        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');//La clase col hace que e divida el espacio disponible entre los 2 botones
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function(){//Cerrar el modal
            modal.hide();
        }

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);


        //Muestra el modal
        modal.show();//show es un metodo de modal en consola: bootstap > modal > protptypes > show(como otros metodos)

    }

    function agregarFavorito(receta){//Espera un objeto
        //console.log(receta);//Muestra el objeto con los valores mencionados al presionar agregar a favoritos}
        //Obtener del local storage y convertirlo a arreglo y si no existe guardar un arreglo vacio
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        // si los que esta del lado izquierdo del ?? devuelve null, se ejecuta lo del lado derecho en este caso  un arreglo vacio
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]))
    }

    function eliminarFavorito(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter( favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));//Convertir a string
    }

    //Validacion por si agregas la misma receta dos veces
    function existeStorage(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some( favorito => favorito.id === id);
    }

    //Mostrar mensaje si se elimina 
    function mostrartToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);//Pasar el elemento donde quieres que se genere le toast

        toastBody.textContent = mensaje;

        toast.show();
    }

    function obtenerFavoritos(){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

        //IMprimir datos en el DOM si existen datos en el localStorage
        if(favoritos.length){
            mostrarRecetas(favoritos);
            return;
        }

        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos aun...';
        noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
        favoritosDiv.appendChild(noFavoritos);
    }

    function limpiarHTML(selector){//Selector para poder reultilizar esta funcion en otros lugares pasando el selector
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);