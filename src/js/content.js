"use strict"


var firebaseRefChild = firebase.database().ref().child("buecher");

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
  let cat = event.srcElement.innerHTML;
  reLoadTabel(3,cat);
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

//module.export = { saveVar };
