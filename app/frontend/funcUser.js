var hashIdentifier;
// var calendar;

// Make a new Appointment

function showTimeslots() {
    if(document.getElementById("walletConnectedBadge").textContent == "Connected to Web3") {
        if(checkDateValidity(document.getElementById("dateYearField").value, 
        document.getElementById("dateMonthField").value,
        document.getElementById("dateDayField").value)) {
            if(createHashIdentifier() != null) {
                hashIdentifier = createHashIdentifier();

                document.getElementById("consoleText").innerHTML += "$ selected date is valid<br>";

                calendar.showFreeAppointments(
                    document.getElementById("dateYearField").value, 
                    document.getElementById("dateMonthField").value, 
                    document.getElementById("dateDayField").value, 
                    function(err, results) {
                        if (!err) {
                            var fillTimes = "";
                            var hour = 8;
                            var noOptions = true;
                            results.forEach(function (time) {
                                if (time == true) {
                                    fillTimes += "<option>" + hour + ":00" + "</option>";
                                    noOptions = false;
                                }
                                hour++;
                            });
                            if (noOptions == true) {
                                fillTimes += "<option>There are no time slots available on this date</option>";
                                document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
                            }
                            document.getElementById("makeAppointmentTimeFormControl").innerHTML = fillTimes;
                            document.getElementById("makeAppointmentTimeContainer").className = "container visible";
                            if (noOptions == false) {
                                document.getElementById("makeAppointmentContainer").className = "container text-center visible";
                                document.getElementById("makeAppointmentContainer").readOnly = true;
                            }
                            document.getElementById("showTimeslotsButton").value = "Change Selected Date";
                            document.getElementById("showTimeslotsButton").setAttribute('onclick','selectOtherDate()');
                            document.getElementById("dateYearField").readOnly = true;
                            document.getElementById("dateMonthField").readOnly = true;
                            document.getElementById("dateDayField").readOnly = true;
                        } else {
                            if (err['message'].includes("revert")) alert(err['message'].split("revert")[1]);
                            else alert(err['message']);
                        }
                    }
                );
            }
        } else {
            document.getElementById("makeAppointmentTimeContainer").className = "container invisible";
            document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
            alert("Check your selected date! Consider UNIX time restrictions.");
        }
    } else if(document.getElementById("walletConnectedBadge").textContent == "Disconnected from Web3") {
        alert("Please connect to Web3.");
    } else {
        alert("Other Web3 error.");
    }
}

function selectOtherDate() {
    document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
    document.getElementById("makeAppointmentTimeContainer").className = "container invisible";
    document.getElementById("showTimeslotsButton").value = "Show Timeslots";
    document.getElementById("showTimeslotsButton").setAttribute('onclick','showTimeslots()');
    document.getElementById("dateYearField").readOnly = false;
    document.getElementById("dateMonthField").readOnly = false;
    document.getElementById("dateDayField").readOnly = false;
}

function makeAppointment() {
    document.getElementById("consoleText").innerHTML += "$ transaction onto time slot initiated<br>";
    var chosenHour = parseInt(document.getElementById("makeAppointmentTimeFormControl").value.split(":")[0],10);
    calendar.makeAppointment(
        document.getElementById("dateYearField").value, 
        document.getElementById("dateMonthField").value, 
        document.getElementById("dateDayField").value, 
        chosenHour,
        hashIdentifier,
        function(err, results) {
            if (!err) {
                // document.getElementById("consoleText").innerHTML += "$ transaction successful<br>";
                document.getElementById("makeAppointmentTimeContainer").className = "container invisible";
                document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
                alert("Transaction submitted. Check MetaMask for confirmation.");
            } else {
                document.getElementById("consoleText").innerHTML += "$ transaction NOT successful - Error: " + err['message'].split("revert")[1] + "<br>";
                if (err['message'].includes("revert")) alert(err['message'].split("revert")[1]);
                else alert(err['message']);
            }
            // console.log(results);
            selectOtherDate();
            document.getElementById("consoleText").innerHTML += "$ appointment scheduling finished<br>" +
                                                                "$ check MetaMask for confirmation<br>";
        }
    );
}

// Query an Appointment

function queryAppointment() {
    if(document.getElementById("walletConnectedBadge").textContent == "Connected to Web3" && createHashIdentifier() != null) {
        hashIdentifier = createHashIdentifier();
        
        document.getElementById("walletIDQueryField").textContent = walletID;
        document.getElementById("queriedPerson").textContent = document.getElementById("firstNameField").value + " " + document.getElementById("lastNameField").value;;

        calendar.showAppointment(
            hashIdentifier,
            function(err, results) {
                if (!err) {
                    document.getElementById("consoleText").innerHTML += "$ query successful<br>";
                    if (results == 0) {
                        document.getElementById("nextAppointmentContainer").className = "container text-center invisible";
                        document.getElementById("consoleText").innerHTML += "$ no date booked for this combination of person and wallet<br>";
                        alert("There is no date booked for this combination of person and wallet.");
                    } else {
                        var date = new Date(results*1000);
                        document.getElementById("nextAppointmentField").textContent = date.toUTCString();
                        document.getElementById("nextAppointmentContainer").className = "container text-center visible";
                    }
                } else {
                    document.getElementById("nextAppointmentContainer").className = "container text-center invisible";
                    document.getElementById("consoleText").innerHTML += "$ query not successful - Error: " + err['message'] + "<br>";
                    alert(err['message']);
                }
                // console.log(results);
                document.getElementById("consoleText").innerHTML += "$ appointment query finished<br>";
            }
        );

    } else if(document.getElementById("walletConnectedBadge").textContent == "Disconnected from Web3") {
        alert("Please connect to Web3.");
    } else {
        alert("Other Web3 error.");
    }
}