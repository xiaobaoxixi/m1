"use strict";
const originalList = [];
let currentList = [];
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

function init() {
  getData();
}
function getData() {
  fetch("stud-list.json")
    .then(data => data.json())
    .then(names => {
      names.forEach(n => createStudObj(n));
      currentList = originalList;
      displayList(currentList);
    });
  function createStudObj(eachStud) {
    let studObj = Object.create(prototypeStudent);
    studObj.splitName(eachStud);
    originalList.push(studObj);
    return originalList;
  }
}

window.addEventListener("DOMContentLoaded", init);
