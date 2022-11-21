function getNthWeekdayInMonth(nth, weekday, year, month) {
  if (nth == 'last') {
    let weekdayIndex = {mon: 6, tue: 5, wed: 4, thu: 3, fri: 2, sat: 1, sun: 0};
    let d = new Date(year, month + 1, 0);
    d.setDate(d.getDate() - (d.getDay() + weekdayIndex[weekday]) % 7);
    return d;
  }
  else if (['first', 'second', 'third', 'forth'].indexOf(nth) >= 0) {
  	let weekdayIndex = {mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 0};
    let nthIndex = { first: 1, second: 2, third: 3, forth: 4 };
    let d = new Date(year, month, 1);
    d.setDate(1 + (7 - d.getDay() + weekdayIndex[weekday]) % 7 + (nthIndex[nth] - 1) * 7);
    return d;
  }
}

console.log(getNthWeekdayInMonth('first', 'mon', 2021, 10));
console.log(getNthWeekdayInMonth('last', 'tue', 2021, 10));
