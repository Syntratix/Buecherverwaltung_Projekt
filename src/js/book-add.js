"use strict"

//Methode zum speichern des Buches

function save(){

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

//  let validateInputs = () => {
//      let allInputs = document.querySelectorAll("input");
//
//     if(allInputs !== ""){
//          allInputs.classList.add("error");
//     }
// };

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

function delKatGen(){
    document.getElementById('mainKat').innerHTML = "";
}

function katGen(childKey, url, kategorie){
  $("#mainKat").append(
    "<ul id='"+ childKey +"'><li><a href= "+url+">" + kategorie +
    "</a></li></ul>"
  );
}

function loadKatGen(){
    delKatGen();
    firebaseRefChild.on("child_added", snapshot => {

      var childKey = snapshot.key;
      var kategorie = snapshot.child("kategorie").val();
      var url = 'html/book-detail.html?ISBN='+isbn;

      tabel(childKey, url, kategorie);
  });
}
