
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
        )
    });
