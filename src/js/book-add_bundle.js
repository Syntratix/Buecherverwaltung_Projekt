(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        for(let i = 1; i < allInputs.length; i++){
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
    // let suchBar = document.getElementById('suchBar');
    // suchBar.addEventListener("keyup", searchBooks);
    let suchKnopf = document.getElementById('submitButton');
    suchKnopf.addEventListener("click", searchBooks);
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
            for(let i = 2; i < allInputs.length; i++){
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

document.getElementById("suchBar").addEventListener("keyup",function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submitButton").click();
    }
});

function searchBooks(){
    var sucheingabe = document.getElementById('suchBar').value;
    var newURL = "../index.html?search="+ sucheingabe;
    document.location.href= newURL;
}

},{"is-isbn":2}],2:[function(require,module,exports){
function isIsbn(){}

isIsbn.prototype.validate = isbn => {
	isbn = String(isbn)
	isbn = isbn.split('')
	if(isbn[9] === "X"){isbn[9] = "10"}
	if(isbn.length === 10){
		let validateSum = isbn => {
			let sum = 0
			isbn.forEach((digit, index) => {
				digit = parseInt(digit)
				sum += digit * (index+1)
			})
			return (sum % 11 === 0)
		}
		let checkSum = isbn => {
			let check = parseInt(isbn.pop()), sum = 0
			isbn = isbn.reverse()
			isbn.forEach((digit, index) => {
				sum += parseInt(digit) * (index+2)
			})
			sum = (11 - (sum % 11)) % 11
			return sum === check
		}
		return validateSum(isbn) && validateSum(isbn.reverse()) && checkSum(isbn)
	} else if (isbn.length === 13){
		let checkSum = isbn => {
			let check = parseInt(isbn.pop()), sum = 0
			isbn.forEach((digit, index) => {
				index++
				if(index%2 === 0){
					sum += parseInt(digit)*3
				} else {
					sum += parseInt(digit)
				}
			})
			return (sum % 10) === check || (10-(sum % 10)) === check
		}
		return checkSum(isbn)
	} else {
		return false
	}
}

module.exports = new isIsbn()
/*
let a = new isIsbn()
let codes = ["030788743X","9780307887436","0670020559","9780670020553","0060523794","9780060523794"]
codes.forEach(v=>{
	console.log(v, a.validate(v))
})
*/
},{}]},{},[1]);
