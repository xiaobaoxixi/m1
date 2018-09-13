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

// show detail/delete when mouse enter
document.addEventListener("click", checkIfNameLine);
function checkIfNameLine(m) {
  m.stopPropagation(); //stop event bubbling, used together with pointer-event:none and padding/margin in CSS to narrow down trigger area
  if (m.target.tagName === "P") {
    // clear previous underline
    if (document.querySelector(".underlined")) {
      document.querySelector(".underlined").classList.remove("underlined");
      m.target.parentElement.parentElement
        .querySelectorAll(".round")
        .forEach(eachRound => (eachRound.style.display = "none"));
    }
    m.target.parentElement
      .querySelectorAll(".round")
      .forEach(eachRound => (eachRound.style.display = "inherit"));
    m.target.parentElement.classList.add("underlined");
  }
}

///////// styling after changes to the list

function lineUpLeft() {
  document.querySelector(".list").style.textAlign = "left";
  document
    .querySelectorAll(".list p.each-name")
    .forEach(p => (p.style.marginLeft = "3vw"));
  //first letter change
}
function centerAlign() {
  document.querySelector(".list").style.textAlign = "center";
  //first letter change
}
function lineUpLastName() {
  document.querySelector(".list").style.left = "32vw";

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
  //first letter change
}
