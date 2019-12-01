pragma solidity >=0.4.0 <=0.6.0;

contract DateTime {
    function toTimestamp(uint16 year, uint8 month, uint8 day, uint8 hour) pure public returns (uint timestamp);
    
    function getYear(uint timestamp) pure public returns (uint16);
    function getMonth(uint timestamp) pure public returns (uint8);
    function getDay(uint timestamp) pure public returns (uint8);
    function getHour(uint timestamp) pure public returns (uint8);
    function getWeekday(uint timestamp) pure public returns (uint8);
}

contract DemocraticCalendar {
    
    address payable private owner = msg.sender;
    
    event NewAppointment(
        string _message,
        uint _timestamp
    );

    event Message(string _message);
    
    address private dateTimeAddr = 0x45354BC700dD0d7DD66b9b04547965113445D3D5;
    DateTime dateTime = DateTime(dateTimeAddr);
    
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(uint8 => address)))) walletCalendar;    // _timestamp to wallet
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(uint8 => address)))) hashCalendar;      // _timestamp to hash
    mapping(address => uint) appointmentsWallet;  // wallet to _timestamp
    mapping(address => uint) appointmentsHash;    // hash to _timestamp
    

    constructor() public {
        owner = msg.sender;
    }
    
    function makeAppointment(uint16 _year, uint8 _month, uint8 _day, uint8 _hour, address id) public returns (uint) {
        require(owner != msg.sender, "Owner cannot make appointments");
        uint _myTime;
        
        _myTime = dateTime.toTimestamp(_year, _month, _day, _hour);
        
        require(appointmentsWallet[msg.sender] == 0 && appointmentsHash[id] == 0, "Only one appointment!");
        require(isInputValid(_myTime, _year, _month, _day, _hour), "Input invalid");
        require(isTimeAvailable(_year, _month, _day, _hour), "Not available");
        require(isWorkday(_myTime), "Not workday");
        require(isWorkhour(_hour), "Incorrect time");
        
        walletCalendar[_year][_month][_day][_hour] = msg.sender;
        hashCalendar[_year][_month][_day][_hour] = id;
        appointmentsWallet[msg.sender] = _myTime;
        appointmentsHash[id] = _myTime;
        emit NewAppointment("New appointment created", _myTime);
        return _myTime;
    }
    
    function showAppointment(address id) public view returns (uint) {
        uint appointment = appointmentsHash[id];

        if (appointment == 0) {
            return 0;
        }
        if (appointment != appointmentsWallet[msg.sender]) {
            return 0;
        }   
        return appointment; //if 0 returned -> this person wallet combo has no date booked
    }
    
    function showFreeAppointments(uint16 _year, uint8 _month, uint8 _day) public view returns (bool[10] memory) {
        bool[10] memory freeHours;
        uint _theTime;
        _theTime = dateTime.toTimestamp(_year, _month, _day, uint8(0));
        if (isInputValid(_theTime, _year, _month, _day, uint8(0)) && isWorkday(_theTime)) {
            for (uint i = 0; i < 10; i++) {
                freeHours[i] = hashCalendar[_year][_month][_day][8 + uint8(i)] == address(0x0);
            }
        } else {
            for (uint i = 0; i < 10; i++) {
                freeHours[i] = false;
            }
        }
        
         
        return freeHours;
    }
    
    function showAppointments(uint16 _year, uint8 _month, uint8 _day) public view returns (address[10] memory) {
        require(owner == msg.sender);
        address[10] memory appointments;
        for(uint i = 0; i < 10; i++) {
            appointments[i] = hashCalendar[_year][_month][_day][8 + uint8(i)];
        }
         
        return appointments;
    }
    
    function deleteAppointments(uint16 _year, uint8 _month, uint8 _day, uint8 _hour) public {
        require(owner == msg.sender);

        uint _theTime;
        _theTime = dateTime.toTimestamp(_year, _month, _day, _hour);
        
        require(isInputValid(_theTime, _year, _month, _day, _hour), "Input invalid");
        require(isWorkday(_theTime), "Not workday");
        require(isWorkhour(_hour), "Incorrect time");
        
        address walletId = walletCalendar[_year][_month][_day][_hour];
        address hashId = hashCalendar[_year][_month][_day][_hour];
        
        walletCalendar[_year][_month][_day][_hour] = address(0x0);
        hashCalendar[_year][_month][_day][_hour] = address(0x0);
        appointmentsWallet[walletId] = 0;
        appointmentsHash[hashId] = 0;
        
        emit NewAppointment("Appointment deleted", _theTime);
        
    }
    
    function isOwner() public view returns (bool) {
        if(msg.sender == owner) {
            return true;
        } else {
            return false;
        }
    }

    function checkTimestamp(uint _timestamp) private view returns (uint16[4] memory){
        uint16 _year = dateTime.getYear(_timestamp);
        uint8 _month = dateTime.getMonth(_timestamp);
        uint8 _day = dateTime.getDay(_timestamp);
        uint8 _hour = dateTime.getHour(_timestamp);
        
        return [_year, _month, _day, _hour];
    }
    
    function isTimeAvailable(uint16 _year, uint8 _month, uint8 _day, uint8 _hour) private view returns (bool) {
        address addr = hashCalendar[_year][_month][_day][_hour];
        if(addr != address(0x0)) {
            return false;
        }
        return true;
    }
    
    function isInputValid(uint _timestamp, uint16 _year, uint8 _month, uint8 _day, uint8 _hour) private view returns (bool){
        uint16[4] memory _convertedTimestamp;
        _convertedTimestamp = checkTimestamp(_timestamp);
        
        if (_convertedTimestamp[0] == _year &&
            _convertedTimestamp[1] == _month &&
            _convertedTimestamp[2] == _day &&
            _convertedTimestamp[3] == _hour) {
                return true;
            }
        
        return false;
    }
    
    function isWorkday(uint _timestamp) private view returns (bool) {
        uint8 _weekday = dateTime.getWeekday(_timestamp);
        if (_weekday > 0 && _weekday < 6) {
            return true;
        }
        return false;
    }
    
    function isWorkhour(uint8 _hour) private pure returns (bool) {
        if (_hour > 7 && _hour < 18) {
            return true;
        }
        return false;
    }
    
    function destroyContract() public {
        require(owner == msg.sender);
        
        selfdestruct(owner);
    }

    function () payable external {
        revert();
    }
}
