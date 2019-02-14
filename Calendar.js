const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function Calendar() {
  this.name = "calendar";
  this.date = new Date();
}

Calendar.prototype.daysInMonth = function(month, year) {
  if (year == undefined) year = this.date.getFullYear();
  if (month == undefined) month = this.date.getMonth();

  return new Date(year, month + 1, 0).getDate();
};
Calendar.prototype.getMonth = function() {
  return this.date.getMonth();
};
Calendar.prototype.getYear = function() {
  return this.date.getFullYear();
};
Calendar.prototype.getDayInMonth = function() {
  return this.date.getUTCDate();
};
Calendar.prototype.getWeekDay = function() {
  return this.date.getDay();
};
Calendar.prototype.getWeekDayName = function(index) {
  return weekDays[index];
};

Calendar.prototype.getDate = function() {
  return this.date.getDate();
};

Calendar.prototype.getMonthName = function(index) {
  if (index == undefined) index = this.date.getMonth();
  return monthNames[index];
};
Calendar.prototype.setMonth = function(index) {
  console.log("setting month");
  this.date.setMonth(index);
  return this;
};

Calendar.prototype.setNextMonth = function() {
  this.date.setMonth(this.date.getMonth() + 1);
  return this;
};

Calendar.prototype.setLastMonth = function() {
  this.date.setMonth(this.date.getMonth() - 1);
  return this;
};

Calendar.prototype.setNextYear = function() {
  this.date.setFullYear(this.date.getFullYear() + 1);
  return this;
};

Calendar.prototype.setLastYear = function() {
  this.date.setFullYear(this.date.getFullYear() - 1);
  return this;
};
