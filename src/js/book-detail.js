"use strict"

var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 6));
var firebaseRef = firebase.database().ref("buecher/");

function detailBuch() {
    firebase.database().ref("buecher/").once('value', function(snapshot){
        snapshot.forEach(function(book){
         if(book.val().isbn === search){
             document.getElementById('bTitel').value = book.val().titel;
             document.getElementById('bAutor').value = book.val().autor;
             document.getElementById('bVerlag').value = book.val().verlag;
             document.getElementById('bAuflage').value = book.val().isbn;
             document.getElementById('bJahr').value = book.val().jahr;
             document.getElementById('bISBN').value = book.val().isbn;
             document.getElementById('bKategorie').value = book.val().kategorie;
             document.getElementById('verfuegbarField').value = book.val().verfuegbar;
         }
     })
    });
}

function loeschen(){
    if(confirm("Möchten Sie das Buch wirklich löschen?") == true){
      var boook = document.getElementById(search);
      boook.ref.remove();
      document.location.href="../index.html";
    }
}
