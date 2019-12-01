var calendar;
var walletID;

var calendarAddress = "0xa580e0E35e25cA12dc6316F431b926b6E98EcA17"

var calendarABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_year",
				"type": "uint16"
			},
			{
				"name": "_month",
				"type": "uint8"
			},
			{
				"name": "_day",
				"type": "uint8"
			},
			{
				"name": "_hour",
				"type": "uint8"
			}
		],
		"name": "deleteAppointments",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroyContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_year",
				"type": "uint16"
			},
			{
				"name": "_month",
				"type": "uint8"
			},
			{
				"name": "_day",
				"type": "uint8"
			},
			{
				"name": "_hour",
				"type": "uint8"
			},
			{
				"name": "id",
				"type": "address"
			}
		],
		"name": "makeAppointment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "NewAppointment",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_message",
				"type": "string"
			}
		],
		"name": "Message",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "address"
			}
		],
		"name": "showAppointment",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_year",
				"type": "uint16"
			},
			{
				"name": "_month",
				"type": "uint8"
			},
			{
				"name": "_day",
				"type": "uint8"
			}
		],
		"name": "showAppointments",
		"outputs": [
			{
				"name": "",
				"type": "address[10]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_year",
				"type": "uint16"
			},
			{
				"name": "_month",
				"type": "uint8"
			},
			{
				"name": "_day",
				"type": "uint8"
			}
		],
		"name": "showFreeAppointments",
		"outputs": [
			{
				"name": "",
				"type": "bool[10]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

function connectWeb3() {
    if (typeof web3 !== 'undefined') {
        const web3 = new Web3(window.web3.currentProvider);
        // console.log(web3.eth.accounts);

        if (web3.eth.accounts[0] !== undefined) {
            walletID = web3.eth.accounts[0];
			web3.eth.defaultAccount = web3.eth.accounts[0];

            if (document.getElementById("walletConnectedBadge")) document.getElementById("walletConnectedBadge").className = "badge badge-pill badge-success";
            if (document.getElementById("walletIDField")) document.getElementById("walletIDField").textContent = walletID;
            if (document.getElementById("walletConnectedBadge")) document.getElementById("walletConnectedBadge").textContent = "Connected to Web3";
			if (document.getElementById("consoleText")) document.getElementById("consoleText").innerHTML += "$ connected to MetaMask<br>";
			if (document.getElementById("consoleText")) document.getElementById("consoleText").innerHTML += "$ account address: " + walletID + "<br>";

			if (document.getElementById("consoleText")) web3.eth.getBalance(walletID, function(err, balance) {
				document.getElementById("consoleText").innerHTML += ("$ account balance: " + web3.fromWei(balance, 'ether') + " ETH <br>");
				return;
			});
			
			// Set up interaction with the contract
			var calendarContract = web3.eth.contract(calendarABI);
			calendar = calendarContract.at(calendarAddress);

			calendar.isOwner(function(err, results) {
				if (document.getElementById("showAdminAppointments")) {
					if (results == false) {
						document.getElementById("showAdminAppointments").className = "btn btn-danger";
						document.getElementById("showAdminAppointments").value = "Please use owner's account!";
						document.getElementById("selectDateLabel").style.visibility = "hidden";
						document.getElementById("dateYearQueryField").style.visibility = "hidden";
						document.getElementById("dateMonthQueryField").style.visibility = "hidden";
						document.getElementById("dateDayQueryField").style.visibility = "hidden";
						document.getElementById("showAdminAppointments").setAttribute('onclick','');
						document.getElementById("accordion").innerHTML = "";
					} else {
						document.getElementById("showAdminAppointments").className = "btn btn-primary";
						document.getElementById("showAdminAppointments").value = "Show Appointments";
						document.getElementById("selectDateLabel").style.visibility = "visible";
						document.getElementById("dateYearQueryField").style.visibility = "visible";
						document.getElementById("dateMonthQueryField").style.visibility = "visible";
						document.getElementById("dateDayQueryField").style.visibility = "visible";
						document.getElementById("showAdminAppointments").setAttribute('onclick','showAppointments()');
					}
				} else if (document.getElementById("showTimeslotsButton")) {
					if (results == true) {
						document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
						document.getElementById("makeAppointmentTimeContainer").className = "container invisible";
						document.getElementById("showTimeslotsButton").className = "btn btn-danger";
						document.getElementById("showTimeslotsButton").value = "You can't make appointments as owner";
						document.getElementById("showTimeslotsButton").setAttribute('onclick','');
						document.getElementById("dateYearField").readOnly = true;
						document.getElementById("dateMonthField").readOnly = true;
						document.getElementById("dateDayField").readOnly = true;
					} else {
						document.getElementById("makeAppointmentContainer").className = "container text-center invisible";
						document.getElementById("makeAppointmentTimeContainer").className = "container invisible";
						document.getElementById("showTimeslotsButton").className = "btn btn-primary";
						document.getElementById("showTimeslotsButton").value = "Show Timeslots";
						document.getElementById("showTimeslotsButton").setAttribute('onclick','showTimeslots()');
						document.getElementById("dateYearField").readOnly = false;
						document.getElementById("dateMonthField").readOnly = false;
						document.getElementById("dateDayField").readOnly = false;
					}
				}
			});

        } else {
            alert("MetaMask is locked. Please turn off Privacy Mode.");
        }
    } else {
        alert("Please install MetaMask.");
    }
}

web3.currentProvider.publicConfigStore.on('update', callbackChanged);

function callbackChanged (data) {
	// console.log(data);
	if (data.selectedAddress != walletID) {
		connectWeb3();
		// console.log("Connect again...");
	}
}

function checkDateValidity(year, month, day) {
	if (year >= 1970 && !isNaN(year) && 
	!isNaN(month) && month > 0 && month < 13 &&
	!isNaN(day) && day > 0 && day < 32) {
		if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
			return false;
		} else if (((year % 4 == 0 && year % 100 !== 0) || (year % 400 == 0)) && month == 2 && day > 29) {
			return false;
		} else if (month == 2 && day > 28) {
			return false;
		} else if (year >= 2037 && month >= 1 && day >= 19) {
			return false;
		}
		// console.log("Date valid");
		return true;
	}
	return false;
}