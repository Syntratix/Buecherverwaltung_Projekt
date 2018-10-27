"use strict"

var aktHTMLSeite = 0;

function getChildKey(key){
    aktuelleHTMLSeite=key;

}


    console.log(aktHTMLSeite);

function detailBuch() {
    firebase.database().ref("buecher/").once('value', function(snapshot){  /*Tabelle buecher aus Datenbank auslesen*/
                $("#tbody_bauch").append(
                  "bTitel" + book.val().titel + /*ab hier Angezeigte Tabelle mit werten beladen*/
                  "bAutor" + book.val().autor +
                  "bVerlag" + book.val().verlag +
                  "bAuflage" + book.val().auflage +
                  "bJahr" + book.val().jahr +
                  "bISBN" + book.val().isbn +
                  "bKategorie" + book.val().kategorie
                );
                $("#verfuegbarFeld").append(
                    "verfuegbarField" + book.val().verfuegbar
                );
    });
}

function loeschen(){

}
