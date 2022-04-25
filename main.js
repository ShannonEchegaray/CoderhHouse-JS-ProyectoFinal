//Variables generales
const categorias = ["Carne", "Verdura"];
const productos = [];
const historialCompras = [];
const historialVentas = [];

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
    }

    agregarStock(cantidad){
        this.cantidad += cantidad;
    }

    venderProducto(cantidad){
        this.cantidad -= cantidad;
    }
}

class Lista{
    constructor(){
        this.fecha = new Date();
        this.fecha = this.fecha.toLocaleDateString() + " " + this.fecha.toTimeString();
        this.id = [];
        this.nombre = [];
        this.categoria = [];
        this.precio = [];
        this.cantidad = [];
        this.precioFinal = 0;
    }
}


const crearProducto = () => {
    let id = 1;
    while(productos.find(el => el.id == id)){
        id++;
    }
    return id;
}
// Pusheo algunos productos en la lista.

productos.push(new Producto(1,"Lechuga", "Verdura", 0, 50, 20));
productos.push(new Producto(2,"Pollo", "Carne", 0, 120, 50));
productos.push(new Producto(3,"Res", "Carne", 0, 180, 80));

let darkMode = false;

// Funcion para verificar si usar la clase oscura o no
const verificarModo = (clase) => {
    if(darkMode){
        clase += "--dark"
        return clase;
    }
    return clase;
}

// Renderizar productos del main
function renderProductos(){

    let volcar = document.getElementById("volcar");
    while(volcar.firstChild) {
        volcar.removeChild(volcar.firstChild);
    }
    
    for(const producto of productos){
        let card = document.createElement("div");
        card.setAttribute("class", verificarModo("card"));

        let card__body = document.createElement("div");
        card__body.classList.add("card__body");
        card.appendChild(card__body);

        let contenedor__titulo = document.createElement("div");
        contenedor__titulo.classList.add("contenedor__titulo");
        card__body.appendChild(contenedor__titulo);

        let titulo = document.createElement("h5");
        titulo.classList.add("card__title");
        titulo.innerText = producto.nombre;
        contenedor__titulo.appendChild(titulo);

        let contenedor__iconos = document.createElement("div");

        let ico__modificar = document.createElement("a");
        ico__modificar.setAttribute("href", "#");
        ico__modificar.innerHTML = `<svg class="${verificarModo("ico__productos")}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>`;

        let ico__eliminar = document.createElement("a");
        ico__eliminar.setAttribute("href", "#");
        ico__eliminar.innerHTML = `<svg class="${verificarModo("ico__productos")}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
        </svg>`;

        ico__modificar.onclick = () => {
            eventoProducto("modificar", producto.id);
        }

        ico__eliminar.onclick = () => {
            eventoProducto("eliminar", producto.id);
        }

        contenedor__iconos.appendChild(ico__modificar);
        contenedor__iconos.appendChild(ico__eliminar);
        contenedor__titulo.appendChild(contenedor__iconos)

        let card__text1 = document.createElement("p");
        let card__text2 = document.createElement("p");
        let card__text3 = document.createElement("p");
        let card__text4 = document.createElement("p");

        card__text1.classList.add("card__text");
        card__text2.classList.add("card__text");
        card__text3.classList.add("card__text");
        card__text4.classList.add("card__text");

        card__text1.innerText = `Categoria: ${producto.categoria}`;
        card__text2.innerText = `Cantidad: ${producto.cantidad}`;
        card__text3.innerText = `Precio: ${producto.precio}`;
        card__text4.innerText = `Costo: ${producto.costo}`;

        card__body.appendChild(card__text1);
        card__body.appendChild(card__text2);
        card__body.appendChild(card__text3);
        card__body.appendChild(card__text4);

        volcar.appendChild(card);
    } 
    
    let card = document.createElement("div");
    card.classList.add(verificarModo("card__agregar"));
    card.innerHTML = `<svg class="${verificarModo("card__agregar__icon")} " xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>`
    card.onclick = () => {
        eventoProducto("agregar");
    }
    volcar.appendChild(card);
}

//funcion Para setear el header, main, footer y alertas en modo oscuro
function setDark(){
    const body = document.querySelector("body");
    body.classList.remove("body");
    body.classList.add("body--dark");
    const header = document.querySelector("header");
    header.classList.remove("header");
    header.classList.add("header--dark");
    const footer = document.querySelector("footer");
    footer.classList.remove("footer");
    footer.classList.add("footer--dark");
    if(document.querySelector(".alert")){
        let alerta = document.querySelector(".alert");
        alerta.classList.remove("alert");
        alerta.classList.add("alert--dark")        
    }
    darkMode = true;
    renderProductos()
}

//funcion Para setear el header, main, footer y alertas en modo claro
function setLight(){
    const body = document.querySelector("body");
    body.classList.remove("body--dark");
    body.classList.add("body");
    const header = document.querySelector("header");
    header.classList.remove("header--dark");
    header.classList.add("header");
    const footer = document.querySelector("footer");
    footer.classList.remove("footer--dark");
    footer.classList.add("footer");
    if(document.querySelector(".alert--dark")){
        let alerta = document.querySelector(".alert--dark");
        alerta.classList.remove("alert--dark");
        alerta.classList.add("alert")        
    }
    darkMode = false;
    renderProductos()
}

renderProductos();
document.querySelector("#modoPagina").onclick = () => {
    if(darkMode){
        setLight();
    } else {
        setDark();
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
        if(document.documentElement.scrollWidth < 768){
            this.alerta.style.width = "95vw"
        } else {
            this.alerta.style.width = `${tamanox}vw`
        }
        this.alerta.style.height = `${tamanoy}vh`
    
        this.alerta.classList.add(verificarModo("alert"));
        this.alerta.classList.add("alert__ComprarVender");
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

//Alertas
const crearAlerta = (comprar) => {

    //Verifica si ya hay una alerta creada, y si ya esta creada se elimina la anterior
    if(Alerta.verificarAlertas()){
        document.body.querySelector(".alert").remove();
        document.body.querySelector(".alert__background").remove();
    }

    const nuevaAlerta = new Alerta();
    nuevaAlerta.agregarTitulo("hola")
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
                        let precio = parseInt(columnas[3].innerText)
    
                        nuevaLista.id.push(id)
                        nuevaLista.nombre.push(nombre);
                        nuevaLista.cantidad.push(cantidad);
                        nuevaLista.precio.push(precio);
                        nuevaLista.precioFinal = precioFinal;
    
                        productos.find(el => el.id == id).agregarStock(cantidad);
                    }
                }
                historialCompras.push(nuevaLista);
                nuevaAlerta.cerrarAlerta();
                renderProductos();
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
    
                        productos.find(el => el.id == id).venderProducto(cantidad);
                    }
                }
                historialVentas.push(nuevaLista);
                nuevaAlerta.cerrarAlerta();
                renderProductos();
            }
        }
    }
    alerta.appendChild(alerta__boton__accion);

    nuevaAlerta.agregarBody(tabla);
}

const eventoProducto = (eleccion, id) =>{

    function cerrarAlerta(){
        for(let i = 0; i < 2; i++){
            document.body.lastChild.remove();
        }
    }

    let alerta__fondo, alerta, alerta__title, alerta__title__parrafo, alerta__title__closeButton, alerta__body, nombre, categoria, cantidad, precio, costo, alerta__producto__boton, error, parrafo__nombre, parrafo__categoria, parrafo__precio, parrafo__costo, parrafo__cantidad, buscarProducto;

    switch(eleccion){
        case "agregar":

            if(document.querySelector(".alert") || document.querySelector(".alert--dark")){
                cerrarAlerta();
            }

            alerta__fondo = document.createElement("div");
            alerta__fondo.classList.add("alert__background");
            alerta__fondo.onclick = () => {
                cerrarAlerta();
            }

            //Agregando Alerta al fondo de la alerta
            alerta = document.createElement("div");
            alerta.classList.add(verificarModo("alert"));
            alerta.classList.add("alert__producto");

            alerta__title = document.createElement("div");
            alerta__title.classList.add(verificarModo("alert__title"));
            alerta.appendChild(alerta__title);

            //Agregando Parrafo y Boton al Titulo
            alerta__title__parrafo = document.createElement("p");
            alerta__title__parrafo.innerText = "Agregar Producto";

            alerta__title__closeButton = document.createElement("a");
            if(darkMode){
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--closeDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            } else {
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            }
            alerta__title__closeButton.setAttribute("href", "#");
            alerta__title__closeButton.onclick = (e) => {
                e.preventDefault();
                cerrarAlerta();
            }
            alerta__title.appendChild(alerta__title__parrafo);
            alerta__title.appendChild(alerta__title__closeButton);

            //Agregando body a la alerta
            alerta__body = document.createElement("div");
            alerta__body.classList.add("alerta__producto__body");
            alerta.appendChild(alerta__body);

            //Agregando inputs a la alerta            
            parrafo__nombre = document.createElement("p");
            parrafo__nombre.innerText = "Nombre:"
            nombre = document.createElement("input");
            nombre.setAttribute("type", "text");
            nombre.placeholder = "Nombre";
            nombre.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__nombre);
            alerta__body.appendChild(nombre);

            parrafo__categoria = document.createElement("p");
            parrafo__categoria.innerText = "Categoria:"
            categoria = document.createElement("input");
            categoria.setAttribute("type", "text");
            categoria.placeholder = "Categoria";
            categoria.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__categoria);
            alerta__body.appendChild(categoria);

            parrafo__cantidad = document.createElement("p");
            parrafo__cantidad.innerText = "Cantidad:"
            cantidad = document.createElement("input");
            cantidad.setAttribute("type", "number");
            cantidad.placeholder = "Cantidad"
            cantidad.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__cantidad);
            alerta__body.appendChild(cantidad);

            parrafo__precio = document.createElement("p");
            parrafo__precio.innerText = "Precio:"
            precio = document.createElement("input");
            precio.setAttribute("type", "number");
            precio.placeholder = "Precio";
            precio.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__precio);
            alerta__body.appendChild(precio);

            parrafo__costo = document.createElement("p");
            parrafo__costo.innerText = "Costo:"
            costo = document.createElement("input");
            costo.setAttribute("type", "number");
            costo.placeholder = "Costo";
            costo.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__costo);
            alerta__body.appendChild(costo);

            alerta__producto__boton = document.createElement("a");
            alerta__producto__boton.setAttribute("href", "#");
            alerta__producto__boton.classList.add(verificarModo("alert__boton"));
            alerta__producto__boton.innerText = "Agregar Producto";
            alerta.appendChild(alerta__producto__boton);

            //Agregando boton y dandole funcionalidad

            error = document.createElement("p");
            error.classList.add("alerta__error");
            alerta__body.appendChild(error);

            alerta__producto__boton.onclick = () => {
                
                const valorarCategoria = () => {
                    let categoriaValorar = categorias.find(el => el.toLowerCase() == categoria.value.toLowerCase());
                    if(categoriaValorar == undefined){
                        return true;
                    } else {
                        return false;
                    }
                }

                const valorarProducto = () => {
                    if(nombre.value.trim() == ""){
                        error.innerText = "El nombre no puede estar vacio";
                        return;
                    } else if(valorarCategoria()){
                        error.innerText = "No se encuentra la categoria ¿Desea agregarla?";

                        let contenedor = document.createElement("div");
                        contenedor.classList.add("alerta__producto__contenedor__botones")
                        let aceptar = document.createElement("a");
                        aceptar.setAttribute("href", "#")
                        aceptar.innerText = "Agregar"
                        aceptar.classList.add("alerta__producto__aceptar");
                        
                        let cancelar = document.createElement("a");
                        cancelar.setAttribute("href", "#")
                        cancelar.innerText = "Cancelar"
                        cancelar.classList.add("alerta__producto__cancelar");
                        aceptar.onclick = (e) => {
                            e.preventDefault();
                            categorias.push(categoria.value);
                            contenedor.remove();
                            valorarProducto();
                        }
                        cancelar.onclick = (e) => {
                            e.preventDefault();
                            contenedor.remove();
                        }

                        contenedor.appendChild(aceptar);
                        contenedor.appendChild(cancelar);

                        error.insertAdjacentElement("afterend", contenedor);
                        return;                   
                    } else if(cantidad.value == "" || parseInt(cantidad.value) < 0){
                        error.innerText = "La cantidad no puede ser negativa o estar vacia";
                        return;
                    } else if(precio.value == "" || parseInt(precio.value) < 0){
                        error.innerText = "El precio no puede ser negativa o estar vacia";
                        return;
                    } else if(costo.value == "" || parseInt(costo.value) < 0){
                        error.innerText = "El costo no puede ser negativa o estar vacia";
                        return;
                    }

                    let productoNuevo = new Producto(crearProducto(), nombre.value, categoria.value, parseInt(cantidad.value), parseInt(precio.value), parseInt(costo.value));
                    productos.push(productoNuevo);
                    alerta.remove();
                    alerta__fondo.remove();
                    renderProductos();
                }  
                valorarProducto();
            }

            document.body.appendChild(alerta__fondo);
            document.body.appendChild(alerta);
            break;
        case "modificar":
            if(document.querySelector(".alert") || document.querySelector(".alert--dark")){
                cerrarAlerta();
            }

            alerta__fondo = document.createElement("div");
            alerta__fondo.classList.add("alert__background");
            alerta__fondo.onclick = () => {
                cerrarAlerta();
            }

            //Agregando Alerta al fondo de la alerta
            alerta = document.createElement("div");
            alerta.classList.add(verificarModo("alert"));
            alerta.classList.add("alert__producto");

            alerta__title = document.createElement("div");
            alerta__title.classList.add(verificarModo("alert__title"));
            alerta.appendChild(alerta__title);

            //Agregando Parrafo y Boton al Titulo
            alerta__title__parrafo = document.createElement("p");
            alerta__title__parrafo.innerText = "Modificar Producto";

            alerta__title__closeButton = document.createElement("a");
            if(darkMode){
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--closeDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            } else {
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            }
            alerta__title__closeButton.setAttribute("href", "#");
            alerta__title__closeButton.onclick = (e) => {
                e.preventDefault();
                cerrarAlerta();
            }
            alerta__title.appendChild(alerta__title__parrafo);
            alerta__title.appendChild(alerta__title__closeButton);

            //Agregando body a la alerta
            alerta__body = document.createElement("div");
            alerta__body.classList.add("alerta__producto__body");
            alerta.appendChild(alerta__body);

            buscarProducto = productos.find(el => el.id == id);

            //Agregandole inputs a la alerta
            parrafo__nombre = document.createElement("p");
            parrafo__nombre.innerText = "Nombre:"
            nombre = document.createElement("input");
            nombre.setAttribute("type", "text");
            nombre.placeholder = "Nombre";
            nombre.value = buscarProducto.nombre;
            nombre.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__nombre);
            alerta__body.appendChild(nombre);

            parrafo__categoria = document.createElement("p");
            parrafo__categoria.innerText = "Categoria:"
            categoria = document.createElement("input");
            categoria.setAttribute("type", "text");
            categoria.placeholder = "Categoria";
            categoria.value = buscarProducto.categoria;
            categoria.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__categoria);
            alerta__body.appendChild(categoria);

            parrafo__precio = document.createElement("p");
            parrafo__precio.innerText = "Precio:"
            precio = document.createElement("input");
            precio.setAttribute("type", "number");
            precio.placeholder = "Precio";
            precio.value = parseInt(buscarProducto.precio);
            precio.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__precio);
            alerta__body.appendChild(precio);

            parrafo__costo = document.createElement("p");
            parrafo__costo.innerText = "Costo:"
            costo = document.createElement("input");
            costo.setAttribute("type", "number");
            costo.placeholder = "Costo";
            costo.value = parseInt(buscarProducto.costo);
            costo.classList.add("alerta__producto__input");
            alerta__body.appendChild(parrafo__costo);
            alerta__body.appendChild(costo);

            alerta__producto__boton = document.createElement("a");
            alerta__producto__boton.setAttribute("href", "#");
            alerta__producto__boton.classList.add(verificarModo("alert__boton"));
            alerta__producto__boton.innerText = "Modificar Producto";
            alerta.appendChild(alerta__producto__boton);


            //Agregando boton a la alerta y agregandole funcionalidad
            error = document.createElement("p");
            error.classList.add("alerta__error");
            alerta__body.appendChild(error);

            alerta__producto__boton.onclick = () => {
                
                const valorarCategoria = () => {
                    let categoriaValorar = categorias.find(el => el.toLowerCase() == categoria.value.toLowerCase());
                    if(categoriaValorar == undefined){
                        return true;
                    } else {
                        return false;
                    }
                }

                const valorarProducto = () => {
                    if(nombre.value.trim() == ""){
                        error.innerText = "El nombre no puede estar vacio";
                        return;
                    } else if(valorarCategoria()){
                        error.innerText = "No se encuentra la categoria ¿Desea agregarla?";

                        let contenedor = document.createElement("div");
                        contenedor.classList.add("alerta__producto__contenedor__botones")
                        let aceptar = document.createElement("a");
                        aceptar.setAttribute("href", "#")
                        aceptar.innerText = "Agregar"
                        aceptar.classList.add("alerta__producto__aceptar");
                        
                        let cancelar = document.createElement("a");
                        cancelar.setAttribute("href", "#")
                        cancelar.innerText = "Cancelar"
                        cancelar.classList.add("alerta__producto__cancelar");
                        aceptar.onclick = (e) => {
                            e.preventDefault();
                            categorias.push(categoria.value);
                            contenedor.remove();
                            valorarProducto();
                        }
                        cancelar.onclick = (e) => {
                            e.preventDefault();
                            contenedor.remove();
                        }

                        contenedor.appendChild(aceptar);
                        contenedor.appendChild(cancelar);

                        error.insertAdjacentElement("afterend", contenedor);
                        return;                   
                    } else if(precio.value == "" || parseInt(precio.value) < 0){
                        error.innerText = "El precio no puede ser negativa o estar vacia";
                        return;
                    } else if(costo.value == "" || parseInt(costo.value) < 0){
                        error.innerText = "El costo no puede ser negativa o estar vacia";
                        return;
                    }

                    buscarProducto = productos.indexOf(productos.find(el => el.id == id))
                    productos[buscarProducto].nombre = nombre.value;
                    productos[buscarProducto].categoria = categoria.value;
                    productos[buscarProducto].precio = parseInt(precio.value);
                    productos[buscarProducto].costo = parseInt(costo.value);
                    alerta.remove();
                    alerta__fondo.remove();
                    renderProductos();
                }  
                valorarProducto();
            }

            document.body.appendChild(alerta__fondo);
            document.body.appendChild(alerta)
            break;
        case "eliminar":
            if(document.querySelector(".alert") || document.querySelector(".alert--dark")){
                cerrarAlerta();
            }

            alerta__fondo = document.createElement("div");
            alerta__fondo.classList.add("alert__background");
            alerta__fondo.onclick = () => {
                cerrarAlerta();
            }

            //Agregando Alerta al fondo de la alerta
            alerta = document.createElement("div");
            alerta.classList.add(verificarModo("alert"));
            alerta.classList.add("alert__producto--eliminar");

            alerta__title = document.createElement("div");
            alerta__title.classList.add(verificarModo("alert__title"));
            alerta.appendChild(alerta__title);

            //Agregando Parrafo y Boton al Titulo
            alerta__title__parrafo = document.createElement("p");
            alerta__title__parrafo.innerText = "Eliminar Producto";

            alerta__title__closeButton = document.createElement("a");
            if(darkMode){
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--closeDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            } else {
                alerta__title__closeButton.innerHTML = `<svg class="alert__button--close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>`
            }
            alerta__title__closeButton.setAttribute("href", "#");
            alerta__title__closeButton.onclick = (e) => {
                e.preventDefault();
                cerrarAlerta();
            }
            alerta__title.appendChild(alerta__title__parrafo);
            alerta__title.appendChild(alerta__title__closeButton);

            //Agregando body a la alerta
            alerta__body = document.createElement("div");
            alerta__body.classList.add("alerta__producto__body");
            alerta.appendChild(alerta__body);

            buscarProducto = productos.find(el => el.id == id);

            let parrafo__body = document.createElement("p");
            parrafo__body.innerText = `¿Esta seguro que desea eliminar ${buscarProducto.nombre}?`;
            alerta__body.appendChild(parrafo__body);

            
            let contenedor = document.createElement("div");
            contenedor.classList.add("alerta__producto__contenedor__botones");

            aceptar = document.createElement("a");
            aceptar.classList.add("alerta__producto__aceptar");
            aceptar.innerText = "Aceptar";

            cancelar = document.createElement("a");
            cancelar.classList.add("alerta__producto__cancelar");
            cancelar.innerText = "Cancelar";
            contenedor.appendChild(aceptar);
            contenedor.appendChild(cancelar);

            alerta__body.appendChild(contenedor);

            aceptar.onclick = () => {
                buscarProducto = productos.indexOf(buscarProducto);
                productos.splice(buscarProducto, 1);
                cerrarAlerta();
                renderProductos();
            }

            cancelar.onclick = () => {
                cerrarAlerta();
            }

            document.body.appendChild(alerta__fondo);
            document.body.appendChild(alerta);
            break;
    }
}

document.querySelector("#comprar").onclick = () => {
    crearAlerta(true);
}

document.querySelector("#vender").onclick = () => {
    crearAlerta();
}