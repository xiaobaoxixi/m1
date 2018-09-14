"use strict";

// display the returned array
function displayList(arr) {
  document.querySelector(".list").innerHTML = "";
  arr.forEach((element, index) => {
    let clone = document.querySelector(".name-temp").content.cloneNode(true);
    clone.querySelector("[data-firstName]").textContent = element.firstName;
    clone.querySelector("[data-middlePart]").textContent = element.middlePart;
    clone.querySelector("[data-lastName]").textContent = element.lastName;
    clone.querySelector("[data-uid]").setAttribute("uid", element.uid);
    document.querySelector(".list").appendChild(clone);
    document.querySelector(".list").scrollTop = 0; // always show the list from the top
  });
}

// listen to and perform the clicked function from the function object
document.querySelectorAll(".function").forEach(getTrigger);
function getTrigger(f) {
  f.addEventListener("click", getEachTrigger);

  function getEachTrigger(c) {
    c.stopPropagation();
    let chosenFunction = c.target.classList[1].substring(
      c.target.classList[1].indexOf("-") + 1
    );
    functionsObj[chosenFunction]();
  }
}

//  detail/delete
document.addEventListener("click", checkIfNameLine); // the delete and moreInfo button are generated with template, not available when page load, so need to listen to window
function checkIfNameLine(m) {
  m.stopPropagation(); //stop event bubbling, used together with pointer-event:none and padding/margin in CSS to narrow down trigger area
  if (m.target.tagName === "P" && m.target.className.indexOf("each") > -1) {
    console.log(m.target);
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
  // run function
  if (m.target.classList[1]) {
    let selectedFounction = m.target.classList[1].substring(
      m.target.classList[1].indexOf("-") + 1
    );
    functionsObj[selectedFounction](m);
  }
}

///////// styling after changes to the list
function lineUpLeft() {
  document.querySelector(".list").style.textAlign = "left";
  document.querySelector(".list").style.paddingLeft = "3vw";
  document
    .querySelectorAll(".list p.each-name")
    .forEach(p => (p.style.marginLeft = "3vw"));
}
function centerAlign() {
  document.querySelector(".list").style.textAlign = "center";
  document.querySelector(".list").style.paddingLeft = "0";
  document.querySelector(".first-letters").innerHTML = "";
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
      item.getBoundingClientRect().width - window.innerWidth * 0.24 + "px";
  });
  allOtherNames.forEach(item => {
    item.style.left =
      item.parentElement.children[
        item.parentElement.children.length - 2
      ].getBoundingClientRect().width -
      11 -
      window.innerWidth * 0.24 +
      "px"; //  add a 11px gap between last name and the names before to make the line up more apparent
  });
  document.querySelector(".list").style.paddingLeft = "10vw";
}

/////////// after sorting by first/last name, treat first letter of the first appearance of each letter
function firstAppearance(nth) {
  let by;
  if (nth === 1) {
    by = "fist name";
    document.querySelector(".first-letters").className = "first-letters left";
  } else {
    by = "last name";
    document.querySelector(".first-letters").className = "first-letters right";
  }
  document.querySelector(".first-letters").textContent = "";
  let selector = `.each-name span:nth-of-type(${nth})`;
  let allFirstNames = document.querySelectorAll(selector);
  allFirstNames.forEach(checkIfFirst);
  function checkIfFirst(n, index) {
    if (index === 0) {
      document.querySelector(
        ".first-letters"
      ).innerHTML += `by 1st letter of ${by}: <br><br><span class="first-l function-byLetter function">  ${
        n.textContent[0]
      }</span>`;
    } else if (n.textContent[0] !== allFirstNames[index - 1].textContent[0]) {
      document.querySelector(
        ".first-letters"
      ).innerHTML += `<span class="first-l function-byLetter function">  ${
        n.textContent[0]
      }</span>`;
    }
  }
}
