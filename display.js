"use strict";

// display the returned array
function displayList(arr) {
  document.querySelector(".list").innerHTML = "";
  arr.forEach(element => {
    let clone = document.querySelector(".name-temp").content.cloneNode(true);
    clone.querySelector("[data-firstName]").textContent = element.firstName;
    clone.querySelector("[data-middlePart]").textContent = element.middlePart;
    clone.querySelector("[data-lastName]").textContent = element.lastName;
    document.querySelector(".list").appendChild(clone);
  });
}

// listen to and perform the clicked function from the function object
document.querySelectorAll(".function").forEach(getTrigger);
function getTrigger(f) {
  f.addEventListener("click", getEachTrigger);
  function getEachTrigger(c) {
    let chosenFunction = c.target.classList[1].substring(
      c.target.classList[1].indexOf("-") + 1
    );
    functionsObj[chosenFunction]();
  }
}

// styling after changes to the list

function lineUpLeft() {
  document.querySelector(".list").style.textAlign = "left";
  //first letter change
}
function centerAlign() {
  document.querySelector(".list").style.textAlign = "center";
  //first letter change
}
function lineUpLastName() {
  let allLastNames = document.querySelectorAll(
    ".each-name span:nth-of-type(3)"
  );
  let allOtherNames = document.querySelectorAll(
    ".each-name span:not(:nth-of-type(3))"
  );
  document.querySelector(".list").style.textAlign = "right";
  allLastNames.forEach(item => {
    item.style.left =
      item.getBoundingClientRect().width - window.innerWidth * 0.25 + "px";
  });
  allOtherNames.forEach(item => {
    item.style.left =
      item.parentElement.lastChild.getBoundingClientRect().width -
      11 -
      window.innerWidth * 0.25 +
      "px"; //  add a 11px gap between last name and the names before to make the line up more apparent
  });
}
