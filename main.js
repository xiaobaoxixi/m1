"use strict";
const originalList = [];
let currentList = [];
// build an object of functions so that different functions can be called using the string passed from eg. the attr of the clicked element
// in this way, less code for eventListener
const functionsObj = {
  byFirstName: function() {
    currentList.sort();
    displayList(currentList);
    lineUpLeft();
  },
  byLastName: function() {
    sortByLastName();
    displayList(currentList);
    lineUpLastName();
  },
  shuffle: function() {
    let indexS = [];
    let shuffled = [];
    for (let i = currentList.length; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      shuffled.push(currentList[j]);
      currentList.splice(j, 1);
    }
    currentList = shuffled;
    centerAlign();
    displayList(currentList);
  },
  delete: function() {},
  moreInfo: function() {}
};
const prototypeStudent = {
  firstName: "",
  middlePart: "",
  lastName: "",
  toString() {
    return `${this.firstName} ${this.middlePart} ${this.lastName}`;
  },
  splitName(fullName) {
    this.firstName = fullName.substring(0, fullName.indexOf(" "));
    this.middlePart = fullName.substring(
      fullName.indexOf(" ") + 1,
      fullName.lastIndexOf(" ")
    );
    this.lastName = fullName.substring(fullName.lastIndexOf(" ") + 1);
  }
};
/////////////////
window.addEventListener("DOMContentLoaded", getData);
/////////////////
function getData() {
  fetch("stud-list.json")
    .then(data => data.json())
    .then(names => {
      names.forEach(n => buildArray(n));
      currentList = originalList;
      displayList(currentList);
    });
  function buildArray(eachStud) {
    let studObj = Object.create(prototypeStudent);
    studObj.splitName(eachStud);
    originalList.push(studObj);
    return originalList;
  }
}

function sortByLastName() {
  currentList.sort(sortArrayLastName);
  function sortArrayLastName(a, b) {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 0;
    }
  }
}
