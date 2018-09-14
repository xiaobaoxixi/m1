"use strict";
const originalList = [];
let currentList = [];
// build an object of functions so that different functions can be called using the string passed from the attr of the clicked element
// in this way, less code for eventListener
const functionsObj = {
  byFirstName: function() {
    currentList.sort();
    displayList(currentList);
    lineUpLeft();
    firstAppearance(1);
  },
  byLastName: function() {
    sortByLastName();
    displayList(currentList);
    lineUpLastName();
    firstAppearance(3);
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
  delete: function(m) {
    let uid = m.target.previousElementSibling.lastElementChild.getAttribute(
      "uid"
    );
    currentList = currentList.filter(item => item.uid !== uid);
    document.querySelector(".underlined").classList.add("delAnimation");
    document
      .querySelector(".delAnimation")
      .addEventListener("animationend", function() {
        m.target.parentElement.remove();
      });
  },
  moreInfo: function(m) {
    document.querySelector(".more-info").style.display = "inherit";
    document.querySelector(
      ".more-info .name"
    ).textContent = m.target.parentElement.querySelector(
      ".each-name"
    ).textContent;
    document.querySelector(".first-letters").style.display = "none";
  },
  closeModal: function() {
    document.querySelector(".more-info").style.display = "none";
    document.querySelector(".first-letters").style.display = "inherit";
  },
  byLetter: function(m) {
    let letter = m.target.textContent.trim();
    let whichName = m.target.parentElement.className;
    if (whichName.includes("left")) {
      whichName = "firstName";
    }
    if (whichName.includes("right")) {
      whichName = "lastName";
    }
    currentList = currentList.filter(item => item[whichName][0] === letter);
    displayList(currentList);
    //update the list of only visible first letters
    if (whichName === "firstName") firstAppearance(1);
    if (whichName === "lastName") {
      firstAppearance(3);
      lineUpLastName();
    }
  }
};

const prototypeStudent = {
  firstName: "",
  middlePart: "",
  lastName: "",
  uid: "",
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
  },
  keepUid(i) {
    this.uid = i;
  }
};

/////////////////
window.addEventListener("DOMContentLoaded", getData);
/////////////////

function getData() {
  fetch("stud-list.json")
    .then(data => data.json())
    .then(names => {
      names.forEach((n, index) => buildArray(n, index));
      currentList = originalList;
      displayList(currentList);
    });
  function buildArray(eachStud, i) {
    let studObj = Object.create(prototypeStudent);
    studObj.splitName(eachStud);
    studObj.uid += i; // need string, so +
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
