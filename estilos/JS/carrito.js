document.addEventListener('DOMContentLoaded', () => {




let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');


function renderizarProductos() {
    productos.forEach((info) => {

        const producto = document.createElement('div');
        producto.classList.add('card', 'col-sm-4');

        const productoCardBody = document.createElement('div');
        productoCardBody.classList.add('card-body');

        const productoTitle = document.createElement('h5');
        productoTitle.classList.add('card-title');
        productoTitle.textContent = info.nombre;

        const productoImagen = document.createElement('img');
        productoImagen.classList.add('img-fluid');
        productoImagen.setAttribute('src', info.images);

        const productoPrecio = document.createElement('p');
        productoPrecio.classList.add('card-text');
        productoPrecio.textContent = `${info.precio}${divisa}`;

        const productoBoton = document.createElement('button');
        productoBoton.classList.add('btn', 'btn-primary');
        productoBoton.textContent = 'Añadir al carrito';
        productoBoton.setAttribute('marcador', info.id);
        productoBoton.addEventListener('click', añadirAlCarrito);

        productoCardBody.appendChild(productoImagen);
        productoCardBody.appendChild(productoTitle);
        productoCardBody.appendChild(productoPrecio);
        productoCardBody.appendChild(productoBoton);
        producto.appendChild(productoCardBody);
        DOMitems.appendChild(producto);
    });
}


function añadirAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

}



function renderizarCarrito() {

    DOMcarrito.textContent = '';


    const carritoSinDuplicados = [...new Set(carrito)];


    carritoSinDuplicados.forEach((item) => {

        const miItem = productos.find((itemproductos) => itemproductos.id === parseInt(item));


        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);


        const producto = document.createElement('li');
        producto.classList.add('list-group-item', 'text-right', 'mx-2');
        producto.textContent = `${numeroUnidadesItem} x ${miItem.nombre} - ${miItem.precio}${divisa}`;


        const boton = document.createElement('button');
        boton.classList.add('btn', 'btn-outline-danger', 'mx-5');
        boton.textContent = 'Quitar';
        boton.style.marginLeft = '1rem';
        boton.dataset.item = item;
        boton.addEventListener('click', borrarItemCarrito);

        producto.appendChild(boton);
        DOMcarrito.appendChild(producto);
    });

    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(event) {
    const itemId = event.target.dataset.item;

    const index = carrito.findIndex((item) => item === itemId);

    if (index !== -1) {
        carrito.splice(index, 1);
    }

    renderizarCarrito();
}


function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}

function comprarCarrito() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Estas seguro de la Compra?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "si, quiero comprar",
        cancelButtonText: "No, cancelar compra!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Gracias por tu compra!",
                text: "tus produtos se enviaran a la brevedad",
                icon: "success"
            });
        } else if (

            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Segui viendo :)",
                icon: "error"
            });
        }
    });
    
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', comprarCarrito);

renderizarProductos();
renderizarCarrito();
;

});

