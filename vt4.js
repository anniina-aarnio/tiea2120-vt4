"use strict";
//@ts-check 

window.onload = function () {
    lisaaDefs(2);
    lisaaDefs(4);
    lisaaPalkkeja(10, 30);

    let pingviininappi = document.getElementById("pingviininappi");
    pingviininappi.addEventListener("click", lisaaPingviiniEvent);

    teePollo();
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
 * Luo palkkeja annetun luvun verran
 * @param {Number} lkm 
 * @param {Number} koko
 */
function lisaaPalkkeja(lkm, koko) {
    for (let i = 0; i < lkm; i++) {
        teePalkki(i, koko);
    }
}

/**
 * Nyt lisää suoraan bodyyn tämän, mutta:
 * Voisi tehdä niinkin että palauttaa svg:n,
 * joka lisättäisiin haluttuun kohtaan
 * @param {Number} delay 
 * @param {Number} koko
 */
function teePalkki(delay, koko) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "hbar");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "100vw");
    svg.setAttribute("height", String(koko));

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
 * Eventtifunktio, joka kutsuu lisääPingviini-funktiota.
 * @param {Event} e 
 */
function lisaaPingviiniEvent(e) {
    lisaaPingviini();
}

/**
 * Lisää pingviinin kulkemaan vasemmasta kulmasta
 * alavasempaan -> alaoikeaan -> yläoikeaan -> ylävasempaan
 * ja takaisin
 */
function lisaaPingviini() {

    let pingviini = new Image(150, 150);
    pingviini.src = "https://appro.mit.jyu.fi/tiea2120/vt/vt4/penguin.png";

    // lisätään animaatiota varten class
    pingviini.setAttribute("class", "pingviinikuva");
    document.body.appendChild(pingviini);
}

/**
 * Luodaan keskelle ruutua 16 vaakaosaan jaettu pöllö, josta
 * - parittomat osa liikkuu alkuun vasemmalle,
 * - parilliset liikkuu alkuun oikealle
 * Suunta vaihtuu kun pöllön ulommainen osa menee reunaan
 * Puolivälissä ruutua pöllöosat menevät toistensa lomitse
 * luoden hetkellisesti kokonaisen pöllön kuvan, kunnes
 * jatkavat matkaansa taas reunoille jne.
 */
function teePollo() {
    // luodaan kuva
    let pollo = new Image();
    pollo.src = "https://appro.mit.jyu.fi/tiea2120/vt/vt4/owl.png";

    pollo.addEventListener("load", function (e) {
        // luodaan 16 canvasta, joille jokaiselle tulee oma osa pöllöstä
        for (let i = 0; i < 16; i++) {
            // jokainen canvas on kokonaisen pöllön kokoinen
            let canvas = document.createElement("canvas");
            canvas.setAttribute("width", "564");
            canvas.setAttribute("height", "552");
            
            // lisätään kuva canvasiin
            let ctx = canvas.getContext('2d');

            let osanKorkeus = 552/16;
            // mistä kohtaa kuvaa 
            ctx.drawImage(pollo, 0, (i*osanKorkeus), 564, osanKorkeus, 0, (i*osanKorkeus), 564, osanKorkeus);
            ctx.save();

            // lisätään animaatiota varten class
            if (i % 2 == 0) {
                canvas.setAttribute("class", "parillinen-pollo");
            } else {
                canvas.setAttribute("class", "pariton-pollo");
            }
            document.body.appendChild(canvas);

        }
    });


}