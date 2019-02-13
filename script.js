var CollectionUtils = {};
CollectionUtils.forEach = function(collection, callback) {
  if (collection.length == 0) return;
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    callback(element, index);
  }
};

CollectionUtils.max = function(collection) {
  if (collection.length == 0) return;
  let max = 0;
  let times = 1;
  let element;
  for (let index = 0; index < collection.length; index++) {
    const elementLength = collection[index].atendees.length;
    if (elementLength == max) {
      times++;
    } else if (elementLength > max) {
      max = elementLength;
      times = 1;
      element = collection[index];
    }
  }
  if (times == collection.length) {
    alert("All events are equals");
    return false;
  }

  return element;
};

CollectionUtils.filter = function(collection, callback) {
  let temp = [];
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (callback(element)) temp.push(element);
  }

  return temp;
};

CollectionUtils.find = function(collection, callback) {
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    if (callback(element)) return element;
  }
  return false;
};

CollectionUtils.map = function(collection, callback) {
  let temp = [];
  for (let index = 0; collection < array.length; index++) {
    const element = arrcollectionay[index];
    temp.push(callback(element));
  }
  return temp;
};

var dom = new DomMan();

var events = [
  {
    day: 1,
    monthIndex: 1,
    year: 2019
  },
  {
    day: 15,
    monthIndex: 1,
    year: 2019
  },
  {
    day: 23,
    monthIndex: 11,
    year: 2019
  }
];

var calendarUi = {
  calendar: new Calendar(),
  rootElement: null,
  currentMonthIndex: null,
  today: null,
  isDatePicker: false,
  init: id => {
    calendarUi.rootElement = dom.get(id);
    calendarUi.today = calendarUi.calendar.getDayInMonth();
    calendarUi.currentMonthIndex = calendarUi.calendar.getMonth();
    calendarUi.isDatePicker = calendarUi.rootElement.tagName == "INPUT";
    calendarUi.render();
  },

  createMonthDays: function() {
    var daysRoot = dom.createElement(
      "div",
      { id: "daysRoot", class: "row" },
      {}
    );

    var month = calendarUi.calendar.getMonth();
    var year = calendarUi.calendar.getYear();
    var day;
    var daysInMonth = calendarUi.calendar.daysInMonth(month, year);
    var monthEvents = calendarUi.eventsThisMonth(month);
    for (let index = 1; index < daysInMonth + 1; index++) {
      var className;
      var hasEvent = false;
      if (monthEvents.length != 0) {
        hasEvent = CollectionUtils.find(monthEvents, e => {
          return e.day == index;
        });
      }

      if (index == calendarUi.today && month == calendarUi.currentMonthIndex)
        className = "col s2 center-align green lighten-2";
      else if (hasEvent != false)
        className = "col s2 center-align red lighten-2";
      else className = "col s2 center-align z-depth-1";

      day = dom.createElement(
        "div",
        {
          id: index + "day",
          onclick: "dayClicked(this.id)",
          class: className
        },
        {},
        index
      );

      daysRoot.appendChild(day);
    }
    return daysRoot;
  },
  eventsThisMonth: month => {
    return events.filter(e => {
      return e.monthIndex == month;
    });
  },
  createIcon: function(id, iconName) {
    var icon = (leftArrow = dom.createElement(
      "i",
      { id: id, class: "material-icons", onclick: "arrowClicked(this.id)" },
      {},
      iconName
    ));

    return icon;
  },
  createMonths: function() {
    var daysRoot = dom.createElement(
      "div",
      { id: "monthsRoot", class: "row" },
      {}
    );
    var el;
    for (let index = 0; index < 12; index++) {
      el = dom.createElement(
        "p",
        {
          id: index,
          class: "btn-small col s3",
          onclick: "setMonth(this.id)"
        },
        {},
        this.calendar.getMonthName(index)
      );
      dom.addElement(el, daysRoot);
    }
    return daysRoot;
  },

  render: function() {
    calendarUi.rootElement.innerHTML = "";
    dom.createElement("div", { id: "navigationBar" }, {});
    var yearbar = dom.createElement(
      "div",
      { id: "yearBar", class: "row center-align blue-grey" },
      {}
    );

    var leftArrow = calendarUi.createIcon("yearLeft", "keyboard_arrow_left");
    var rightArrow = calendarUi.createIcon("yearRight", "keyboard_arrow_right");

    yearbar.appendChild(leftArrow);
    dom.appendText(yearbar, calendarUi.calendar.getYear());
    yearbar.appendChild(rightArrow);

    var monthbar = dom.createElement(
      "div",
      { id: "monthBar", class: "row center-align blue-grey lighten-4" },
      {}
    );
    leftArrow = calendarUi.createIcon("monthLeft", "keyboard_arrow_left");
    rightArrow = calendarUi.createIcon("monthRight", "keyboard_arrow_right");

    monthbar.appendChild(leftArrow);
    dom.appendText(monthbar, calendarUi.calendar.getMonthName());
    monthbar.appendChild(rightArrow);

    var monthDays = calendarUi.createMonthDays();
    var months = calendarUi.createMonths();

    calendarUi.rootElement.appendChild(yearbar);
    calendarUi.rootElement.appendChild(monthbar);
    calendarUi.rootElement.appendChild(monthDays);
    calendarUi.rootElement.appendChild(months);
  }
};

calendarUi.init("app");

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
function dayClicked(id) {
  console.log("day clicked" + id);
}

function setMonth(id) {
  calendarUi.calendar.setMonth(id);
  calendarUi.render();
}

// calendarUi.init();
