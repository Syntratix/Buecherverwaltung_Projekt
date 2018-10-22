"use strict"

var hinzuBtn = document.getElementById("hinzuBtn");

function hinzufuegen() {
    var firebaseRef = firebase.database().ref();

    firebaseRef.child("IT For DUMMYS").set("123456789");
}
