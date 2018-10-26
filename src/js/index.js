
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

function searchBooks() {
    var sucheingabe = document.getElementById('suchBar').value;
    getBooksByTitle(sucheingabe);
}

function getBooksByTitle(titel){
    firebase.database().ref("buecher/").once('value', function(snapshot){  /*Tabelle buecher aus Datenbank auslesen*/
        document.getElementById('tablle_body').innerHTML = ""; /*Inhalte der Tabelle leeren*/
        snapshot.forEach(function(book){ /*folgenden code für alle Elemente der Tabelle ausführen*/
            if (book.val().titel.toLowerCase().includes(titel.toLowerCase())) { /*bücher welche die sucheingabe enthalten anzeigen*/
                $("#tablle_body").append(
                  "<tr><td>" + book.val().titel + /*ab hier Angezeigte Tabelle mit werten beladen*/
                  "</td><td>" + book.val().autor +
                  "</td><td>" + book.val().jahr +
                  "</td><td>" + book.val().isbn +
                  "</td></tr>"
                );
            }
        })
    });
}

function getBooksByVerfügbar(){
    firebase.database().ref("buecher/").once('value', function(snapshot){  /*Tabelle buecher aus Datenbank auslesen*/
        document.getElementById('tablle_body').innerHTML = ""; /*Inhalte der Tabelle leeren*/
        snapshot.forEach(function(book){ /*folgenden code für alle Elemente der Tabelle ausführen*/
            if (book.val().verfuegbar !== "") { /*bücher welche die sucheingabe enthalten anzeigen*/
                $("#tablle_body").append(
                  "<tr><td>" + book.val().titel + /*ab hier Angezeigte Tabelle mit werten beladen*/
                  "</td><td>" + book.val().autor +
                  "</td><td>" + book.val().jahr +
                  "</td><td>" + book.val().isbn +
                  "</td></tr>"
                );
            }
        })
    });
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
