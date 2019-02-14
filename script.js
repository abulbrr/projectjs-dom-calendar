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
    year: 2019,
    events: ["event1", "event2", "event3"]
  },
  {
    day: 15,
    monthIndex: 1,
    year: 2019,
    events: ["only one"]
  },
  {
    day: 23,
    monthIndex: 11,
    year: 2019,
    events: ["huh"]
  }
];

const calendarView = {
  WEEK: 0,
  MONTH: 1
};

var calendarUi = {
  calendar: new Calendar(),
  currentView: calendarView.MONTH,
  isHidden: true,
  calendarDiv: null,
  rootElement: null,
  currentMonthIndex: null,
  selectedDay: null,
  today: null,
  isDatePicker: false,

  init: (id, properties) => {
    calendarUi.rootElement = dom.get(id);
    calendarUi.today = calendarUi.calendar.getDayInMonth();
    calendarUi.selectedDay = calendarUi.today;
    calendarUi.currentMonthIndex = calendarUi.calendar.getMonth();
    calendarUi.isDatePicker = calendarUi.rootElement.tagName == "INPUT";

    if (properties != undefined)
      for (prop in properties) {
        calendarUi[prop] = properties[prop];
      }

    calendarUi.render();
  },

  createWeekDays: function() {
    var daysRoot = dom.createElement(
      "div",
      { id: "daysRoot", class: "row" },
      {}
    );

    var month = calendarUi.calendar.getMonth();
    var year = calendarUi.calendar.getYear();
    var day;
    var daysInWeek = 7;
    var monthEvents = calendarUi.eventsThisMonth(month);
    var weekStart =
      calendarUi.calendar.getDayInMonth() - calendarUi.calendar.getWeekDay();
    var weekEnd = weekStart + daysInWeek;

    for (let index = weekStart; index < weekEnd; index++) {
      var className;
      var hasEvent = false;
      if (monthEvents.length != 0) {
        hasEvent = CollectionUtils.find(monthEvents, e => {
          return e.day == index;
        });
      }

      if (index == calendarUi.today && month == calendarUi.currentMonthIndex)
        className = "col s12 center-align green lighten-2";
      else if (hasEvent != false)
        className = "col s12 center-align red lighten-2";
      else className = "col s12 center-align z-depth-1";
      day = dom.createElement(
        "div",
        {
          id: index + "day",
          onclick: "dayClicked(this.id)",
          class: className
        },
        {},
        index + " " + calendarUi.calendar.getWeekDayName(index - weekStart)
      );

      daysRoot.appendChild(day);
    }
    return daysRoot;
  },

  createMonthDays: function() {
    var isDatePicker = calendarUi.isDatePicker;
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
      else if (hasEvent != false && isDatePicker == false)
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
    if (month == undefined) month = calendarUi.calendar.getMonth();
    return events.filter(e => {
      return e.monthIndex == month;
    });
  },
  eventsInSelectedDay: () => {
    var eventsToday = CollectionUtils.find(events, e => {
      return e.day == calendarUi.selectedDay;
    });
    if (eventsToday != false) return eventsToday.events;
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
  createViewsButtons: function() {
    var viewsBar = dom.createElement(
      "div",
      { id: "viewsBar", class: "row center-align blue-grey" },
      {}
    );
    monthView = dom.createElement(
      "p",
      {
        class: "btn-small col s3",
        onclick: "setView(1)"
      },
      {},
      "Months View"
    );
    dom.addElement(monthView, viewsBar);
    weekView = dom.createElement(
      "p",
      {
        value: calendarView.WEEK,
        class: "btn-small col s3",
        onclick: "setView(0)"
      },
      {},
      "Week View"
    );
    dom.addElement(weekView, viewsBar);
    return viewsBar;
  },

  render: function() {
    var isDatePicker = calendarUi.isDatePicker;
    console.log(isDatePicker);
    calendarUi.rootElement.innerHTML = "";
    if (calendarUi.calendarDiv != null) {
      calendarUi.calendarDiv.innerHTML = "";
    } else {
      calendarUi.calendarDiv = dom.createElement("div", { id: "calendar" }, {});
      if (isDatePicker) {
        dom.on("focus", calendarUi.rootElement, () => {
          calendarUi.isHidden = false;
          calendarUi.render();
        });
      }
    }

    if (isDatePicker) {
      calendarUi.currentView = calendarView.MONTH;
      if (calendarUi.isHidden) {
        dom.css(this.calendarDiv, "display", "none");
      } else {
        dom.css(this.calendarDiv, "display", "block");
      }
      dom.addElement(calendarUi.calendarDiv, dom.get("body"));
    } else {
      calendarUi.isHidden = false;
      dom.addElement(calendarUi.calendarDiv, calendarUi.rootElement);

      var yearBar = dom.createElement(
        "div",
        { id: "yearBar", class: "row center-align blue-grey" },
        {}
      );

      var leftArrow = calendarUi.createIcon("yearLeft", "keyboard_arrow_left");
      var rightArrow = calendarUi.createIcon(
        "yearRight",
        "keyboard_arrow_right"
      );

      yearBar.appendChild(leftArrow);
      dom.appendText(yearBar, calendarUi.calendar.getYear());
      yearBar.appendChild(rightArrow);
      calendarUi.calendarDiv.appendChild(yearBar);
    }

    var monthBar = dom.createElement(
      "div",
      { id: "monthBar", class: "row center-align blue-grey lighten-4" },
      {}
    );
    leftArrow = calendarUi.createIcon("monthLeft", "keyboard_arrow_left");
    rightArrow = calendarUi.createIcon("monthRight", "keyboard_arrow_right");
    var viewsBar = calendarUi.createViewsButtons();

    monthBar.appendChild(leftArrow);
    dom.appendText(monthBar, calendarUi.calendar.getMonthName());
    monthBar.appendChild(rightArrow);
    var daysView;
    if (this.currentView == calendarView.MONTH)
      daysView = calendarUi.createMonthDays();
    else daysView = calendarUi.createWeekDays();

    var months = calendarUi.createMonths();
    calendarUi.calendarDiv.appendChild(monthBar);
    calendarUi.calendarDiv.appendChild(daysView);
    if (!isDatePicker) {
      calendarUi.calendarDiv.appendChild(months);
      calendarUi.calendarDiv.appendChild(viewsBar);
      calendarUi.renderEvents();
    }
  },
  renderEvents: function() {
    var rootEl = dom.createElement("div", {}, {});
    dom.addElement(rootEl, calendarUi.rootElement);
    rootEl.innerHTML = "Events this day: ";
    var el;
    var eventsThisMonth = this.eventsThisMonth();

    if (eventsThisMonth.length != 0) {
      var eventsToday = calendarUi.eventsInSelectedDay();
      if (eventsToday != undefined && eventsToday.length != 0) {
        for (let index = 0; index < eventsToday.length; index++) {
          el = dom.createElement("li", {}, {}, eventsToday[index]);
          dom.addElement(el, rootEl);
        }
        return;
      }
    }
    el = dom.createElement("h5", {}, {}, "No Events this day");
    dom.addElement(el, rootEl);
  }
};

calendarUi.init("app");

// calendarUi.init("input");

function arrowClicked(id) {
  switch (id) {
    case "monthRight":
      if (calendarUi.isDatePicker && calendarUi.calendar.getMonth() >= 11)
        break;
      calendarUi.calendar.setNextMonth();
      break;
    case "monthLeft":
      if (
        calendarUi.isDatePicker &&
        calendarUi.calendar.getMonth() <= calendarUi.currentMonthIndex
      )
        break;

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
  id = id.replace("day", "");
  calendarUi.selectedDay = id;
  if (calendarUi.isDatePicker) {
    calendarUi.rootElement.value =
      id +
      " / " +
      calendarUi.calendar.getMonthName() +
      " / " +
      calendarUi.calendar.getYear();

    calendarUi.isHidden = true;
  }

  calendarUi.render();
}

function setMonth(id) {
  calendarUi.calendar.setMonth(id);
  calendarUi.render();
}
function setView(viewId) {
  calendarUi.currentView = viewId;
  calendarUi.render();
}
