"use strict"

var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 6));
var firebaseRef = firebase.database().ref("buecher/");
var firebaseRefChild = firebase.database().ref().child("buecher");

document.getElementById("suchBar").addEventListener("keyup",function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submitButton").click();
    }
});

function start(){
  detailBuch();
  saveVar();
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
    var newURL = "../index.html?search=" + sucheingabe;
    document.location.href= newURL;
}

function li(cat){
    let liPara = "list-group-item";
    let categorie = Array.from(cat);
    for(let u = 0; u < categorie.length; u++){
        $("#secCat").append(
            "<li class='"+liPara+"' onclick='clickOnLi(event)'>" + categorie[u] +"</li>"
        );
    }
}

function clickOnLi(event){
  var cat = event.srcElement.innerHTML;
  var newURL = "../index.html#hash=" + cat;
  document.location.href= newURL;
}


  function saveVar(){

    var value = new Array();
    let pet = new Set();

    firebaseRefChild.on("value", snapshot =>{
        var data = snapshot.val();
        var key;
        //var i = 0;
        //p = 0;


        for(key in data){
            pet.add(data[key].kategorie);
            // value[i] = data[key].kategorie;
            // i++;
        }

        // var cat = new Array();
        // cat[0] = "test";
        //
        // for(var k = 0; k < value.length; k++){
        // var bril = false;
        //     for(var j = 0; j <= cat.length-1; j++){
        //         if(value[k] == cat[j]){
        //             bril = true;
        //         }
        //         else{
        //             if(bril == true){
        //                 continue;
        //             }
        //             else{
        //                 bril = false;
        //             }
        //         }
        //     }
        //     if(bril == false){
        //         cat[p] = value[k];
        //         p++;
        //     }
        // }
        li(pet);
    })
}
