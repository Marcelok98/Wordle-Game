const intentosTexto = document.getElementById('intentos');
let intentosRestantes = 6;
const input = document.getElementById('texto');
const boton = document.getElementById('boton');
const contenedor = document.getElementById('contenedor');
const advertencia = document.getElementById('advertencia');
const lista = document.getElementById('lista');
const botonBorrar = document.getElementById('botonBorrar');
const reiniciar = document.createElement('button'); // Crear un boton
reiniciar.classList.add('reiniciar'); //proporciona una clase al boton para proporcionarle estilos
reiniciar.textContent = 'Reiniciar';
let c = 0;
//let palabras = ['perro', 'arbol', 'juego', 'feliz', 'leche'];
let palabraObjetivo;

botonBorrar.style.display = 'none';
//let objetivo = palabras[Math.floor(Math.random() * palabras.length)];

// Función para obtener una palabra aleatoria de la API y convertirla en string
async function obtenerPalabraAleatoria() {
    try {
        //la terminacion de c=1 indica que solo devuelva una palabra y l=5 que su longitud sea de 5 caracteres
        const respuesta = await fetch('https://clientes.api.greenborn.com.ar/public-random-word?c=5&l=5');
        const data = await respuesta.json();
        console.log(data);
        /* seccion que filtra las palabras devueltas por la api, que se asegura que no contenga acentos */
        palabraObjetivo = data.find(function(palabra) {
            return palabra.length === 5; // Aseguramos que no contenga acentos
        });
        palabraObjetivo = String(palabraObjetivo); // Convertimos la palabra al primer elemento del array y lo aseguramos como string
    } catch (error) {
        console.error('Error al obtener la palabra:', error);
        alert('No se pudo obtener una palabra aleatoria. Intenta nuevamente.');
        return ""; // Retorna una cadena vacia si hay un error
    }
}


obtenerPalabraAleatoria();

//evento que transforma mayusculas en minusculas
input.addEventListener('input', function() {
    this.value = this.value.toLowerCase();
});


boton.addEventListener('click', function() {
    // Obtener el valor ingresado
    
    console.log(palabraObjetivo);
    //console.log(objetivo);
    const texto = document.getElementById('texto').value; //la palabra ingresada por el usuario
    if (texto.length === 5) {
        intentosRestantes--;
        intentosTexto.textContent = 'Numero de intentos restantes: ' + intentosRestantes;
        const nueva_palabra = document.createElement('li'); //elemento <li>
        for (let i = 0; i < texto.length; i++) {
            const letra = texto[i];
            const verde = palabraObjetivo[i];
            const span = document.createElement('span');
            span.textContent = letra;
            // Verificar si la letra ingresada esta en la palabra objetivo y en la misma posicion
            if (verde === letra)
                span.style.backgroundColor = 'green';
            else if(palabraObjetivo.includes(letra))
                span.style.backgroundColor = 'yellow';
            nueva_palabra.appendChild(span);
        }  
        lista.appendChild(nueva_palabra);
    
        c++;
        botonBorrar.style.display = 'inline'; // Muestra el boton de rendirse
        console.log(c);
    //AL <ul> SE LE AGREGA UN <li> y luego a este se le agrega <span>

    /*resultado.style.display='block';*/         
    } else {
        alert('Por favor, ingresa una palabra de exactamente 5 letras.'); // Alertar si la palabra no tiene 5 letras
        advertencia.innerHTML = '';
    }
    if (c>5){
        lista.innerHTML = `La palabra a adivinar era: ${palabraObjetivo}`;
        advertencia.innerHTML = '';
        contenedor.appendChild(reiniciar); // Agregar el boton al contenedor
        reiniciar.style.display = 'inline';
        botonBorrar.style.display = 'none';
        boton.style.display = 'none';
        
        
    }
    if (texto === palabraObjetivo){
        c = 0;
        intentosRestantes=6;
        intentosTexto.textContent = 'Numero de intentos restantes: ' + intentosRestantes;
        lista.innerHTML = `¡Felicidades! Acertaste la palabra 😺`;
        botonBorrar.style.display = 'none';
        contenedor.appendChild(reiniciar);
        boton.style.display = 'none';

        
    }
    
});

botonBorrar.addEventListener('click', function() {
    finalizar();
    input.value='';
});

reiniciar.addEventListener('click', function() {
    input.value = '';
    botonBorrar.style.display = 'none';
    reiniciar.style.display = 'none';
    boton.style.display = 'inline';
    lista.innerHTML = '';
    c=0;
    intentosRestantes=6;
    intentosTexto.textContent = 'Numero de intentos restantes: ' + intentosRestantes;
    obtenerPalabraAleatoria();
});

function finalizar(){
    lista.innerHTML = ''; // Limpiar la lista
    c = 0;
    intentosRestantes=6;
    intentosTexto.textContent = 'Numero de intentos restantes: ' + intentosRestantes;
    lista.innerHTML = `La palabra a adivinar era: ${palabraObjetivo}`;
    botonBorrar.style.display = 'none';
    contenedor.appendChild(reiniciar);
    reiniciar.style.display = 'inline';
    boton.style.display = 'none';
}
