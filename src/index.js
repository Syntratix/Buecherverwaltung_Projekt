
"use strict"


var hinzuBtn = document.getElementById("hinzuBtn");

function open(){

}

var anzeigBtn= document.getElementById("anzeigBtn");

function hinzufuegen() {
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("IT For DUMMYS").set("123456789");
}
function anzeigen() {

//    var preObject = document.getElementById('object');
    var ulList = document.getElementById('list');

    var dbRefObject = firebase.database().ref().child('buecher');
    var dbRefList = dbRefObject.child('3258976523448');

/*    dbRefObject.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });
*/
    dbRefList.on('child_added',  snap => {

      const li = document.creatElement('li');
      li.innerText = snap.val();
      ulList.appendChild(li);
    });
}
function suchen() {
    var firebaseRef = firebase.database().ref();
    var sucheingabe = document.getElementById('searchBar');
}
function speichern(){
/*Fallunterscheidung zwischen Buch anlegen und neue Daten speichern und bestehende Bücher updaten
*/
    var firebaseRef = firebase.database().ref();
    
}
