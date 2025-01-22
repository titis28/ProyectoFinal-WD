import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {getFirestore, collection, addDoc, getDocs, doc, getDoc}
    from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1l7DHc3Iga4mdjUgcP3eIaHnO4hcApn4",
    authDomain: "proyectofinal-6915f.firebaseapp.com",
    projectId: "proyectofinal-6915f",
    storageBucket: "proyectofinal-6915f.firebasestorage.app",
    messagingSenderId: "489911568217",
    appId: "1:489911568217:web:1295b95c8bdba97a4cee48"
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let recetasRef = collection(db, "receta");
let recetasSelect = document.getElementById("recetasSelect");

async function cargarRecetas() {
    recetasSelect.innerHTML = '<option value="">--- Seleccione una receta ---</option>';
    try{
        let querySnapshot = await getDocs(recetasRef);
        querySnapshot.forEach((doc) => {
            let receta = doc.data();
            let option = document.createElement("option");
            option.value = doc.id;
            option.text = receta.nombre;
            recetasSelect.add(option);
        });
    }catch (e){
        console.error(`No fue posible cargar la lista de recetas debido al error ${e}`);
        alert("No fue posible cargar la lista de recetas");
    }
}

cargarRecetas().then();

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("ingredientes").value = "";
    document.getElementById("pasos").value = "";
    document.getElementById("porciones").value = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("imagen").value = "";
    recetasSelect.selectedIndex = 0;
}

let registrar = document.getElementById("registrar");
registrar.addEventListener("click", async (event) => {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let ingredientes = document.getElementById("ingredientes").value;
    let pasos = document.getElementById("pasos").value;
    let porciones = document.getElementById("porciones").value;
    let tiempo = document.getElementById("tiempo").value;
    let imagen = document.getElementById("imagen").value;

    if(nombre === "" || ingredientes === "" ||  pasos === ""  ||  porciones === "" ||  tiempo === "" ||  imagen === ""){
        alert("Por favor, completa toda la información");
        return;
    }

    try{
        let nuevaReceta = {
            nombre: nombre,
            ingredientes: ingredientes,
            pasos: pasos,
            porciones: parseInt(porciones),
            tiempo: tiempo,
            imagen: imagen,
        };

        let docRef = await addDoc(recetasRef, nuevaReceta);
        console.log(`Documento registrado con el id ${docRef.id}`);
        alert("Receta registrada con éxito");
        limpiarCampos();
        await cargarRecetas();
    }catch (e) {
        console.error(`No fue posible agregar el documento debido al error ${e}`);
        alert("ERROR al registrar la receta");
    }
});

async function mostrarReceta(recetaId){
    try{
        let docRef = doc(db, "receta", recetaId);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            let receta = docSnap.data();
            document.getElementById("nombre").value = receta.nombre;
            document.getElementById("ingredientes").value = receta.ingredientes;
            document.getElementById("pasos").value = receta.pasos;
            document.getElementById("porciones").value = receta.porciones;
            document.getElementById("tiempo").value = receta.tiempo;
            document.getElementById("imagen").value = receta.imagen;
        }else{
            console.log("El documento no existe!");
            alert("La Receta no existe!");
        }
    }catch (e){
        console.error(`No fue posible mostrar el documento debido al error ${e}`);
        alert("No fue posible mostrar el documento!");
    }
}

recetasSelect.addEventListener("change", () => {
    let recetaId = recetasSelect.value;
    if (recetaId){
        mostrarReceta(recetaId).then();
    }else{
        limpiarCampos();
    }
})

/*Cambiar fondo*/
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
    let imagenes = ["../img/img4.jpg", "../img/img5.jpg", "../img/img6.jpg"];
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
