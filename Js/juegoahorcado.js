//matriz con palabras
let palabras = ["HTML","VARIABLE","ALURA","JAVASCRIPT","FRONTEND","BACKEND","TRELLO","ORACLE","ONE","INDEX","GITHUB","COLOMBIA","RETO","DISCORD","CANVAS","CODING","JSON","RANDOM","SCRIPT","GIT","FIGMA"];

var lienzo = document.querySelector("#dibujoahorcado");
var pincel = lienzo.getContext("2d");
var textoslienzo = document.querySelector("#lineasahorcado");
var lineas = textoslienzo.getContext("2d");

var letras = [];
var contadorerrores = 0;
var contadoraciertos = 0;

function crearpalabra(){
    var palabrasecreta = (palabras[(Math.floor(Math.random()*(palabras.length)))]);
    return palabrasecreta;
}

var palabraaingresar = llamardatosstg();

//Si no se ingresó una palabra anteriormente, se ejecuta este código
if(palabraaingresar == null){

    palabrasecreta = crearpalabra();
    dibujarlineas(palabrasecreta);
    logicahorca(palabrasecreta);
    
}
//Si se ingresó una palabra anteriormente, se ejecuta este código
else{

    palabras.push(palabraaingresar);
    palabrasecreta = crearpalabra();
    dibujarlineas(palabrasecreta);
    logicahorca(palabrasecreta);

}