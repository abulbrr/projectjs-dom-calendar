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

function Calendar() {
  this.name = "calendar";
  this.date = new Date();
}

Calendar.prototype.daysInMonth = function(month, year) {
  if (year == undefined) year = this.date.getFullYear();
  if (month == undefined) month = this.date.getMonth();

  console.log(year + " " + month);
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
