var firstName, lastName, dateOfBirth, placeOfBirth;
var yearOfBirth, monthOfBirth, dayOfBirth;

var walletID;

function downloadWalletID() {
    var data = new Blob([walletID], {type: 'text/plain'});
    var url = window.URL.createObjectURL(data);

    document.getElementById("createWalletButton").disabled = false;

    document.getElementById("downloadWalletIDButton").disabled = false;
    document.getElementById("downloadWalletIDLink").download = "walletID.txt";
    document.getElementById("downloadWalletIDLink").href = url;
}

/*
    paradigmatic wallet ID from Ganache
        0x5cdb10b64ca62a867b8da16f060e92176128440f
*/

function createWalletID() {
    firstName = document.getElementById("firstNameField").value;
    lastName = document.getElementById("lastNameField").value;
    dateOfBirth = yearOfBirth + monthOfBirth + dayOfBirth; // concatenation, not addition
    placeOfBirth = document.getElementById("placeOfBirthField").value;

    walletID = CryptoJS.SHA1(firstName + lastName + dateOfBirth + placeOfBirth).toString();
    walletID = "0x" + walletID;

    document.getElementById("walletIDField").innerText = walletID;

    downloadWalletID();
}

/*
    paradigmatic wallet ID created with createWalletID(), i.e. SHA1 hashing function
        First Name:     Jean-Luc
        Last Name:      Picard
        Date of Birth:  2305 - 07 - 13
        Place of Birth: La Barre

        0x3a3dda3bc0a81319e28c67d249302390e07657b9
*/

function checkForm() {
    if(document.getElementById("firstNameField").value.length > 0 &&
        document.getElementById("lastNameField").value.length > 0 &&
        document.getElementById("placeOfBirthField").value.length > 0) {

        if (document.getElementById("yearOfBirthField").value.length == 4 && !isNaN(document.getElementById("yearOfBirthField").value)) {
            if (document.getElementById("monthOfBirthField").value.length == 2 && !isNaN(document.getElementById("monthOfBirthField").value)) {
                if (document.getElementById("dayOfBirthField").value.length == 2 && !isNaN(document.getElementById("dayOfBirthField").value)) {
                    yearOfBirth = document.getElementById("yearOfBirthField").value;
                    monthOfBirth = document.getElementById("monthOfBirthField").value;
                    dayOfBirth = document.getElementById("dayOfBirthField").value;
    
                    createWalletID();
                } else {
                    alert("Check your form: two digit numerical for the day.");
                }
            } else {
                alert("Check your form: two digit numerical for the month.");
            }
        } else {
            alert("Check your form: four digit numerical for the year.");
        }

    } else {
        alert("Check your form.");
    }
}

/*
    forum entry on how to create new ethereum account (i.e. wallet) with created wallet ID:
    https://ethereum.stackexchange.com/questions/1413/how-can-i-make-new-account-by-json-rpc
*/

function createWallet() {
    alert("This functionality has not been implemented yet. Please check back later.");
}