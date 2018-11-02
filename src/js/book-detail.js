"use strict"

var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 6));
var firebaseRef = firebase.database().ref("buecher/");

document.getElementById("suchBar").addEventListener("keyup",function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submitButton").click();
    }
});

function start(){
  detailBuch();
}

function detailBuch() {
    firebase.database().ref("buecher/").once('value', function(snapshot){
        snapshot.forEach(function(book){
         if(book.val().isbn === search){
             document.getElementById('bTitel').value = book.val().titel;
             document.getElementById('bAutor').value = book.val().autor;
             document.getElementById('bVerlag').value = book.val().verlag;
             document.getElementById('bAuflage').value = book.val().auflage;
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
    var bText = document.getElementById("verfuegbarField").value;

    firebaseRef.child(search).update({
        verfuegbar: bText
    });
    alert("Verfügbar bei wurde gespeichert!");
}

function searchBooks(){
    var sucheingabe = document.getElementById('suchBar').value;
    var newURL = "../index.html?search="+ sucheingabe;
    document.location.href= newURL;
}
