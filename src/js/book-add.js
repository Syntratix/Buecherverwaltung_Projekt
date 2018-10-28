"use strict"

function save(){
    var bISBN = document.getElementById('bISBN').value;
    var saveBtn = document.getElementById("saveBtn");
    var bTitel = document.getElementById("bTitel").value;
    var bAutor = document.getElementById("bAutor").value;
    var bJahr = document.getElementById("bJahr").value;
    var bAuflage = document.getElementById("bAuflage").value;
    var bVerlag = document.getElementById("bVerlag").value;
    var bKat = document.getElementById("katWahl").value;
    var bText = document.getElementById("verfuegbarField").value;

    var firebaseRef = firebase.database().ref('buecher/');

    firebaseRef.child(bISBN).set({
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


var bISBN = document.getElementById('bISBN');


bISBN.onblur = function(){
    var isbnIsValid = require('isbn-validator');


    if(isbnIsValid(this.value)){
        this.classList.add("error");
    }
    else{
        this.classList.remove("error");
    }
}
