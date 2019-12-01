// var calendar;

// TODO: Dummy Appointments (taken times -> hashing identifier) Array
var resultArray = [[false, "0"],  // 0800h
               [false, "0"],  // 0900h
               [false, "0"],  // 1000h
               [false, "0"],  // 1100h
               [false, "0"],  // 1200h
               [false, "0"],  // 1300h
               [false, "0"],  // 1400h
               [false, "0"],  // 1500h
               [false, "0"],  // 1600h
               [false, "0"]]; // 1700h

var lastQueriedDate = [0, 0, 0]; //year, month, day

function showAppointments() {
    console.log("Showing Appointments!");
    if(document.getElementById("walletConnectedBadge").textContent == "Connected to Web3") {
        if(checkDateValidity(document.getElementById("dateYearQueryField").value, 
            document.getElementById("dateMonthQueryField").value,
            document.getElementById("dateDayQueryField").value)) {

            document.getElementById("accordion").innerHTML = "";

            var timesArray = ["08:00", "09:00", "10:00", "11:00", "12:00",
                            "13:00", "14:00", "15:00", "16:00", "17:00"];
            
            var date = [document.getElementById("dateYearQueryField").value, 
                        document.getElementById("dateMonthQueryField").value, 
                        document.getElementById("dateDayQueryField").value];
            
            calendar.showAppointments(
                document.getElementById("dateYearQueryField").value, 
                document.getElementById("dateMonthQueryField").value, 
                document.getElementById("dateDayQueryField").value, 
                function(err, results) {
                    if (!err) {
                        var counter = 0;
                        results.forEach(function (personHashValue) {
                            if (personHashValue == 0) {
                                resultArray[counter][0] = false;
                                resultArray[counter][1] = "0";
                            } else {
                                resultArray[counter][0] = true;
                                resultArray[counter][1] = personHashValue;
                            }
                            counter++;
                        });
                        lastQueriedDate = date;
                        emptyList = true;
                        for(var i = 0 ; i < resultArray.length ; i++) {
                            if(resultArray[i][0]) {
                                emptyList = false;
                                var insert = 
                                    "<div class=\"card\">" + 
                                        "<div class=\"card-header text-center\">" + 
                                            "<h5 class=\"mb-0\">" + 
                                                "<button class=\"btn\" data-toggle=\"collapse\" data-target=\"\#form" + i + "\">" +
                                                    timesArray[i] +
                                                "</button>" + 
                                            "</h5>" + 
                                        "</div>" + 
                                    "</div>" + 
                                    "<div id=\"form" + i + "\" class=\"collapse\" data-parent=\"\#accordion\">" + 
                                        "<div class=\"card-body\">" +
                                            "<form>" + 
                                                "<div class=\"form-row\">" +
                                                    "<div class=\"form-group col-md-6\">" + 
                                                        "<label for=\"firstNameField\">First Name</label>" + 
                                                        "<input type=\"text\" class=\"form-control\" id=\"firstNameField" + i + "\">" + 
                                                    "</div>" +
                                                    "<div class=\"form-group col-md-6\">" +
                                                        "<label for=\"lastNameField\">Last Name</label>" +
                                                        "<input type\"text\" class=\"form-control\" id=\"lastNameField" + i + "\">" +
                                                    "</div>" +
                                                "</div>" +
                                                "<label>Date of Birth</label>" +
                                                "<div class=\"form-row\">" +
                                                    "<div class=\"form-group col-md-4\">" +
                                                        "<input type=\"text\" class=\"form-control\" id=\"yearOfBirthField" + i + "\">" +
                                                    "</div>" +
                                                    "<div class=\"form-group col-md-4\">" +
                                                        "<input type=\"text\" class=\"form-control\" id=\"monthOfBirthField" + i + "\">" +
                                                    "</div>" +
                                                    "<div class=\"form-group col-md-4\">" +
                                                        "<input type=\"text\" class=\"form-control\" id=\"dayOfBirthField" + i + "\">" +
                                                    "</div>" +
                                                "</div>" +
                                                "<div class=\"form-row\">" +
                                                    "<div class=\"form-group col-md-12\">" +
                                                        "<label for=\"placeOfBirthField\">Place of Birth</label>" +
                                                        "<input type=\"text\" class=\"form-control\" id=\"placeOfBirthField" + i + "\">" +
                                                    "</div>" +
                                                "</div>" +
                                            "</form>" +
                                            "<div class=\"form-row text-center\">" +
                                                "<div class=\"form-group col-md-6\">" +
                                                    "<input class=\"btn btn-primary\" id=\"verifyButton" + i + "\" type=\"button\" onclick=\"verifyAppointment(" + i + ")\" value=\"Verify User\">" +
                                                "</div>" +
                                                "<div class=\"form-group col-md-6\">" +
                                                    "<input class=\"btn btn-primary\" type=\"button\" onclick=\"deleteAppointment(" + i + ")\" value=\"Delete Appointment\">" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>" + 
                                    "</div>";
            
                                document.getElementById("accordion").innerHTML += insert;
                            }
                        }
                        if (emptyList) {
                            var insert = 
                                    "<div class=\"card\">" + 
                                        "<div class=\"card-header text-center\">" + 
                                            "<h5 class=\"mb-0\">There are no appointments on this date</h5>" + 
                                        "</div>" + 
                                    "</div>";
            
                                document.getElementById("accordion").innerHTML += insert;
                        }
                    } else {
                        // document.getElementById("consoleText").innerHTML += "$ query not successful - Error: " + err['message'].split("revert")[1] + "<br>";
                        if (err['message'].includes("revert")) alert(err['message'].split("revert")[1]);
                        else alert(err['message']);
                    }
                    
                }
            );
        } else {
            alert("Check your selected date.");
        }
    } else if(document.getElementById("walletConnectedBadge").textContent == "Disconnected from Web3") {
        alert("Please connect to Web3.");
    }
}

function verifyAppointment(arrayPosition) {
    var _firstName = document.getElementById("firstNameField" + arrayPosition).value;
    var _lastName = document.getElementById("lastNameField" + arrayPosition).value;
    var _yearOfBirth = document.getElementById("yearOfBirthField" + arrayPosition).value;
    var _monthOfBirth = document.getElementById("monthOfBirthField" + arrayPosition).value;
    var _dayOfBirth = document.getElementById("dayOfBirthField" + arrayPosition).value;
    var _placeOfBirth = document.getElementById("placeOfBirthField" + arrayPosition).value;

    var hash = createHashIdentifierAdmin(_firstName, _lastName, _yearOfBirth, _monthOfBirth, _dayOfBirth, _placeOfBirth);

    if (hash != null) {
        if(hash == resultArray[arrayPosition][1]) {
            document.getElementById("verifyButton" + arrayPosition).className = "btn btn-success";
            document.getElementById("verifyButton" + arrayPosition).value = "Verified";
        } else {
            document.getElementById("verifyButton" + arrayPosition).className = "btn btn-danger";
            document.getElementById("verifyButton" + arrayPosition).value = "Unverified";
        }
    }
}

const wait = time => new Promise((resolve) => setTimeout(resolve, time));

function deleteAppointment(arrayPosition) {
    chosenHour = 8 + arrayPosition;
    calendar.deleteAppointments(
        lastQueriedDate[0], 
        lastQueriedDate[1], 
        lastQueriedDate[2], 
        chosenHour,
        function(err, results) {
            if (!err) {
                console.log("No errors!");
                document.getElementById("accordion").innerHTML = "";
                // document.getElementById("dateYearQueryField").value = "";
                // document.getElementById("dateMonthQueryField").value = "";
                // document.getElementById("dateDayQueryField").value = "";
            } else {
                // document.getElementById("consoleText").innerHTML += "$ transaction not successful - Error: " + err['message'].split("revert")[1] + "<br>";
                if (err['message'].includes("revert")) alert(err['message'].split("revert")[1]);
                else alert(err['message']);
            }
            // console.log(results);
        }
    );
}