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
