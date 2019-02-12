var DomMan = function() {
  this.name = "DomMan";
};
DomMan.prototype.get = function(query) {
  let element;
  element = document.querySelector(query);
  if (element == null) element = document.getElementById(query);
  return element;
};

DomMan.prototype.getAll = function(query) {
  let elements;
  elements = document.querySelectorAll(query);
  if (elements == null) elements = document.getElementsByClassName(query);
  return element;
};

DomMan.prototype.addElement = function(element, parentElement) {
  parentElement.appendChild(element);
  return this;
};

DomMan.prototype.deleteElement = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.remove();
  return this;
};

DomMan.prototype.getCopy = function(element) {
  return element.cloneNode(true);
};

DomMan.prototype.createElement = function(
  tagName,
  attributes = {},
  style = {},
  text
) {
  const el = document.createElement(tagName);

  for (item in attributes) {
    el.setAttribute(item, attributes[item]);
  }
  for (item in attributes) {
    el.style[item] = attributes[item];
  }
  if (text) {
    el.appendChild(document.createTextNode(text));
  }
  return el;
};

DomMan.prototype.updateAttr = function(id, attributes = {}) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  for (item in attributes) {
    el.item = attributes[item];
  }
  return this;
};

DomMan.prototype.updateStyle = function(id, style = {}) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  for (item in style) {
    el.setAttribute(item, style[item]);
  }
  return this;
};

DomMan.prototype.appendText = function(el, text) {
  if (el == null) return;
  el.innerHTML += text;
  return this;
};

DomMan.prototype.updateText = function(el, text) {
  if (el == null) return;
  el.innerHTML = text;
  return this;
};

DomMan.prototype.on = function(event, elementId, callback) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.addEventListener(event, callback);
  return this;
};

DomMan.prototype.getText = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.textContent;
};

DomMan.prototype.getHtml = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.innerHTML;
};

DomMan.prototype.getParent = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.parentElement();
};

DomMan.prototype.getNextSibling = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.nextSibling();
};

DomMan.prototype.getPreviousSibling = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.previousSibling();
};

DomMan.prototype.getChildren = function(id) {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.children();
};
var dom = new DomMan();

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

Calendar.prototype.getMonthName = function(index) {
  if (index == undefined) index = this.date.getMonth();
  return monthNames[index];
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

function clicked(id) {
  console.log("day clicked" + id);
}

var calendarr = new Calendar();

function CalendarUI(elementId) {
  this.dom = new DomMan();
  this.calendar = new Calendar();
  this.rootElement = dom.get(elementId);
  this.today = this.calendar.getDayInMonth();
  this.currentMonthIndex = this.calendar.getMonth();
  return this;
}

CalendarUI.prototype.createMonthDays = function() {
  var daysRoot = this.dom.createElement(
    "div",
    { id: "daysRoot", class: "row" },
    {}
  );

  var day;
  var daysInMonth = this.calendar.daysInMonth(
    this.calendar.getMonth(),
    this.calendar.getYear()
  );
  console.log(this.today + ", " + this.currentMonthIndex);
  for (let index = 1; index < daysInMonth + 1; index++) {
    var className;
    if (
      index == this.today &&
      this.calendar.getMonth() == this.currentMonthIndex
    )
      className = "col s2 center-align red lighten-2";
    else className = "col s2 center-align z-depth-1";

    day = this.dom.createElement(
      "div",
      {
        id: index + "day",
        onclick: "clicked(this.id)",
        class: className
      },
      {},
      index
    );

    daysRoot.appendChild(day);
  }
  return daysRoot;
};

CalendarUI.prototype.createIcon = function(id, iconName) {
  var icon = (leftArrow = this.dom.createElement(
    "i",
    { id: id, class: "material-icons", onclick: "arrowClicked(this.id)" },
    {},
    iconName
  ));

  return icon;
};

CalendarUI.prototype.init = function() {
  this.render();

  return this;
};

CalendarUI.prototype.render = function() {
  this.rootElement.innerHTML = "";
  this.dom.createElement("div", { id: "navigationBar" }, {});
  var yearbar = this.dom.createElement(
    "div",
    { id: "yearBar", class: "row center-align blue-grey" },
    {}
  );

  var leftArrow = this.createIcon("yearLeft", "keyboard_arrow_left");
  var rightArrow = this.createIcon("yearRight", "keyboard_arrow_right");

  yearbar.appendChild(leftArrow);
  this.dom.appendText(yearbar, this.calendar.getYear());
  yearbar.appendChild(rightArrow);

  var monthbar = this.dom.createElement(
    "div",
    { id: "monthBar", class: "row center-align blue-grey lighten-4" },
    {}
  );
  leftArrow = this.createIcon("monthLeft", "keyboard_arrow_left");
  rightArrow = this.createIcon("monthRight", "keyboard_arrow_right");

  monthbar.appendChild(leftArrow);
  this.dom.appendText(monthbar, this.calendar.getMonthName());
  monthbar.appendChild(rightArrow);

  var monthDays = this.createMonthDays();
  this.rootElement.appendChild(yearbar);
  this.rootElement.appendChild(monthbar);
  this.rootElement.appendChild(monthDays);
};
var calendarUi = new CalendarUI("app").init();

function arrowClicked(id) {
  switch (id) {
    case "monthRight":
      calendarUi.calendar.setNextMonth();
      break;
    case "monthLeft":
      calendarUi.calendar.setLastMonth();
      break;
    case "yearLeft":
      calendarUi.calendar.setLastYear();
      break;
    case "yearRight":
      calendarUi.calendar.setNextYear();
      break;
  }
  calendarUi.render();
}
