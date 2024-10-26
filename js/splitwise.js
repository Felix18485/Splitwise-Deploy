//Estan declaradas como variables globales porque las necesito utilizar varias veces
let gastoUsuario = 0;
let gastoDebido = 0;
class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    //Metodo para añadir el gasto al usuario
    añadirGasto() {
        let importe = document.getElementById("inputImporte");
        let fecha = document.getElementById("inputFecha");
        let titulo = document.getElementById("inputTitulo");
        let gasto = new Gasto(titulo.value, importe.value, fecha.value);
        this.gastos.push(gasto);
    }

    mostrarResumen() {
        let divPrincipal = document.createElement("div");
        divPrincipal.setAttribute("class", "card mb-12 espacio");
        let divSecundario = document.createElement("div");
        divSecundario.setAttribute("class", "row g-0");
        let divImagen = document.createElement("div");
        divImagen.setAttribute("class", "col-md-2");
        let imagen = document.createElement("img");
        imagen.setAttribute("src", this.pathImg);
        imagen.setAttribute("class", "img-fluid rounded-start");
        let divCarta = document.createElement("div");
        divCarta.setAttribute("class", "col-md-10");
        let divCartaCuerpo = document.createElement("div");
        divCartaCuerpo.setAttribute("class", "card-body");
        let tituloCarta = document.createElement("h5");
        tituloCarta.setAttribute("class", "card-title");
        tituloCarta.textContent = this.nombre;
        let parrafo = document.createElement("p");
        parrafo.setAttribute("class", "card-text");
        let inputImporte = document.getElementById("inputImporte");
        let inputFecha = document.getElementById("inputFecha");
        parrafo.textContent = "Pagó " + inputImporte.value + "€ el " + inputFecha.value;
        divImagen.append(imagen);
        divCartaCuerpo.append(tituloCarta, parrafo);
        divCarta.append(divCartaCuerpo);
        divSecundario.append(divImagen, divCarta);
        divPrincipal.append(divSecundario);
        let contenedor = document.getElementById("accordion");
        contenedor.append(divPrincipal);
    }

    mostrarCuenta(gastoUsuario, gastoDebido, indice){
        let divPrincipal = document.createElement("div");
        divPrincipal.setAttribute("class", "card mb-12 espacio");
        let divSecundario = document.createElement("div");
        divSecundario.setAttribute("class", "row g-0");
        let divImagen = document.createElement("div");
        divImagen.setAttribute("class", "col-md-2");
        let imagen = document.createElement("img");
        imagen.setAttribute("src", this.pathImg);
        imagen.setAttribute("class", "img-fluid rounded-start");
        let divCarta = document.createElement("div");
        divCarta.setAttribute("class", "col-md-10");
        let divCartaCuerpo = document.createElement("div");
        divCartaCuerpo.setAttribute("class", "card-body");
        let tituloCarta = document.createElement("h5");
        tituloCarta.setAttribute("class", "card-title");
        tituloCarta.textContent = this.nombre;
        let parrafo = document.createElement("p");
        parrafo.setAttribute("id",`parrafo${indice}`);
        parrafo.setAttribute("class", "card-text");
        parrafo.textContent = "Ha pagado " + gastoUsuario + "€ se le debe " + gastoDebido+"€";
        divImagen.append(imagen);
        divCartaCuerpo.append(tituloCarta, parrafo);
        divCarta.append(divCartaCuerpo);
        divSecundario.append(divImagen, divCarta);
        divPrincipal.append(divSecundario);
        let contenedor = document.getElementById("accordion-three");
        contenedor.append(divPrincipal);
    }


    calcularGastos() {
        //Gasto total que hay que pagar entre todos los usuarios
        let gastoTotal = 0;
        //Gasto que tendra que pagar cada usuario
        let gastoPorPersona = 0;
        //Gasto que debera o le deberan a cada usuario
         gastoDebido = 0;
        //Recorremos los bucles de usuario y de gastos para calcular el gasto total que se tiene que pagar entre todos
        for (let indice = 0; indice < usuarios.length; indice++) {
            for (let i = 0; i < usuarios[indice].gastos.length; i++) {
                gastoTotal += parseFloat(usuarios[indice].gastos[i].monto);
            }
        }

        //Dividimos el gasto total entre todos los usuarios para saber cuanto tiene que pagar cada uno
        gastoPorPersona = gastoTotal / usuarios.length;

        //Volvemos a recorrer los bucles para calcular el gasto que debe cada usuario
        for (let indice = 0; indice < usuarios.length; indice++) {
            //Gasto total de cada usuario
            gastoUsuario = 0;
            //En cada vuelta se calcula todo lo que ha gastado un usuario 
            for (let i = 0; i < usuarios[indice].gastos.length; i++) {
                gastoUsuario += parseFloat(usuarios[indice].gastos[i].monto);
            }
            //Calculamos lo que debe cada uno restando lo que tiene que pagar cada uno por lo que ya ha pagado
            gastoDebido = gastoUsuario - gastoPorPersona;
            //Obtengo el parrafo por su id dinamico
            let parrafo = document.getElementById(`parrafo${indice}`);
            //Si el gastoDebido es mayor que cero implica que se te debe dinero
            if(gastoDebido > 0){
                //Utilizamos toFixed() en el gasto debido para que se quede solo con dos decimales
                parrafo.textContent = parrafo.textContent = "Ha pagado " + gastoUsuario + "€ se le debe " + gastoDebido.toFixed(2)+"€";
            
            //Si el gastoDebido es menor que cero implica que debes dinero
            }else if(gastoDebido < 0){
                //Multiplicamos el gastoDebido por -1 para que al mostrarlo no aparezca con valores negativos
                parrafo.textContent = parrafo.textContent = "Ha pagado " + gastoUsuario + "€ debe " + gastoDebido.toFixed(2) * -1+"€";
                
            }else{
                parrafo.textContent = parrafo.textContent = "Ha pagado todo y no debe nada";
            }
        }
    }

}

//Creamos los usuarios 
let juan = document.getElementById("Juan");
let ana = document.getElementById("Ana");
let sara = document.getElementById("Sara");
let usuarios = [];
let usuarioJuan = new Usuario(juan.value, "./img/usuarios/avatar_a.png");
let usuarioAna = new Usuario(ana.value, "./img/usuarios/avatar_b.png");
let usuarioSara = new Usuario(sara.value, "./img/usuarios/avatar_c.png");
usuarios.push(usuarioJuan, usuarioAna, usuarioSara);

class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
}

let btnEnviar = document.getElementById("btnEnviar");
//Añadimos el evento al boton de enviar para que compruebe si los campos son correctos con expresiones regulares
btnEnviar.addEventListener("click", (event) => {
    //Ponemos el preventDefault para que cuando pulsemos el boton de enviar no vuelva a recargar la pagina
    event.preventDefault();
    let inputTitulo = document.getElementById("inputTitulo");
    let inputImporte = document.getElementById("inputImporte");
    let inputFecha = document.getElementById("inputFecha");
    //Creamos las expresiones regulares para la comprobacion del valor de los inputs
    let regexTitulo = /^[a-zA-Z0-9\s]{1,20}$/;
    let regexImporte = /^(?:1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
    let regexFecha = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    //Creamos la variable valido que se pondra a false en el caso de que alguno de los campos este vacio
    let valido = true;
    if (!inputFecha.value == "" && !inputImporte.value == "" && !inputTitulo.value == "") {
        if (regexTitulo.test(inputTitulo.value)) {
            inputTitulo.setAttribute("class", "inputValid");
            //inputTitulo.style.borderColor = "green";
        } else {
            inputTitulo.setAttribute("class", "inputError");
            //inputTitulo.style.borderColor = "red";
            valido = false;
        }

        if (regexImporte.test(inputImporte.value)) {
            inputImporte.setAttribute("class", "inputValid");
            //inputImporte.style.borderColor = "green";
        } else {
            inputImporte.setAttribute("class", "inputError");
           //inputImporte.style.borderColor = "red";
            valido = false;
        }

        if (regexFecha.test(inputFecha.value)) {
            inputFecha.setAttribute("class", "inputValid");
            //inputFecha.style.borderColor = "green";
        } else {
            inputFecha.setAttribute("class", "inputError");
            //inputFecha.style.borderColor = "red";
            valido = false;
        }
        //Si todos los campos estan bien mostraremos el resumen y añadiremos el gasto al usuario
        if (valido == true) {
            let select = document.getElementById("selectUsuarios");
            if(select.value != "---"){
            //Buscamos la posicion en el array del usuario que tiene el nombre igual al valor seleccionado en el select
            let posicion = usuarios.findIndex(usuario => usuario.nombre === select.value);
            usuarios[posicion].añadirGasto();
            usuarios[posicion].calcularGastos();
            usuarios[posicion].mostrarResumen();
            //Limpiamos los campos y volvemos a poner los bordes en negro
            select.value = "---";
            inputFecha.value = "";
            inputFecha.setAttribute("class", "input");
            //inputFecha.style.borderColor = "black";
            inputImporte.value = "";
            inputImporte.setAttribute("class", "input");
            //inputImporte.style.borderColor = "black";
            inputTitulo.value = "";
            inputTitulo.setAttribute("class", "input");
            //inputTitulo.style.borderColor = "black";
        }else{
            alert("Selecciona un usuario valido");
        }
    }
    } else {
        alert("Todos los campos son obligatorios");
    }
})

for(let indice = 0; indice < usuarios.length; indice++){
    usuarios[indice].mostrarCuenta(gastoUsuario, gastoDebido, indice);
}
