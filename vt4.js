"use strict";
//@ts-check 

window.onload = function () {
    lisaaDefs();
    teePalkki();
};

function lisaaDefs() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    let linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute("id","Gradient1");
    linearGradient.setAttribute("gradientTransform", "rotate(90)");
    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    let stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("class", "stop1");
    stop2.setAttribute("class", "stop2");
    stop3.setAttribute("class", "stop3");
    stop1.setAttribute("offset", "0%");
    stop2.setAttribute("offset", "50%");
    stop3.setAttribute("offset", "100%");
    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    linearGradient.appendChild(stop3);

    svg.appendChild(defs);
    defs.appendChild(linearGradient);
    document.body.appendChild(svg);
}

/**
 * Nyt lisää suoraan bodyyn tämän
 * Voisi tehdä niinkin että palauttaa svg:n, joka lisättäisiin haluttuun kohtaan
 */
function teePalkki() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "hbar");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "20");

    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "url(#Gradient1)");

    svg.appendChild(rect);
    document.body.appendChild(svg);

}
