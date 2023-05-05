

//constructor de objetos de stock

let id = 0

class Productos {
    constructor(nombre, categoria, precio, descripcion) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

//stock inicial de productos (array inicial)

const productosEnStock = []

let laptopAcerAspire = new Productos(
    "Laptop Acer Aspire 5",
    "Computadoras portátiles",
    "US$699.99",
    "Una laptop potente con pantalla Full HD de 15.6 pulgadas, procesador Intel Core i5, 8 GB de RAM y 256 GB de almacenamiento SSD. Ideal para tareas de productividad y entretenimiento."
)

let mouseGamingLogitechGPro = new Productos(
    "Mouse gaming Logitech G Pro",
    "Periféricos de juego",
    "US$59.99",
    "Un mouse de alta precisión diseñado para jugadores profesionales, con sensor óptico de 16,000 DPI, 6 botones programables, iluminación RGB personalizable y diseño ergonómico para un agarre cómodo durante largas sesiones de juego."
)

let impresoraMultifuncionalHPOfficeJetPro = new Productos(
    "Impresora multifuncional HP OfficeJet Pro 6968",
    "Impresoras",
    "US$149.99",
    "Una impresora todo en uno de alta calidad para oficinas, con impresión a doble cara automática, conectividad inalámbrica, escaneo a doble cara, alimentador de documentos automático y alta velocidad de impresión."
)

let discoDuroExternoSeagateExpansion = new Productos(
    "Disco duro externo Seagate Expansion 2 TB",
    "Almacenamiento interno",
    "US$69.99",
    "Un disco duro externo de 2 TB de capacidad con conexión USB 3.0 para transferencias de datos rápidas, diseño portátil y compatibilidad con PC y Mac. Perfecto para hacer copias de seguridad de archivos y almacenar datos adicionales."
)

let monitorDellUltraSharp = new Productos(
    "Monitor Dell UltraSharp",
    "Monitores",
    "US$349.99",
    "Un monitor de 27 pulgadas con resolución QHD, amplios ángulos de visión, calibración de fábrica para colores precisos, puertos HDMI y DisplayPort, y diseño ergonómico ajustable en altura para una experiencia de visualización óptima."
)

//pusheo y mando al local storage

productosEnStock.push(laptopAcerAspire, mouseGamingLogitechGPro, impresoraMultifuncionalHPOfficeJetPro, discoDuroExternoSeagateExpansion, monitorDellUltraSharp)

localStorage.setItem('productosEnStock', JSON.stringify(productosEnStock));


//Obtener la referencia al form y a los campos

let formulario = document.getElementById('agregarProducto');
let nombreInput = document.getElementById('nombreProductoNuevo');
let categoriaInput = document.getElementById('categoriaProductoNuevo');
let precioInput = document.getElementById('precioProductoNuevo');
let descripcionInput = document.getElementById('descripcionProductoNuevo');

//Escuchar el evento "submit" en el formulario y prevenir el envio del form

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    //obtengo datos del usuario

    let nombreProducto = nombreInput.value;
    let categoriaProducto = categoriaInput.value;
    let precioProducto = precioInput.value;
    let descripcionProducto = descripcionInput.value;

    //valido que ingresen todos los datos required

    if (nombreProducto === '' || categoriaProducto === '' || precioProducto === '' || descripcionProducto === '') {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    //creo instancia de la clase Productos con los valores ingresados
    let productoNuevo = new Productos(nombreProducto, categoriaProducto, precioProducto, descripcionProducto);

    // Obtener el array de productos del Local Storage o crearlo sino existe
    let stockEnLocalStorage = JSON.parse(localStorage.getItem('productosEnStock')) || [];

    // Agregar el nuevo producto al array de productos
    stockEnLocalStorage.push(productoNuevo);

    // Guardar el array de productos actualizado en el Local Storage
    localStorage.setItem('productosEnStock', JSON.stringify(stockEnLocalStorage));

    // Limpiar los campos del formulario después de agregar el producto
    nombreInput.value = '';
    categoriaInput.value = '';
    precioInput.value = '';
    descripcionInput.value = '';

    // Mostrar un mensaje de éxito

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado con éxito al stock',
        showConfirmButton: false,
        timer: 1000
      })
});

// Código JavaScript para manejar el clic en el botón de ver stock
document.getElementById('verStockBtn').addEventListener('click', function () {
    // Obtener el array de productos del Local Storage
    let stockEnLocalStorage = JSON.parse(localStorage.getItem('productosEnStock'));

    // Obtener el elemento ul del DOM donde se mostrará el stock
    let ulStock = document.getElementById('ulStock');

    // Limpiar el contenido existente del ul
    ulStock.innerHTML = '';

    // Mostrar el stock en el ul como una lista desordenada
    if (stockEnLocalStorage && stockEnLocalStorage.length > 0) {
        stockEnLocalStorage.forEach(function (producto) {
            let li = document.createElement('li');
            li.textContent = `Nombre: ${producto.nombre},Categoría: ${producto.categoria}, Precio: ${producto.precio}, Descripción: ${producto.descripcion}`;
            ulStock.appendChild(li);
        });
    } else {
        let li = document.createElement('li');
        li.textContent = 'No hay productos en stock.';
        ulStock.appendChild(li);
    }
});

//boton busqueda

function buscarPorCategoria() {
    const categoriaSeleccionadaValor = categoriaSeleccionada.value;
    const productosFiltrados = productosEnStock.filter(function (producto) {
        return producto.categoria.toLowerCase() === categoriaSeleccionadaValor.toLowerCase();
    });

    ulStock.innerHTML = ''; // Limpiar contenido existente

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(function (producto) {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${producto.nombre}, Categoría: ${producto.categoria}, Precio: ${producto.precio}, Descripción: ${producto.descripcion}`;
            ulStock.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron productos en la categoría seleccionada.';
        ulStock.appendChild(li);
    }
}

// Manejar evento de click en el botón de búsqueda de categoría
btnBuscarCategoria.addEventListener('click', function (event) {
    event.preventDefault();
    buscarPorCategoria();
});

//btn limpiar pantalla

document.getElementById("btnLimpiar").addEventListener("click", function() {
    let ulStock = document.getElementById('ulStock');
    ulStock.innerHTML = '';
});


//Imagen ramdom

const numItemsToGenerate = 1; 

function renderItem(){
  fetch(`https://source.unsplash.com/1600x900/?beach`).then((response)=> {   
    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
      <img class="beach-image" src="${response.url}" alt="beach image"/>
    `     
    document.body.appendChild(item);
  }) 
}
for(let i=0;i<numItemsToGenerate;i++){
  renderItem();
}