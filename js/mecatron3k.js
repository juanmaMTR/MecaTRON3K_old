/**
  @file Controlador principal del Juego MecaTRON-3000
  @author Juan Manuel Toscano Reyes <jtoscanoreyes.guadalupe@alumnado.fundacionloyola.net>
  @license GPL v3 2021
**/

'use strict'

/**
  Controlador principal del juego.
**/
class Juego{
  /**
    Constructor de la clase Juego
  **/
  constructor(){
    this.vista = new Vista()
    this.modelo = new Modelo()
    this.generadorPalabras = null
    this.animador = null
    this.divPrincipal = null
    this.contador=null
    window.onload = this.iniciar.bind(this)
  }
  /**
    Pone en marcha el juego.
  **/
  iniciar(){
    console.log('Iniciando...')
    this.divPrincipal = document.getElementById('divPrincipal')
    this.vista.div = this.divPrincipal
    this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this), 3000)
    this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista), 300)
    this.contador=0
    window.onkeypress = this.pulsar.bind(this)
  }

  generarPalabra(){
    let nuevaPalabra = this.modelo.crearPalabra()
    this.vista.dibujar(nuevaPalabra)
  }

  /**
    Evento de atención a la pulsación del teclado.

    Busca las palabras que tienen la letra pulsada y cambia su estado.
    Cambiando el estilo y moviendo las letras de un sitio a otro.
    @param {KeyboardEvent} evento Evento de pulsación del teclado.
  **/
  pulsar(evento){
    let letraPulsada = evento.key
    //Busco todas las palabras
    let palabras = this.divPrincipal.querySelectorAll('.palabra')
    for(let palabra of palabras){
      let span = palabra.children.item(0)
      let nodoTexto = palabra.childNodes[1]
      let textoRestante = nodoTexto.nodeValue
      let primeraLetraTextoRestante = textoRestante.charAt(0)
      if (letraPulsada == primeraLetraTextoRestante){
        span.textContent += letraPulsada
        nodoTexto.nodeValue = textoRestante.substring(1)

        //Si ha completado la palabra, la elimino y sumo puntos
        if (nodoTexto.nodeValue.length == 0){
          palabra.remove()
          this.contador=this.modelo.sumarPunto(this.contador)
          
        }
      }
      else{
        //Ha fallado, repongo el texto de la palabra
        nodoTexto.nodeValue = span.textContent + nodoTexto.nodeValue
        span.textContent = ''
      }
    }
  }
}

/**
  Clase Vista que muestra el juego.
**/
class Vista{
  constructor(){
    this.div = null   //Div donde se desarrolla el juego
    this.Puntuacion=new Puntuacion()
    this.puntuacion=this.Puntuacion.puntos  //Puntuacion para el juego
  }
  /**
    Dibuja el área de juego.
    @param palabra {String} La nueva palabra.
  */
  dibujar(palabra){
    // <div class=palabra>Meca</div>
    let div = document.createElement('div')
    this.div.appendChild(div)
    let span = document.createElement('span')
    div.appendChild(span)
    div.appendChild(document.createTextNode(palabra))
    div.classList.add('palabra')
    div.style.top = '0px'
    div.style.left = Math.floor(Math.random() * 85) + '%'
  }
  /**
    Mueve las palabras del Juego
  **/
  moverPalabras(){
    //Busco todas las palabras del div
    let palabras = this.div.querySelectorAll('.palabra')

    //Para cada palabra, aumento su atributo top.
    for(let palabra of palabras){
      let top = parseInt(palabra.style.top)
      top += 5
      palabra.style.top = `${top}px`
      //Si ha llegado al final
      if (top >= 760)
        palabra.remove()
    }
  }
}

/**
  Modelo de datos del juego.
**/
class Modelo{
  constructor(){
    this.palabras = [
      ['ju', 'fr', 'fv', 'jm', 'fu', 'jr', 'jv', 'fm'],
      ['fre', 'jui', 'fui', 'vie', 'mi', 'mery', 'huy'],
      ['juan', 'remo', 'foca', 'dedo', 'cate']
    ]
    this.nivel=0
  }
  /**
    Devuelve una nueva palabra.
    Devuelve aleatoriamente unn elemento del array de palabras.
    @return {String} Palabra generada
  **/
  crearPalabra(){
    return this.palabras[this.nivel][Math.floor(Math.random() * this.palabras.length)]
  }
  /**
   * Entro en sumarPuntos cada vez que completo una palabra
   */
  sumarPunto(contador){
    contador=contador++
    //console.log(contador);
    //document.getElementById('puntuacion').innerHTML=contador
    //return contador
  }
  /**
   * Incremento el nivel del juego
   */
  incrementarNivel(){

  }
  /**
   * Disminuyo el nivel del juego
   */
  disminuirNivel(){

  }
}
class Puntuacion{
  constructor(){
    this.puntos=0
  }
  mostrar(){
    document.getElementById('puntuacion').innerHTML=this.puntos
  }
}

var app = new Juego()
