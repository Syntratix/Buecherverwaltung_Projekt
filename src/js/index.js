
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
    var firebaseRefChild = firebase.database().ref().child("buecher");

    firebaseRefChild.on("child_added", snapshot => {

      var titel = snapshot.child("titel").val();
      var autor = snapshot.child("autor").val();
      var jahr = snapshot.child("jahr").val();
      var isbn = snapshot.child("isbn").val();

      console.log(titel);
      var a = 2;
      console.log(a);

      $("#tablle_body").append(
        "<tr><td>" + titel +
        "</td><td>" + autor +
        "</td><td>" + jahr +
        "</td><td>" + isbn +
        "</td></tr>"
      );

    })



//Suchen
function suchen() {
    var firebaseRef = firebase.database().ref();
    var sucheingabe = document.getElementById('suchBar')
}
