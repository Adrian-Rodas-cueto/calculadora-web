//capturar los numeros
const num0 = document.getElementById("0")
const num1 = document.getElementById("1")
const num2 = document.getElementById("2")
const num3 = document.getElementById("3")
const num4 = document.getElementById("4")
const num5 = document.getElementById("5")
const num6 = document.getElementById("6")
const num7 = document.getElementById("7")
const num8 = document.getElementById("8")
const num9 = document.getElementById("9")
const div = document.getElementById("/")
const multi = document.getElementById("x")
const suma = document.getElementById("+")
const resta = document.getElementById("-")
const del = document.getElementById("del")
const reset = document.getElementById("reset")
const igual = document.getElementById("=")
let panel = document.getElementById("panel")
let pantalla = "0"

//capturar cuando se hace click
num1.addEventListener("click", function () {
    escribir(num1.getAttribute("value"))
})
num2.addEventListener("click", function () {
    escribir(num2.getAttribute("value"))
})
num3.addEventListener("click", function () {
    escribir(num3.getAttribute("value"))
})
num4.addEventListener("click", function () {
    escribir(num4.getAttribute("value"))
})
num5.addEventListener("click", function () {
    escribir(num5.getAttribute("value"))
})
num6.addEventListener("click", function () {
    escribir(num6.getAttribute("value"))
})
num7.addEventListener("click", function () {
    escribir(num7.getAttribute("value"))
})
num8.addEventListener("click", function () {
    escribir(num8.getAttribute("value"))
})
num9.addEventListener("click", function () {
    escribir(num9.getAttribute("value"))
})
num0.addEventListener("click", function () {
    escribir(num0.getAttribute("value"))
})
div.addEventListener("click", function () {
    escribir(div.getAttribute("value"))
})
multi.addEventListener("click", function () {
    escribir(multi.getAttribute("value"))
})
suma.addEventListener("click", function () {
    escribir(suma.getAttribute("value"))
})
resta.addEventListener("click", function () {
    escribir(resta.getAttribute("value"))
})
igual.addEventListener("click", function () {
    calcular()
})
reset.addEventListener("click", function () {
    borrar(reset)
})
del.addEventListener("click", function () {
    borrar(del)
})

// borrar pantalla
function borrar(del) {
    if (del.getAttribute("value") == "del" && pantalla.length > 1) {
        var aux = ""
        for (let i = 0; i < (pantalla.length - 1); i++) {
            aux += pantalla.charAt(i)
        }
        pantalla = aux
        panel.setAttribute("value", aux)
    }
    else {
        panel.setAttribute("value", "0")
        pantalla = "0"
    }
}

//escribir en pantalla
function escribir(dato) {
    if (dato != "=") {
        if (pantalla == "0") {
            pantalla = dato
            panel.setAttribute("value", pantalla)
        }
        else {
            pantalla += dato
            panel.setAttribute("value", pantalla)
        }
    }
}

//captar el contenido de la pantalla

function operadoresabuscar(operador1, operador2) {
    let a, b, c, operaciones = ""
    for (let i = 0; i < pantalla.length; i++) {
        if (pantalla.charAt(i) == operador1 || pantalla.charAt(i) == operador2) {
            a = atras(i, 0)
            b = adelante(i, (pantalla.length - 1))
            c = pantalla.charAt(i)
            operaciones += (a + c + b + " ")
        }
    }
    return operaciones
}

function atras(inicio, final) {
    let a = ""
    for (let i = (inicio - 1); i >= final; i--) {
        if (pantalla.charAt(i) != "+" && pantalla.charAt(i) != "-" && pantalla.charAt(i) != "/" && pantalla.charAt(i) != "x") {
            a += pantalla.charAt(i)
        }
        else {
            break
        }
    }
    a = ordenar(a)
    return a
}

function ordenar(a) {
    let aux = ""
    for (let i = a.length; i >= 0; i--) {
        aux += a.charAt(i)
    }
    return aux
}

function adelante(inicio, final) {
    let b = ""
    for (let i = inicio + 1; i <= final; i++) {
        if (pantalla.charAt(i) != "+" && pantalla.charAt(i) != "-" && pantalla.charAt(i) != "/" && pantalla.charAt(i) != "x") {
            b += pantalla.charAt(i)
        }
        else {
            break
        }
    }
    return b
}

//calcular
function calcular() {
    let resultado = 0
    let m_d = "" // variable donde se guarda las operaciones de multiplicar y dividir
    let operacion = ""
    let marcador = 0
    // para multiplicar y dividir
    m_d = operadoresabuscar("x", "/")
    if (m_d != "") {
        let operador1 = "", operador2 = ""
        for (let i = 0; i < m_d.length; i++) {
            if (m_d.charAt(i) != " " && m_d.charAt(i) != "x" && m_d.charAt(i) != "/") {
                operador1 += m_d.charAt(i)
            } else if (m_d.charAt(i) == "x" || m_d.charAt(i) == "/") {
                operacion = m_d.charAt(i)
                marcador = ++i
                break
            }
        }
        for (let i = marcador; i < m_d.length; i++) {
            if (m_d.charAt(i) != null && m_d.charAt(i) != " ") {
                operador2 += m_d.charAt(i)
            } else
                break
        }
        if (operacion == "x") {
            resultado = (parseFloat(operador1) * parseFloat(operador2))
        }else{
            resultado = (parseFloat(operador1) / parseFloat(operador2))
        }   
    }
    // PARA SUMAR Y RESTAR
    m_d = operadoresabuscar("+", "-")
    if (m_d != "") {
        let operador1 = "", operador2 = ""
        for (let i = 0; i < m_d.length; i++) {
            if (m_d.charAt(i) != " " && m_d.charAt(i) != "+" && m_d.charAt(i) != "-") {
                operador1 += m_d.charAt(i)
            } else if (m_d.charAt(i) == "+" || m_d.charAt(i) == "-") {
                operacion = m_d.charAt(i)
                marcador = ++i
                break
            }
        }
        for (let i = marcador; i < m_d.length; i++) {
            if (m_d.charAt(i) != null && m_d.charAt(i) != " ") {
                operador2 += m_d.charAt(i)
            } else
                break
        }
        if (operacion == "+") {
            resultado = (parseFloat(operador1) + parseFloat(operador2))
        }else{
            resultado = (parseFloat(operador1) - parseFloat(operador2))
        }   
    }
    borrar(reset)
    escribir(resultado.toString())
}