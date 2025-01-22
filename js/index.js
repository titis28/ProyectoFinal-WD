let animacion = document.getElementById("animacion");
let activar = false;
let frame = 0;
let intervalo;

function transicion(){
    let imagen = `imagen_${(frame % 8) +1}.jpg`;
    animacion.style.backgroundImage = `url("../img_animacion/${imagen}")`;
}

animacion.addEventListener("dblclick", function(){
    if(!activar){
        activar = true;
        intervalo = setInterval(() => {
            transicion();
            frame++;
        }, 100)
    } else {
        activar = false;
        clearInterval(intervalo);
    }
});
transicion();

function cambiarFondo(){
    document.body.style.backgroundColor = document.body.style.backgroundColor === "rgb(255, 112, 67)" ? "#f7f7f7" : "#ff7043";
}

function transformarElemento(){
    let forma = document.getElementById("cuadrado");
    forma.style.borderRadius = forma.style.borderRadius === "50%" ? "0%" : "50%";
}
