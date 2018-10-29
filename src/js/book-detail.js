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
      let promise = firebase.database().ref("buecher/" + search).remove();
      promise.then(() => {
        document.location.href="../index.html";
      });
    }
}
function speichern(){
    var bISBN = document.getElementById('bISBN').value;
    var bTitel = document.getElementById("bTitel").value;
    var bAutor = document.getElementById("bAutor").value;
    var bJahr = document.getElementById("bJahr").value;
    var bAuflage = document.getElementById("bAuflage").value;
    var bVerlag = document.getElementById("bVerlag").value;
    var bKat = document.getElementById("katWahl").value;
    var bText = document.getElementById("verfuegbarField").value;

    firebaseRef.child(search).set({
        auflage: bAuflage,
        autor: bAutor,
        isbn: bISBN,
        jahr: bJahr,
        kategorie: bKat,
        titel: bTitel,
        verlag: bVerlag,
        verfuegbar: bText
    });
}
