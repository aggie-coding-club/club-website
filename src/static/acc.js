function handleFormerOfficers() {
    console.log("here!!")
    var formerOfficers = document.getElementById("former-officers");

    if(formerOfficers.style.display === "none") {
        formerOfficers.style.display = "inline";
    } else {
        formerOfficers.style.display = "none";
    }
}