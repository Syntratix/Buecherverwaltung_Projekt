"use strict"

//Methode zum speichern des Buches

function save(){
    validateInputs();

    let getAllErrors = document.getElementsByClassName('error');
    if(getAllErrors.length < 1){

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

        let nsave = firebaseRef.child(bISBN).set({
            auflage: bAuflage,
            autor: bAutor,
            isbn: bISBN,
            jahr: bJahr,
            kategorie: bKat,
            titel: bTitel,
            verlag: bVerlag,
            verfuegbar: bText
        });

        nsave.then(() => {
          document.location.href="../index.html";
        });
        alert("Buch wurde gespeichert!");

    }
    else{
        alert("Buch wurde nicht gespeichert, Daten fehlen!");
    }

}

//Funktion die alle Input Felder die nicht ausgefüllt sind rot markiert

 let validateInputs = () => {
    let allInputs = document.querySelectorAll("input");
        for(let i = 0; i < allInputs.length; i++){
            if(allInputs[i].value == ""){
                allInputs[i].classList.add("error");
            }
            else{
                if(allInputs[i].id === "bISBN"){
                    if(isbnIsValid.validate(allInputs[i].value)){
                        allInputs[i].classList.remove("error");
                    }
                    else{
                        allInputs[i].classList.add("error");
                    }
                }
                else{
                    allInputs[i].classList.remove("error");
                }
            }
        }
};

var isbnIsValid = require('is-isbn');

window.addEventListener("load",()=>{
    var bISBN = document.getElementById('bISBN');
    bISBN.addEventListener("input", onIsbnInput);
    let saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener("click", save);
    let cAuflage = document.getElementById('bAuflage');
    cAuflage.addEventListener("input", checkEdition);
});

//Methode die Gültigkeit der ISBN Checkt

let onIsbnInput =(event)=>{
    let value = event.srcElement.value;

    if(isbnIsValid.validate(value)){
        event.srcElement.classList.remove("error");
        getBookDetails(value);
        readOnlyInput(true);
    }
    else{
        event.srcElement.classList.add("error");
        readOnlyInput(false);
        let allInputs = document.querySelectorAll("input");
            for(let i = 1; i < allInputs.length; i++){
                allInputs[i].value = "";
                allInputs[i].classList.remove("error");
        }
    }
}

let checkEdition = ()=>{
    let iAuflage =  document.getElementById('bAuflage');
    let aAuflage = iAuflage.value;

    if(aAuflage != ""){
        iAuflage.classList.remove("error");
    }
    else{
        iAuflage.classList.add("error");
    }
}
//Funktion die automatisch ausgefüllten Felder für den User sperrt

let readOnlyInput = (bDisable)=>{

    let aAutor = document.getElementById("bAutor");
    let aTitel = document.getElementById("bTitel");
    let aVerlag = document.getElementById("bVerlag");
    let aJahr = document.getElementById("bJahr");

        aAutor.disabled = bDisable;
        aTitel.disabled = bDisable;
        aVerlag.disabled = bDisable;
        aJahr.disabled = bDisable;

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


          let year = data["items"][0].volumeInfo.publishedDate;
          year = year.slice(0,4);
          document.getElementById('bJahr').value = year;
          document.getElementById('bVerlag').value = data["items"][0].volumeInfo.publisher;

          checkEdition();
      }
  });
}
