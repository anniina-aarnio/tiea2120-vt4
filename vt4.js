"use strict";
//@ts-check 

window.onload = function () {
    lisaaDefs(2);
    lisaaDefs(4);
    for (let i = 0; i < 10; i++) {
        teePalkki(i);
    }

    let pingviininappi = document.getElementById("pingviininappi");
    pingviininappi.addEventListener("click", lisaaPingviiniEvent);

};
/**
 * Lisää html-pohjaan svg:n, jossa gradient id-versionimellä varustettuna
 * jotta siihen voi viitata fill:llä muissa svg:issä
 * Toistaiseksi sitä kutsutaan 2 ja 4, jotta saa stop2 ja stop4-versiot
 * joita hyödynnetään palkkien ylä- ja alasuunnissa
 * @param {Number} versio 
 */
function lisaaDefs(versio) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    let linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute("id","Gradient" + versio);
    linearGradient.setAttribute("gradientTransform", "rotate(90)");
    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    let stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("class", "stop1");
    stop2.setAttribute("class", "stop" + versio);
    stop3.setAttribute("class", "stop3");
    stop1.setAttribute("offset", "0%");
    stop2.setAttribute("offset", "50%");
    stop3.setAttribute("offset", "100%");
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    linearGradient.appendChild(stop3);

    svg.appendChild(defs);
    defs.appendChild(linearGradient);
    document.body.insertBefore(svg,document.getElementById("pingviininappi"));
}

/**
 * Nyt lisää suoraan bodyyn tämän, mutta:
 * Voisi tehdä niinkin että palauttaa svg:n,
 * joka lisättäisiin haluttuun kohtaan
 * @param {Number} delay 
 */
function teePalkki(delay) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "hbar");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "100vw");
    svg.setAttribute("height", "30");

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");


    svg.appendChild(rect);
    svg.style.animationDelay = String(delay * 100) + "ms";
    document.body.appendChild(svg);

}

/**
 * 
 * @param {Event} e 
 */
function lisaaPingviiniEvent(e) {
    lisaaPingviini2();
}

function lisaaPingviini() {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", "150px");
    canvas.setAttribute("height", "150px");

    let pingviini = new Image(150, 150);
    pingviini.src = "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png";

    // lisätään kuva canvasiin
    let ctx = canvas.getContext('2d');
    ctx.drawImage(pingviini, 150, 150);
    ctx.font = '30px serif';
    ctx.fillText("moi", 100, 100);

    // lisätään animaatiota varten class
    canvas.setAttribute("class", "pingviinikuva");
    document.body.appendChild(canvas);
}

/**
 * Lisää pingviinin kulkemaan vasemmasta kulmasta
 * alavasempaan -> alaoikeaan -> yläoikeaan -> ylävasempaan
 * ja takaisin
 */
function lisaaPingviini2() {
    // luodaan uusi canvas
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", "150px");
    canvas.setAttribute("height", "150px");

    // luodaan uusi kuva
    let pingviini = document.createElement("img");
    pingviini.setAttribute("src", "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png");

    // lisätään kuva canvasiin
    let ctx = canvas.getContext('2d');
    ctx.drawImage(pingviini, 0, 0, 150, 150, 0, 0, 150, 150);

    // lisätään animaatiota varten class
    canvas.setAttribute("class", "pingviinikuva");
    document.body.appendChild(canvas);

}