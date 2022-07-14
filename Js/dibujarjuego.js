//funcion para pedir la palabra ingresada
function llamardatosstg() {
    var palabranueva = sessionStorage.getItem("palabra");
    return palabranueva;
}

//Secciones de dibujar horca
function dibujarsuelo(pincel) {

    pincel.lineWidth = 10;
    pincel.beginPath();
    pincel.moveTo(5, 490);
    pincel.lineTo(445, 490);
    pincel.stroke();

}

function dibujarhorca(pincel) {

    pincel.beginPath();
    pincel.moveTo(100, 10);
    pincel.lineTo(100, 490);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(100, 15);
    pincel.lineTo(350, 15);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(345, 15);
    pincel.lineTo(345, 100);
    pincel.stroke();

}

function dibujarcabeza(pincel) {
    pincel.beginPath();
    pincel.arc(345, 145, 45, 0, 2 * Math.PI);
    pincel.stroke();
}

function dibujartronco(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(345, 350);
    pincel.stroke();
}

function dibujarbrzizq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(295, 280);
    pincel.stroke();
}

function dibujarbrzder(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 195);
    pincel.lineTo(395, 280);
    pincel.stroke();
}

function dibujarlegizq(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(305, 450);
    pincel.stroke();
}

function dibujarlegder(pincel) {
    pincel.beginPath();
    pincel.moveTo(345, 338);
    pincel.lineTo(385, 450);
    pincel.stroke();
}

function dibujarlineas(palabrasecreta) {

    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#710a29";

    var sizeline = 800 / palabrasecreta.length;

    for (let i = 0; i < palabrasecreta.length; i++) {
        lineas.beginPath()
        lineas.moveTo(230 + (sizeline * i), 130);
        lineas.lineTo(285 + (sizeline * i), 130);
        lineas.stroke();
        lineas.closePath();
    }
}

function dibujarletrasCorrectas(palabrasecreta, ubicacion) {

    lineas.font = "bold 52px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#710a29";
    lineas.fillStyle = "#710a29";

    var sizeline = 800 / palabrasecreta.length;
    lineas.fillText(palabrasecreta[ubicacion], 235 + (sizeline * ubicacion), 100);
}

function dibujarletrasIncorrectas(letra, contadorerrores) {

    lineas.font = "bold 40px Montserrat";
    lineas.lineWidth = 5;
    lineas.lineCap = "round"
    lineas.LineJoin = "round";
    lineas.strokeStyle = "#710a29";
    lineas.fillStyle = "#710a29";

    lineas.fillText(letra, 250 + (40 * (10 - contadorerrores)), 200, 40);
}

function verificartecla(teclapress) {
    if (letras.length < 1 || letras.indexOf(teclapress) < 0) {
        letras.push(teclapress)
        return false;
    }
    else {
        letras.push(teclapress)
        return true;
    }
}

//Funcion de dibujar Horca
function horca(contadorerrores, palabrasecreta) {

    pincel.strokeStyle = "#710a29";
    pincel.lineWidth = 10;
    //Dibujamos el ahorcado
    //450 x 500 pixeles

    if (contadorerrores == 1) {
        //Dibujar horca
        dibujarsuelo(pincel);
    }

    if (contadorerrores == 2) {
        //Dibujar horca
        dibujarhorca(pincel);
    }

    if (contadorerrores == 3) {
        //Dibujar cabeza
        dibujarcabeza(pincel);
    }

    if (contadorerrores == 4) {
        //Dibujar tronco
        dibujartronco(pincel);
    }

    if (contadorerrores == 5) {
        //Dibujar brazo izquierdo
        dibujarbrzizq(pincel);
    }

    if (contadorerrores == 6) {
        //Dibujar brazo derecho
        dibujarbrzder(pincel);
    }

    if (contadorerrores == 7) {
        //Dibujar pierna izquierda
        dibujarlegizq(pincel);
    }

    if (contadorerrores == 8) {
        //Dibujar pierna derecha
        dibujarlegder(pincel);
        swal({
            title: "Perdiste",
            text: "La palabra correcta es " + palabrasecreta,
            icon: 'error',
            button: "Nuevo Juego",
        }).then(respuesta => {
            if (respuesta == true) {
                window.location.href = "../html/game.html";
            }
            else {
                window.location.href = "../index.html";
            }
        })
    }
}

//Logica de la horca
function logicahorca(palabrasecreta) {
    dibujarlineas(palabrasecreta);
    var contenedorletras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    document.addEventListener("keydown", function (letraingresada) {
        var letra = letraingresada.key.toUpperCase();

        for(var k = 0; k < contenedorletras.length;k++){
            if(contenedorletras[k]==letra){
                //Detectar letras repetidas o presionadas
                if (!verificartecla(letraingresada.key)) {
    
                    //Detectar Si se acierta la letra
                    if(palabrasecreta.includes(letra)){
    
                        //Si se acierta la letra se dibuja en el canvas
                        for(var i = 0; i < palabrasecreta.length;i++){
                            if(palabrasecreta[i]==letra){
                                dibujarletrasCorrectas(palabrasecreta,i);
                                contadoraciertos++;
                            }
                        }
    
                        if(contadoraciertos == palabrasecreta.length){
                            swal({
                                title: "Ganaste",
                                text: "La palabra correcta es " + palabrasecreta,
                                icon: 'success',
                                button: "Nuevo Juego",
                            }).then(respuesta => {
                                if (respuesta == true) {
                                    window.location.href = "../html/game.html";
                                }
                                else {
                                    window.location.href = "../index.html";
                                }
                            })
                        }
                    }
                    else{
                        contadorerrores++;
                        dibujarletrasIncorrectas(letra, contadorerrores);
                        horca(contadorerrores, palabrasecreta);
                    }
                }
            }
        }      
    })
}