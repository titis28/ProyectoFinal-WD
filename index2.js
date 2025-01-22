let recetas = [];

async function cargarRecetas(){
    try{
        let respuesta = await fetch("../json/recetas.json");
        recetas = await respuesta.json();
    } catch (error) {
        console.log(error => console.error("Error Al Cargar La Información:", error));
    }
}

function actualizarInfo(){
    let receta = document.getElementById("receta");
    let campo = document.getElementById("campo");
    let informacion = document.getElementById("informacion");
    let indiceSeleccionado = parseInt(receta.value, 6);
    let campoSeleccionado = campo.value;

    if (indiceSeleccionado < 0){
        informacion.value = "Selecciona una receta válida";
        return;
    }

    let datos = recetas[indiceSeleccionado];

    if (recetas && campoSeleccionado in datos){
        if (campoSeleccionado === "ingredientes") {
            let ingredientes = datos[campoSeleccionado].split(",").map(ing => `- ${ing.trim()}`).join("\n");
            informacion.textContent = ingredientes;
        } else if (campoSeleccionado === "pasos") {
            let pasos = datos[campoSeleccionado].split(". ").map((paso, index) => `- ${paso.trim()}`).join("\n");
            informacion.textContent = pasos;
        } else {
            informacion.textContent = datos[campoSeleccionado];
        }
    } else {
        informacion.textContent = "Información no disponible";
    }
}

async function init(){
    await cargarRecetas();
    document.getElementById("receta").addEventListener("change", actualizarInfo);
    document.getElementById("campo").addEventListener("change", actualizarInfo);
}

init()
    .then(() => {
        console.log("Inicialización Completa");
    }).catch((error) => {
    console.log(`Error Durante La Inicialización ${error.message}`);
})

/*Cambiar fondo con imagenes */
class Selector{
    constructor(imagenes){
        this.imagenes = imagenes;
        this.indice = -1;
    }

    siguienteImagen(){
        this.indice = (this.indice + 1) % this.imagenes.length;
        return this.imagenes[this.indice];
    }
}

class Fondo extends Selector {
    constructor(imagenes) {
        super(imagenes);
    }

    aplicarFondo(elemento){
        let siguienteImagen = this.siguienteImagen();
        if (siguienteImagen){
            elemento.style.backgroundImage = `url(${siguienteImagen})`;
            elemento.style.backgroundSize = 'cover';
            elemento.style.backgroundRepeat = 'no-repeat';
        }else{
            elemento.style.backgroundColor = "#f9ede5";
        }
    }

    resetearFondo(elemento){
        elemento.style.background = "#f9ede5";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let cuerpo = document.getElementById("cuerpo");
    let boton = document.getElementById("boton");
    let imagenes = ["../img/img1.jpg", "../img/img2.jpg", "../img/img3.jpg"];
    let fondo = new Fondo(imagenes);
    let contador = 0;

    boton.addEventListener("click", () => {
        contador++;
        if (contador <= 3){
            fondo.aplicarFondo(cuerpo);
        }else{
            fondo.resetearFondo(cuerpo);
            contador = 0;
        }
    });
})