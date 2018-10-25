
"use strict"

//ButtonEvent
var hinzuBtn = document.getElementById("hinzuBtn");

function open(){

}

var anzeigBtn= document.getElementById("anzeigBtn");

function hinzufuegen() {
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("IT For DUMMYS").set("123456789");
}


//tabelle
  function tabelle(){
    var firebaseRefChild = firebase.database().ref().child();

    firebaseRefChild.on("child_added", snap => {



    })


  }


//Suchen
function suchen() {
    var firebaseRef = firebase.database().ref();
    var sucheingabe = document.getElementById('suchBar')
}
