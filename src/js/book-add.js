"use strict"

//Methode zum speichern des Buches

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

var isbnIsValid = require('is-isbn');

window.addEventListener("load",()=>{
    var bISBN = document.getElementById('bISBN');
    bISBN.addEventListener("input",onIsbnInput);
    let saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener("click", save);
    let bAuflage = document.getElementById('bAuflage');
    bAuflage.addEventListener("input", checkEdition);
});

//Methode die Gültigkeit der ISBN Checkt

let onIsbnInput =(event)=>{
    let value = event.srcElement.value;

    if(isbnIsValid.validate(value)){
        getBookDetails(value);
        event.srcElement.classList.remove("error");
    }
    else{
        event.srcElement.classList.add("error");
        onIsbnInput(value);
    }
}

let checkEdition = (event)=>{
    let aAuflage = event.srcElement.value;

    if(aAuflage == ""){
        event.srcElement.classList.remove("error");
    }
    else{
        event.srcElement.classList.add("error");
        checkEdition(aAuflage);
    }
}

//Funktion um die alle Felder nach Eingabe einer gütligen ISBN befüllt

let getBookDetails = (isbn) => {

  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;


  $.get(url, function(response){
      let data = response;


      if (data.totalItems>0) {
          document.getElementById('bTitel').value = data["items"][0].volumeInfo.title;

          let autor = "";
          let autors = data["items"][0].volumeInfo.authors;
          for(let i = 0; i < autors.length; i++){
              autor += autors[i] + ", ";
          }
          document.getElementById('bAutor').value = autor;
          document.getElementById('bJahr').value = data["items"][0].volumeInfo.publishedDate;
          document.getElementById('bVerlag').value = data["items"][0].volumeInfo.publisher;
          document.getElementById('bJahr').value = data["items"][0].volumeInfo.publishedDate;


      }
  });
}
