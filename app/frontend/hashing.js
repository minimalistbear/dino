var firstName, lastName, dateOfBirth, placeOfBirth;
var yearOfBirth, monthOfBirth, dayOfBirth;

function createHashIdentifier() {
    if(checkForm() == true) {
        firstName = document.getElementById("firstNameField").value;
        lastName = document.getElementById("lastNameField").value;
        dateOfBirth = yearOfBirth + monthOfBirth + dayOfBirth;
        placeOfBirth = document.getElementById("placeOfBirthField").value;

        var hashIdentifier;

        hashIdentifier = CryptoJS.SHA1(firstName + lastName + dateOfBirth + placeOfBirth).toString();
        hashIdentifier = "0x" + hashIdentifier;

        console.log(hashIdentifier);

        return hashIdentifier;
    }
}

/*
    paradigmatic hash identifier created with createWalletID(), i.e. SHA1 hashing function
        First Name:     Jean-Luc
        Last Name:      Picard
        Date of Birth:  2305 - 12 - 13
        Place of Birth: La Barre

        0xff13d9a082a0345e2a5c8cabd3cbbd011ab5a427
*/

function checkForm() {
    if(document.getElementById("firstNameField").value.length > 0 &&
        document.getElementById("lastNameField").value.length > 0 &&
        document.getElementById("placeOfBirthField").value.length > 0) {
        if (document.getElementById("yearOfBirthField").value.length == 4 && !isNaN(document.getElementById("yearOfBirthField").value)) {
            if (document.getElementById("monthOfBirthField").value.length == 2 && !isNaN(document.getElementById("monthOfBirthField").value)) {
                if (document.getElementById("dayOfBirthField").value.length == 2 && !isNaN(document.getElementById("dayOfBirthField").value
                    /* TODO : currently only check of digits (sanity check), no actual date check */)) {
                    yearOfBirth = document.getElementById("yearOfBirthField").value;
                    monthOfBirth = document.getElementById("monthOfBirthField").value;
                    dayOfBirth = document.getElementById("dayOfBirthField").value;
    
                    return true;
                } else {
                    alert("Check your form: two digit numerical for the day.");
                    return false;
                }
            } else {
                alert("Check your form: two digit numerical for the month.");
                return false;
            }
        } else {
            alert("Check your form: four digit numerical for the year.");
            return false;
        }
    } else {
        alert("Check your form.");
        return false;
    }
}

function checkFormAdmin(_firstName, _lastName, _yearOfBirth, _monthOfBirth, _dayOfBirth, _placeOfBirth) {
    if(_firstName.length > 0 &&
       _lastName.length > 0 &&
       _placeOfBirth.length > 0) {
        if (_yearOfBirth.length == 4 && !isNaN(_yearOfBirth)) {
            if (_monthOfBirth.length == 2 && !isNaN(_monthOfBirth)) {
                if (_dayOfBirth.length == 2 && !isNaN(_dayOfBirth))
                    /* TODO : currently only check of digits (sanity check), no actual date check */ {
                    return true;
                } else {
                    alert("Check your form: two digit numerical for the day.");
                    return false;
                }
            } else {
                alert("Check your form: two digit numerical for the month.");
                return false;
            }
        } else {
            alert("Check your form: four digit numerical for the year.");
            return false;
        }
    } else {
        alert("Check your form.");
        return false;
    }
}

function createHashIdentifierAdmin(_firstName, _lastName, _yearOfBirth, _monthOfBirth, _dayOfBirth, _placeOfBirth) {
    if(checkFormAdmin(_firstName, _lastName, _yearOfBirth, _monthOfBirth, _dayOfBirth, _placeOfBirth) == true) {
        var hashIdentifier;

        var _dateOfBirth = _yearOfBirth + _monthOfBirth + _dayOfBirth;

        hashIdentifier = CryptoJS.SHA1(_firstName + _lastName + _dateOfBirth + _placeOfBirth).toString();
        hashIdentifier = "0x" + hashIdentifier;

        console.log(hashIdentifier);

        return hashIdentifier;
    }
}