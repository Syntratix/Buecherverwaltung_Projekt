"use strict"

    import stylesheet from "./index.css";

    var database = firebase.database().ref().child("buecher");

    rootRef.on("child_added", snap => {
        alert(snap.val());
    });
