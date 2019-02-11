var DomMan = function() {
  this.name = "DomMan";
};
DomMan.prototype.get = query => {
  let element;
  element = document.querySelector(query);
  if (element == null) element = document.getElementById(query);
  return element;
};

DomMan.prototype.addElement = (element, parentElement) => {
  parentElement.appendChild(element);
  return this;
};

DomMan.prototype.deleteElement = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.remove();
  return this;
};

DomMan.prototype.createElement = (
  tagName,
  attributes = {},
  style = {},
  text
) => {
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

DomMan.prototype.updateAttr = (id, attributes = {}) => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  for (item in attributes) {
    el.item = attributes[item];
  }
  return this;
};

DomMan.prototype.updateStyle = (id, style = {}) => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  for (item in style) {
    el.setAttribute(item, style[item]);
  }
  return this;
};

DomMan.prototype.updateText = (id, text) => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.textContent = text;
  return this;
};

DomMan.prototype.updateText = (id, text) => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.innderHTML = text;
  return this;
};

DomMan.prototype.on = (event, elementId, callback) => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  el.addEventListener(event, callback);
  return this;
};

DomMan.prototype.getText = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.textContent;
};

DomMan.prototype.getHtml = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.innerHTML;
};

DomMan.prototype.getParent = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.parentElement();
};

DomMan.prototype.getNextSibling = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.nextSibling();
};

DomMan.prototype.getPreviousSibling = id => {
  let el = DomMan.prototype.get(id);
  if (el == null) return;
  return el.previousSibling();
};

DomMan.prototype.getChildren = id => {
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

var Calendar = function() {
  this.date = new Date();
  // console.log(this.daysInMonth(this.date.getMonth(), this.date.getYear()));
  // console.log(this.getMonthNameByIndex(this.date.getMonth()));
  // console.log(this.getMonthNameByIndex(this.date.getMonth()));
  console.log(this.date);
};

Calendar.prototype.daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};
Calendar.prototype.getMonth = () => {
  return this.date.getMonth();
};
Calendar.prototype.getMonthNameByIndex = index => {
  return monthNames[index];
};

Calendar.prototype.setNextMonth = () => {
  console.log(this.date);
  // this.date.setMonth(this.date.getMonth() + 1);
  return this;
};

var calendar = new Calendar();
calendar.setNextMonth();
// console.log(calendar.getMonthNameByIndex(calendar.getMonth()));
