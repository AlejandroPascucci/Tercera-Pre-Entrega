





const productos = [
    {
        id: 1,
        nombre: 'Red de 1/4"',
        precio: 10000,
        images: '../images/M4.jpg'
    },
    {
        id: 2,
        nombre: 'Red de 3/4"',
        precio: 12000,
        images: '../images/M2.jpg'
    },
    {
        id: 3,
        nombre: 'Red de 2"',
        precio: 10000,
        images: '../images/M3.jpg'
    },
    {
        id: 4,
        nombre: 'Funda capucha 7RIM',
        precio: 10000,
        images: '../images/M5.jpg'
    },
    {
        id: 5,
        nombre: 'Porta PAM lona',
        precio: 5000,
        images: '../images/M6.jpg'
    },
    {
        id: 6,
        nombre: 'Thali tempex',
        precio: 5000,
        images: '../images/M7.jpg'
    },
    {
        id: 7,
        nombre: 'thali cuero',
        precio: 4000,
        images: '../images/M8.jpg'
    },
    {
        id: 8,
        nombre: 'funda capucha',
        precio: 5000,
        images: '../images/M9.jpg'
    }

];




localStorage.setItem('productos', JSON.stringify(productos));

const productosGuardados = JSON.parse(localStorage.getItem('productos'));

console.log(productosGuardados);
