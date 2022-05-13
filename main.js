// Introducir API KEY de pixabay
let apiKey = "27361442-1be21d83d9270ab40f280a7b1";
//Variables generales
// Se verifica que las variables esten en el localStorage, si no se inicializan como vacias
const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const historial = [];
let darkMode = JSON.parse(localStorage.getItem("modoOscuro")) || false;

//Clases usadas en el programa
class Producto{
    constructor(id, nombre, categoria, cantidad, precio, costo){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
        this.costo = costo;
        this.moneda = "ARS"
        this.img;
        this.imgId;
    }
}

class Lista{
    constructor(){
        this.fecha = `${crearFecha()}`;
        this.id = [];
        this.nombre = [];
        this.categoria = [];
        this.precio = [];
        this.cantidad = [];
        this.texto = "";
        this.precioFinal = 0;
    }
}

class Alerta{
    constructor(tamanox, tamanoy){
        this.fondo = document.createElement("div");
        this.fondo.classList.add("alert__background");
        this.fondo.onclick = () => {
            this.cerrarAlerta();
        }

        this.alerta = document.createElement("div");
        if(document.documentElement.scrollWidth < 480){
            this.alerta.style.width = "95vw"
        } else {
            this.alerta.style.width = `${tamanox}vw`
        }
        this.alerta.style.height = `${tamanoy}vh`
    
        this.alerta.classList.add(verificarModo("alert"));
    }
    
    static verificarAlertas(){
        if(document.body.querySelector(".alert") || document.body.querySelector(".alert__background")){
            return true;
        } else {
            return false;
        }       
    }

    agregarTitulo(parrafoTitulo){
        //Agregando Titulo a la alerta
        this.titulo = document.createElement("div");
        this.titulo.classList.add(verificarModo("alert__title"));
        this.alerta.appendChild(this.titulo);

        //Agregando Parrafo y Boton al Titulo
        const titulo__parrafo = document.createElement("p");
        titulo__parrafo.innerText = parrafoTitulo;

        const titulo__botonCerrar = document.createElement("a");
        if(darkMode){
            titulo__botonCerrar.innerHTML = `<svg class="alert__button--closeDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>`
        } else {
            titulo__botonCerrar.innerHTML = `<svg class="alert__button--close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>`
        }
        titulo__botonCerrar.setAttribute("href", "#");
        titulo__botonCerrar.onclick = (e) => {
            e.preventDefault();
            this.cerrarAlerta();
        }
        this.titulo.appendChild(titulo__parrafo);
        this.titulo.appendChild(titulo__botonCerrar);
    }

    agregarBody(body){
        this.body = document.createElement("div");
        this.body.classList.add("alert__body");
        this.alerta.appendChild(this.body);
        this.body.appendChild(body)
    }

    iniciarAlerta(){
        document.body.appendChild(this.fondo);
        document.body.appendChild(this.alerta);
        return this.alerta;
    }

    cerrarAlerta(){
        this.alerta.remove();
        this.fondo.remove();
    }
}


// Funcion crear listado de imagenes - Asincrona
const listaDeImagenes = async (keywords) => {
    let resultado
    try{
        let response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${keywords}`);
        let data = await response.json();
        resultado = data.hits;
    } catch(e) {
        resultado = new Error(`Sucedio un inconveniente con la llamada a las imagenes de pixabay
        ${e}`)
    }
    return resultado;
}

// Crear notificaciones
const crearNotificacion = titulo => {
    Toastify({
        text: titulo,
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
          background: `linear-gradient(to right, ${darkMode ? "#D10047, #EB6362" : "#80DAEB, #B2FFFF"})`,
          color: darkMode ? "#eee" : "#000000",
        },
        onClick: function(){}
      }).showToast();
} 

// Funcion para averiguar que id esta desocupada
const crearProducto = () => {
    let id = 1;
    while(productos.find(el => el.id == id)){
        id++;
    }
    return id;
}

// Funcion para crear una fecha
const crearFecha = () => {
    const date = new Date();
    let fecha = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return fecha;
}

// Funcion para una variable en en un storage
const guardarStorage = (valor, keyword) => {
    valor = JSON.stringify(valor);
    localStorage.setItem(keyword, valor);
}

// Funcion para verificar si usar la clase oscura o no
const verificarModo = (clase) => {
    if(darkMode){
        clase += "--dark"
        return clase;
    }
    return clase;
}

// Renderizar productos del main
const renderProductos = () => {

    let volcar = document.getElementById("volcar");
    while(volcar.firstChild) {
        volcar.removeChild(volcar.firstChild);
    }
    
    for(const producto of productos){
        let card = document.createElement("div");
        card.setAttribute("class", verificarModo("card"));

        card.innerHTML = `
        <div>
            <div>
                <img src="${producto.img? producto.img : "./img/img-not-found.png"}" alt="" class="img-fluid border-card">
            </div>
            <div class="card__body">
                <div class="contenedor__titulo">
                    <h5 class="card__title">${producto.nombre}</h5>
                    <div>
                        <a href="#" class="no-decoration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil ${verificarModo("ico__productos")}" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </a>
                        <a href="#" class="no-decoration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg ${verificarModo("ico__productos")}" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <p class="card__text">Categoria: ${producto.categoria}</p>
                <p class="card__text">Cantidad: ${producto.cantidad}</p>
                <p class="card__text">Precio: ${producto.precio}</p>
                <p class="card__text">Costo: ${producto.costo}</p>
            </div>
            
        </div>
        `

        let ico__modificar = card.querySelectorAll("a")[0];
        let ico__eliminar = card.querySelectorAll("a")[1];
      
        ico__modificar.onclick = () => {
            insertOrModify(false, producto.id);
        }

        ico__eliminar.onclick = () => {
            eliminarProducto(producto.id);
        }

        volcar.appendChild(card);
    } 
    
    let card = document.createElement("div");
    card.classList.add(verificarModo("card__agregar"));
    card.innerHTML = `<svg class="${verificarModo("card__agregar__icon")} " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>`
    card.onclick = () => {
        insertOrModify(true);
    }
    volcar.appendChild(card);
}

// Renderizar productos de la lista Historial
// TODO Hacer que el cada li tenga un boton que crea una alerta con los detalles mas definidos
const renderHistorial = () => {
    let volcar = document.getElementById("historial");
    while(volcar.firstChild) {
        volcar.removeChild(volcar.firstChild);
    }
    for(const lista of historial){
        let li = document.createElement("li");
        li.classList.add(verificarModo("header__historial__lista"));

        li.innerText = lista.texto;

        volcar.appendChild(li);
    } 
}

//Se unificaron las funciones para setear alertas
//funcion Para setear el header, main, footer y alertas en el modo que corresponda
const setearModo = () => {
    const body = document.querySelector("body");
    body.classList = verificarModo("body")
    const header = document.querySelector("header");
    header.classList = verificarModo("header")
    const footer = document.querySelector("footer");
    footer.classList = verificarModo("footer")
    if(document.querySelector(".alert--dark") || document.querySelector(".alert")){
        let alerta = document.querySelector(".alert--dark") || document.querySelector(".alert");
        alerta.classList = verificarModo("alert")     
    }
    document.getElementById("historial").classList = verificarModo("header__historial__lista")
    renderProductos()
}


// Eventos del header
document.querySelector("#modoPagina").onclick = () => {
    // Se utiliza operador ternario para permutar el false y true cada vez que llamen la funcion
    darkMode = darkMode ? false : true;
    guardarStorage(darkMode, "modoOscuro");
    setearModo();
}

document.querySelector("#comprar").onclick = () => {
    crearAlerta(true);
}

document.querySelector("#vender").onclick = () => {
    crearAlerta();
}

//Alertas
const crearAlerta = (comprar) => {

    //Verifica si ya hay una alerta creada, y si ya esta creada se elimina la anterior
    if(Alerta.verificarAlertas()){
        document.body.querySelector(`.${verificarModo("alert")}`).remove();
        document.body.querySelector(".alert__background").remove();
    }

    const nuevaAlerta = new Alerta(60, 80);
    // Se utiliza operador ternario para verificar agregar el titulo
    nuevaAlerta.agregarTitulo(comprar ? "Comprar Productos" : "Vender Productos")
    const alerta = nuevaAlerta.iniciarAlerta();
    
    const tabla = document.createElement("div");
    tabla.classList.add(verificarModo("alert__table"));

    //Agregando Encabezado a la tabla

    const tabla__encabezado = document.createElement("div");
    tabla__encabezado.classList.add("alert__table__enc")
    tabla.appendChild(tabla__encabezado);

    tabla__encabezado.innerHTML = `
    <p class="alert__table__enc__text">Cantidad</p>
    <p class="alert__table__enc__text">ID</p>
    <p class="alert__table__enc__text">Nombre</p>
    <p class="alert__table__enc__text">Precio</p>
    <p class="alert__table__enc__text">Stock</p>
    <p class="alert__table__enc__text">Subtotal</p>
    `

    //Agregando productos a la tabla

    for(const producto of productos.map(el => el)){
        let subtotal = 0;
        let tabla__producto = document.createElement("div");
        tabla__producto.classList.add("alert__table__product");
        tabla.appendChild(tabla__producto);

        // Se utiliza operador ternario en la tabla para saber si utilizar el precio o el costo del producto
        tabla__producto.innerHTML = `
        <div class="alert__table__product__text"><input class="alert__table__product__text" type="Number" pattern="[^0-9+]"></div>
        <p class="alert__table__product__text">${producto.id}</p>
        <p class="alert__table__product__text">${producto.nombre}</p>
        <p class="alert__table__product__text">${comprar ? producto.costo : producto.precio}</p>
        <p class="alert__table__product__text">${producto.cantidad}</p>
        <p class="alert__table__product__subtotal">${subtotal}</p>
        `
        let inputTabla = tabla__producto.querySelector("input");
        let columnas = tabla__producto.querySelectorAll("p");

        

        if(comprar){

            inputTabla.oninput = () => {
                if(inputTabla.value < 0){
                    inputTabla.value = 0;
                }
                if(inputTabla.value == ""){
                    columnas[3].innerText = 0;
                    columnas[4].innerText = 0;
                } else {
                    let subtotal = producto.costo * inputTabla.value;
                    columnas[4].innerText = subtotal;
        
                    columnas[3].innerText = producto.cantidad + parseInt(inputTabla.value);
                }
                
            }
        } else {
            inputTabla.oninput = () => {
                if(inputTabla.value < 0){
                    inputTabla.value = 0;
                } else if(inputTabla.value > producto.cantidad){
                    inputTabla.value = producto.cantidad;
                }
                if(inputTabla.value == ""){
                    columnas[3].innerText = 0;
                    columnas[4].innerText = 0;
                } else {
                    let subtotal = producto.precio * inputTabla.value;
                    columnas[4].innerText = subtotal;
        
                    columnas[3].innerText = producto.cantidad - parseInt(inputTabla.value);
                }

            } 
        }
    }

    //Creando boton y agregandole funcionalidad

    let alerta__boton__accion = document.createElement("a");
    alerta__boton__accion.classList.add(verificarModo("alert__boton"));
    if(comprar){
        alerta__boton__accion.innerText = "Comprar";
        alerta__boton__accion.onclick = () => {
            let filas = document.getElementsByClassName("alert__table__product");
            let precioFinal = 0;
            for(const fila of filas){
                let columnas = Array.from(fila.children);
                if(columnas[5].innerText != 0){
                    precioFinal += parseInt(columnas.at(-1).innerText);
                }
            }
            if(precioFinal == 0){
                nuevaAlerta.cerrarAlerta();
            } else {
                let nuevaLista = new Lista();
                for(const fila of filas){
                    let columnas = Array.from(fila.children);
                    if(columnas.at(-1).innerText != 0){
                        let id = columnas[1].innerText;
                        let nombre = columnas[2].innerText;
                        let cantidad = parseInt(columnas[0].firstChild.value);
                        let precio = parseInt(columnas[3].innerText);
    
                        nuevaLista.id.push(id)
                        nuevaLista.nombre.push(nombre);
                        nuevaLista.cantidad.push(cantidad);
                        nuevaLista.precio.push(precio);
                        nuevaLista.precioFinal = precioFinal;
    
                        productos.find(el => el.id == id).cantidad += cantidad;
                    }
                }
                nuevaLista.texto = `${nuevaLista.fecha} Se compro un producto por ${nuevaLista.precioFinal}`;
                guardarStorage(productos, "productos")
                historial.push(nuevaLista);
                nuevaAlerta.cerrarAlerta();
                renderProductos();
                renderHistorial();
                crearNotificacion(`${nuevaLista.fecha} Se Compro por ${precioFinal}`);
            }
        }
    
    } else {
        alerta__boton__accion.innerText = "Vender";
        alerta__boton__accion.onclick = () => {
            let tabla = document.getElementsByClassName("alert__table__product");
            let precioFinal = 0;
            for(const filas of tabla){
                let columnas = Array.from(filas.children)
                if(columnas.at(-1).innerText != 0){
                    precioFinal += parseInt(columnas.at(-1).innerText);
                }
            }
            if(precioFinal == 0){
                nuevaAlerta.cerrarAlerta();
            } else {
                let nuevaLista = new Lista();
                for(const filas of tabla){
                    let columnas = Array.from(filas.children)
                    if(columnas.at(-1).innerText != 0){
                        let id = columnas[1].innerText;
                        let nombre = columnas[2].innerText;
                        let cantidad = parseInt(columnas[0].firstChild.value);
                        let precio = parseInt(columnas[3].innerText)
    
                        nuevaLista.id.push(id)
                        nuevaLista.nombre.push(nombre);
                        nuevaLista.cantidad.push(cantidad);
                        nuevaLista.precio.push(precio);
                        nuevaLista.precioFinal = precioFinal;
    
                        productos.find(el => el.id == id).cantidad -= cantidad;
                    }
                }
                nuevaLista.texto = `${nuevaLista.fecha} Se vendio un producto por ${nuevaLista.precioFinal}`;
                guardarStorage(productos, "productos")
                historial.push(nuevaLista);
                nuevaAlerta.cerrarAlerta();
                renderProductos();
                renderHistorial();
                crearNotificacion(`${nuevaLista.fecha} Se vendio por ${precioFinal}`);
            }
        }
    }
    alerta.appendChild(alerta__boton__accion);

    nuevaAlerta.agregarBody(tabla);
}

const insertOrModify = (eleccion, id) =>{

    if(Alerta.verificarAlertas()){
        document.body.querySelector(`.${verificarModo("alert")}`).remove();
        document.body.querySelector(".alert__background").remove();
    }

    const nuevaAlerta = new Alerta(20, 45);
    eleccion ? nuevaAlerta.agregarTitulo("Agregar Producto") : nuevaAlerta.agregarTitulo("Modificar Producto")
    let alerta = nuevaAlerta.iniciarAlerta();

    const divInputs = document.createElement("div");
    divInputs.classList.add("alerta__producto__body");
    // Se utiliza el operador ternario, para agregar el campo "Cantidad", y si se esta agregando un producto o modificando
    divInputs.innerHTML = `
    <p>Nombre:</p>
    <input type="text" id="inputNombre" placeholder="Nombre" class="alerta__producto__input">
    <p>Categoria:</p>
    <input type="text" id="inputCategoria" placeholder="Categoria" class="alerta__producto__input">
    ${eleccion ? `<p>Cantidad:</p><input type="number" id="inputCantidad" placeholder="Cantidad" class="alerta__producto__input">`: ""}
    <p>Precio:</p>
    <input type="number" id="inputPrecio" placeholder="Precio" class="alerta__producto__input">
    <p>Costo</p>
    <input type="number" id="inputCosto" placeholder="Costo" class="alerta__producto__input">
    <p id="alertaError" class="alerta__error"></p>
    <a href="#" id="alertaBoton" class="${verificarModo("alert__boton")}">${eleccion ? "Agregar Producto" : "Modificar Producto"}</a>
    `;


    //Agregando boton y dandole funcionalidad

    let error = divInputs.querySelector("#alertaError");
    let boton = divInputs.querySelector("#alertaBoton");

    
    let nombre = divInputs.querySelector("#inputNombre");
    let categoria = divInputs.querySelector("#inputCategoria");
    let cantidad = eleccion ? divInputs.querySelector("#inputCantidad") : undefined;
    let precio = divInputs.querySelector("#inputPrecio");
    let costo = divInputs.querySelector("#inputCosto");    

    const accederObjeto = (id) => {

    
        let producto = productos.find(el => el.id == id);
        nombre.value = producto.nombre;
        categoria.value = producto.categoria;
        precio.value = producto.precio;
        costo.value = producto.costo;
    }

    eleccion || accederObjeto(id);

    boton.onclick = () => {
        

        const valorarCategoria = () => {
            let categoriaValorar = categorias.find(el => el.toLowerCase() == categoria.value.toLowerCase());
            if(categoriaValorar == undefined){
                return true;
            } else {
                return false;
            }
        }


        const valorarProducto = () => {
            error.innerText = "";

            if(nombre.value.trim() == ""){
                error.innerText = "El nombre no puede estar vacio";
                return;
            }else if(valorarCategoria()){
                error.innerText = "No se encuentra la categoria ¿Desea agregarla?";

                let contenedor = document.createElement("div");
                contenedor.classList.add("alerta__producto__contenedor__botones")
                contenedor.innerHTML = `
                <a href="#" id="categoriaAceptar" class="alerta__producto__aceptar">Agregar</a>
                <a href="#" id="categoriaCancelar" class="alerta__producto__cancelar">Cancelar</a>
                `
                let aceptar = contenedor.querySelector("#categoriaAceptar");
                let cancelar = contenedor.querySelector("#categoriaCancelar");

                aceptar.onclick = (e) => {
                    e.preventDefault();
                    categorias.push(categoria.value);
                    guardarStorage(categorias, "categorias");
                    contenedor.remove();
                    valorarProducto();
                }
                cancelar.onclick = (e) => {
                    e.preventDefault();
                    contenedor.remove();
                    error.innerText = "";
                }

                error.insertAdjacentElement("beforeend", contenedor);
                return;                   
            } else if(eleccion){
                if(cantidad.value == "" || parseInt(cantidad.value) < 0){
                    error.innerText = "La cantidad no puede ser negativa o estar vacia";
                    return;    
                }
            } else if(precio.value == "" || parseInt(precio.value) < 0){
                error.innerText = "El precio no puede ser negativa o estar vacia";
                return;
            } else if(costo.value == "" || parseInt(costo.value) < 0){
                error.innerText = "El costo no puede ser negativa o estar vacia";
                return;
            }

            if(eleccion){
                let productoNuevo = new Producto(crearProducto(), nombre.value, categoria.value, eleccion && parseInt(cantidad.value), parseInt(precio.value), parseInt(costo.value));
                productos.push(productoNuevo);
                guardarStorage(productos, "productos")
                nuevaAlerta.cerrarAlerta()
                renderProductos();
                galeriaDeImagenes(productoNuevo);
            } else {
                let buscarProducto = productos.indexOf(productos.find(el => el.id == id))
                productos[buscarProducto].nombre = nombre.value;
                productos[buscarProducto].categoria = categoria.value;
                productos[buscarProducto].precio = precio.value;
                productos[buscarProducto].costo = costo.value;
                guardarStorage(productos, "productos")
                nuevaAlerta.cerrarAlerta()
                renderProductos();
                galeriaDeImagenes(productos[buscarProducto]);
            }
            
        }

        valorarProducto();
    }

    nuevaAlerta.agregarBody(divInputs);
    alerta.appendChild(boton);
}

const eliminarProducto = (id) => {

    if(Alerta.verificarAlertas()){
        document.body.querySelector(`.${verificarModo("alert")}`).remove();
        document.body.querySelector(".alert__background").remove();
    }

    const nuevaAlerta = new Alerta(25, 10);
    nuevaAlerta.agregarTitulo("Eliminar Producto");
    nuevaAlerta.iniciarAlerta();

    let buscarProducto = productos.find(el => el.id == id);

    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
    <p class="alerta__producto__eliminar">¿Esta seguro que desea eliminar ${buscarProducto.nombre}?</p>
    <div class="alerta__producto__contenedor__botones">
        <a href="#" id="eliminarAceptar" class="alerta__producto__aceptar">Aceptar</a>
        <a href="#" id="eliminarCancelar" class="alerta__producto__cancelar">Cancelar</a>
    </div>
    `
    nuevaAlerta.agregarBody(contenedor);
    
    let aceptar = contenedor.querySelector("#eliminarAceptar");
    let cancelar = contenedor.querySelector("#eliminarCancelar");

    aceptar.onclick = () => {
        buscarProducto = productos.indexOf(buscarProducto);
        productos.splice(buscarProducto, 1);
        guardarStorage(productos, "productos")
        nuevaAlerta.cerrarAlerta();
        renderProductos();
    }

    cancelar.onclick = () => {
        nuevaAlerta.cerrarAlerta();
    }
}

const galeriaDeImagenes = (producto) => {
    const alertaAgregarImagen = () => {
        if(Alerta.verificarAlertas()){
            document.body.querySelector(`.${verificarModo("alert")}`).remove();
            document.body.querySelector(".alert__background").remove();
        }
    
        const nuevaAlerta = new Alerta(25, 10);
        nuevaAlerta.agregarTitulo("Agregar Imagen");
        nuevaAlerta.iniciarAlerta();
    
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
        <p class="alerta__producto__eliminar">¿Desea Agregar Imagen a ${producto.nombre}?</p>
        <div class="alerta__producto__contenedor__botones">
            <a href="#" id="eliminarAceptar" class="alerta__producto__aceptar">Aceptar</a>
            <a href="#" id="eliminarCancelar" class="alerta__producto__cancelar">Cancelar</a>
        </div>
        `
        nuevaAlerta.agregarBody(contenedor);
        
        let aceptar = contenedor.querySelector("#eliminarAceptar");
        let cancelar = contenedor.querySelector("#eliminarCancelar");
    
        aceptar.onclick = () => {
            nuevaAlerta.cerrarAlerta();
            galeriaProductos();
        }
    
        cancelar.onclick = () => {
            nuevaAlerta.cerrarAlerta();
        }
    }
    
    const galeriaProductos = () => {
        //Verifica si ya hay una alerta creada, y si ya esta creada se elimina la anterior
        if(Alerta.verificarAlertas()){
            document.body.querySelector(`.${verificarModo("alert")}`).remove();
            document.body.querySelector(".alert__background").remove();
        }

        const nuevaAlerta = new Alerta(60, 80);
        nuevaAlerta.agregarTitulo("Agregar Imagen")
        const alerta = nuevaAlerta.iniciarAlerta();

        const galeria = document.createElement("div");
        galeria.classList.add("galeria");

        const buscar = document.createElement("input");
        buscar.classList.add("galeria__input")
        buscar.type = "text";

        buscar.onkeydown = async (e) => {
            if(e.key == "Enter"){
                let keywords = e.target.value;
                if(keywords.includes(" ")){
                    keywords.replace(" ", "+");
                    console.log(keywords)
                }
                let resultados = await listaDeImagenes(keywords);
                galeria__contenedor__imagenes.innerHTML = "";
                for(imagenes of resultados){
                    let contenedor = document.createElement("div");
                    contenedor.innerHTML = `
                    <img src=${imagenes.webformatURL} alt="" class="img-fluid" data-id="${imagenes.id}">
                    `
                    contenedor.childNodes[1].onclick = (e) => {
                        console.log(imagenes.webformatURL);
                        console.log(e.target);
                        producto.img = e.target.getAttribute("src");
                        producto.imgId = e.target.getAttribute("data-id");
                        nuevaAlerta.cerrarAlerta();
                        guardarStorage(productos, "productos");
                        renderProductos();
                    }

                    galeria__contenedor__imagenes.appendChild(contenedor);
                    console.log(contenedor.childNodes[1])
                }
            }
        }
        galeria.appendChild(buscar);

        const galeria__contenedor__imagenes = document.createElement("div");
        galeria__contenedor__imagenes.classList.add("galeria__contenedor__imagenes");
        galeria.appendChild(galeria__contenedor__imagenes);

        nuevaAlerta.agregarBody(galeria);
    }
    
    alertaAgregarImagen();
}

// Init Modo de pagina y Desplegar productos
setearModo();
renderProductos();

/* Esta API solo te permite 24 horas de un link de una imagen */
// TODO Averiguar una forma de que las imagenes se puedan re buscar en pixabay
const pruebaPrueba = async () => {
    let prueba = productos.forEach(el => {
        if(el.imgId != undefined){
            prueba = el.imgId;
        }
    })
    if(productos[0] != null){
        console.log(intervalId);
        try{
            let response = await fetch(`https://pixabay.com/api/?key=${apiKey}&id=${prueba.imgId}`);
            if(response.status == 400){
                for(producto of productos){
                    if(producto.imgId != undefined){
                        let respuesta = await fetch(`https://pixabay.com/api/?key=${apiKey}&id=${producto.imgId}`);
                        let dato = await respuesta.json();
                        dato = dato.hits[0];
                        producto.img = dato.webformatURL;
                        producto.imgId = dato.id;
                        console.log(dato.webformatURL);
                        console.log(dato.id);
                    }
                }
                guardarStorage(productos, "productos");
                renderProductos();
            }
        } catch(e){
            console.log(e)
        }
    }
}

const intervalId = window.setInterval(pruebaPrueba, 300000);