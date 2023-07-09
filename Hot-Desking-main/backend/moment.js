const moment = require('moment')
console.log(moment('2023-06-24').toDate());
console.log(moment('2023-06-24 09:00').toDate());
console.log(moment().startOf('day'));
console.log(moment())
// const currentDate = moment().format('YYYY-MM-DD HH:mm');
// console.log('cR',currentDate);
// const bookingDateTime = moment('2023-06-24 07:00');
// console.log(bookingDateTime.isSameOrAfter(currentDate));