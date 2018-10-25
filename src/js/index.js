
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

      var childKey = snapshot.key;
      var titel = snapshot.child("titel").val();
      var titelKey = snapshot.child("titel").key;
      var autor = snapshot.child("autor").val();
      var autorKey = snapshot.child("autor").key;
      var jahr = snapshot.child("jahr").val();
      var jahrKey = snapshot.child("jahr").key;
      var isbn = snapshot.child("isbn").val();
      var isbnKey = snapshot.child("isbn").key;

      $("#tablle_body").append(
        "<tr id='"+ childKey +"'><td id='"+ titelKey + childKey +"'>" + titel +
        "</td><td id='"+ autorKey + childKey +"'>" + autor +
        "</td><td id='"+ jahrKey + childKey +"'>" + jahr +
        "</td><td id='"+ isbnKey + childKey +"'>" + isbn +
        "</td></tr>"
      );




      firebaseRefChild.on("child_changed", snapshot => {
          var tdChanged = document.getElementById(snapshot.key);
          location.reload(true);
      })




      firebaseRefChild.on("child_removed", snapshot => {
        var tdToRemove = document.getElementById(snapshot.key);
        tdToRemove.remove();
      })

    })



//Suchen
function suchen() {
    var firebaseRef = firebase.database().ref();
    var sucheingabe = document.getElementById('suchBar')
}
