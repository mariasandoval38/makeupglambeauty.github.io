const bolsas = [
    {
        imagen: 'base.jpg',
        titulo: 'Base Dior ',
        descripcion: 'Base Dior líquida tono Beige',
        precio: '$896 MXN',
        link: 'https://www.dior.com'
    },
    {
        imagen: 'rimel.jpg',
        titulo: 'Rímel Mirada explosiva Maybelline',
        descripcion: 'Alargador de pestañas mirada explosiva negro intenso',
        precio: '$392 MXN',
        link: 'https://www.maybelline.com'
    },
    {
        imagen: 'rubor.jpg',
        titulo: 'Rubor Rare Beauty',
        descripcion: 'Rubor Rare Beauty en polvo tono Happy',
        precio: '$756 MXN',
        link: 'https://www.rarebeauty.com'
    },
    {
        imagen: 'gloss.jpg',
        titulo: 'Gloss Kiko Milano',
        descripcion: 'Gloss Kiko Milano tono 20',
        precio: '$500 MXN',
        link: 'https://share.google/8dO5jMqsaLZeuIxsd'
    }
];

let deseos = [];

function crearCatalogo() {
    const catalogo = document.getElementById('catalogo');

    bolsas.forEach(bs => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${bs.imagen}" alt="${bs.titulo}">
            <h2>${bs.titulo}</h2>
            <p>${bs.descripcion}</p>
            <p class="price">${bs.precio}</p>
            <div class="acciones">
                <a href="${bs.link}" target="_blank">
                    <button>Comprar</button>
                </a>
                <span class="wishlist" title="Agregar a la lista de deseos">
                    <i class="fa-solid fa-heart"></i>
                </span>
            </div>
        `;

        catalogo.appendChild(card);
    });

    agregarEventosCorazones();
}

function agregarEventosCorazones() {
    const corazones = document.querySelectorAll('.wishlist i');
    const listaDeseos = document.getElementById('lista-deseos');

    corazones.forEach((icono, index) => {
        icono.addEventListener('click', () => {
            icono.classList.toggle('activo');
            const producto = bolsas[index];

            const existente = deseos.find(p => p.titulo === producto.titulo);

            if (existente) {
                deseos = deseos.filter(p => p.titulo !== producto.titulo);
                eliminarDeListaDeseos(producto.titulo);
            } else {
                deseos.push(producto);
                agregarAListaDeseos(producto);
            }

            verificarListaVacia();
        });
    });
}

function agregarAListaDeseos(producto) {
    const listaDeseos = document.getElementById('lista-deseos');

    const card = document.createElement('div');
    card.classList.add('deseo');
    card.setAttribute('data-titulo', producto.titulo);
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="info">
            <h3>${producto.titulo}</h3>
            <p>${producto.precio}</p>
        </div>
        <button class="eliminar-deseo" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
    `;

    listaDeseos.appendChild(card);

    card.querySelector('.eliminar-deseo').addEventListener('click', () => {
        eliminarDeListaDeseos(producto.titulo);
        deseos = deseos.filter(p => p.titulo !== producto.titulo);

        const corazones = document.querySelectorAll('.wishlist i');
        corazones.forEach(icono => {
            const titulo = icono.closest('.card').querySelector('h2').innerText.trim();
            if (titulo === producto.titulo) {
                icono.classList.remove('activo');
            }
        });

        verificarListaVacia();
    });
}

function eliminarDeListaDeseos(titulo) {
    const item = document.querySelector(`#lista-deseos .deseo[data-titulo="${titulo}"]`);
    if (item) item.remove();
}

function verificarListaVacia() {
    const listaDeseos = document.getElementById('lista-deseos');
    if (listaDeseos.children.length === 0) {
        listaDeseos.innerHTML = '<p class="vacio">Tu lista de deseos está vacía</p>';
    } else {
        const vacio = listaDeseos.querySelector('.vacio');
        if (vacio) vacio.remove();
    }
}
crearCatalogo();
verificarListaVacia();
