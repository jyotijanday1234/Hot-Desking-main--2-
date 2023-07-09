function filterByDate(dates) {
    //from date
    console.log(dates[0].format("DD-MM-YYYY"));
    setCheckInDate(dates[0].format("DD-MM-YYYY"));
    //to date
    console.log(dates[1].format("DD-MM-YYYY"));
    setCheckOutDate(dates[1].format("DD-MM-YYYY"));
  
    //tempRooms
    var tempRooms = [];
  
    for (const room of duplicateRooms) {
      var availability = false;
  
      if (room.currentBookings.length > 0) {
        for ( const booking of room.currentBookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.checkInDate,
              booking.checkOutDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.checkInDate,
              booking.checkOutDate
            )
          ) {
            
            if (
              dates[0].format("DD-MM-YYYY") !== booking.checkInDate &&
              dates[0].format("DD-MM-YYYY") !== booking.checkOutDate &&
              dates[1].format("DD-MM-YYYY") !== booking.checkInDate &&
              dates[1].format("DD-MM-YYYY") !== booking.checkOutDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }
  
      if (availability === true) {
        tempRooms.push(room);
      }
    }
  
    setRooms(tempRooms);
  }