
"use strict"

var firebaseRefChild = firebase.database().ref().child("buecher");

function searchBooks() {
    var sucheingabe = document.getElementById('suchBar').value;
    reLoadTabel(2, sucheingabe);
}

function delTabel(){
    document.getElementById('tablle_body').innerHTML = "";
}

//function getBooksByTitle(titel){
//    firebase.database().ref("buecher/").once('value', function(snapshot){  /*Tabelle buecher aus Datenbank auslesen*/
//        delTabel(); /*Inhalte der Tabelle leeren*/
//        snapshot.forEach(function(book){ /*folgenden code für alle Elemente der Tabelle ausführen*/
//            if (book.val().titel.toLowerCase().includes(titel.toLowerCase())) { /*bücher welche die sucheingabe enthalten anzeigen*/
//                $("#tablle_body").append(
//                  "<tr><td><a href='html/book-detail.html'>" + book.val().titel + /*ab hier Angezeigte Tabelle mit werten beladen*/
//                  "</td><td>" + book.val().autor +
//                  "</td><td>" + book.val().jahr +
//                  "</td><td>" + book.val().isbn +
//                  "</td></tr>"
//                );
//            }
//        })
//    });
//}

//function getBooksByVerfügbar(){
//    firebase.database().ref("buecher/").once('value', function(snapshot){  /*Tabelle buecher aus Datenbank auslesen*/
//        document.getElementById('tablle_body').innerHTML = ""; /*Inhalte der Tabelle leeren*/
//        snapshot.forEach(function(book){ /*folgenden code für alle Elemente der Tabelle ausführen*/
//            if (book.val().verfuegbar !== "") { /*bücher welche die sucheingabe enthalten anzeigen*/
//                $("#tablle_body").append(
//                  "<tr><td><a href='html/book-detail.html'>" + book.val().titel + /*ab hier Angezeigte Tabelle mit werten beladen*/
//                  "</td><td>" + book.val().autor +
//                  "</td><td>" + book.val().jahr +
//                  "</td><td>" + book.val().isbn +
//                  "</td></tr>"
//                );
//            }
//        })
//    });
//}

//tabelle

function tabel(childKey, titel, autor, jahr, isbn, url){
  $("#tablle_body").append(
    "<tr id='"+ childKey +"'><td ><a href= "+url+">" + titel +
    "</a></td><td>" + autor +
    "</td><td>" + jahr +
    "</td><td>" + isbn +
    "</td></tr>"
  );
}

function loadTabel(){
    delTabel();
    firebaseRefChild.on("child_added", snapshot => {

      var childKey = snapshot.key;
      var titel = snapshot.child("titel").val();
      var autor = snapshot.child("autor").val();
      var jahr = snapshot.child("jahr").val();
      var isbn = snapshot.child("isbn").val();
      var url = 'html/book-detail.html?ISBN='+isbn;

      tabel(childKey, titel, autor, jahr, isbn, url);
  });
}

function reLoadTabel(wert, variable){

  firebaseRefChild.on("value", snapshot => {
    delTabel();
    var data = snapshot.val();
    var key;

    for(key in data){
      var childKey = data[key].isbn;
      var verf = data[key].verfuegbar;
      var titel = data[key].titel;
      var autor = data[key].autor;
      var jahr = data[key].jahr;
      var isbn = data[key].isbn;
      var kategorie = data[key].kategorie;
      var url = 'html/book-detail.html?ISBN='+isbn;

      switch(wert){
        case 1:
        if (verf !== "") {
          tabel(childKey, titel, autor, jahr, isbn, url);
        }break;
        case 2:
          if (titel.toLowerCase().includes(variable.toLowerCase())) {
            if(variable !== ""){
              tabel(childKey, titel, autor, jahr, isbn, url);
            }else{
              loadTabel();
            }
          }break;
          case 3:
          if (kategorie == variable) {
            tabel(childKey, titel, autor, jahr, isbn, url);
          }break;
       }
    }
  });
}

firebaseRefChild.on("child_removed", snapshot => {
  var tdToRemove = document.getElementById(snapshot.key);
  tdToRemove.remove();
})
