function decodeClassroom() {
  var input = document.getElementById("roomInput").value.trim();
  var output = document.getElementById("roomResult");

  if (input === "" || input.indexOf("-") === -1) {
    output.innerHTML = "Please enter a valid room code like 34-501.";
    return;
  }

  var parts = input.split("-");
  var block = parseInt(parts[0], 10);
  var room = parseInt(parts[1], 10);

  if (isNaN(block) || isNaN(room)) {
    output.innerHTML = "Block and room must be numbers (Example: 34-501).";
    return;
  }

  var floor = Math.floor(room / 100);
  var floorLabel = floor === 0 ? "Ground Floor" : "Floor " + floor;

  output.innerHTML =
    "Block: " + block + " | " + floorLabel + " | Room Number: " + room;
}

function setExampleRoom(code) {
  document.getElementById("roomInput").value = code;
  decodeClassroom();
}

function updateChecklist(listId, countId, storageKey) {
  var list = document.getElementById(listId);
  if (!list) return;

  var boxes = list.getElementsByTagName("input");
  var checkedCount = 0;
  var savedStates = [];

  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      checkedCount++;
      savedStates.push("1");
    } else {
      savedStates.push("0");
    }
  }

  document.getElementById(countId).innerHTML =
    checkedCount + " of " + boxes.length + " tasks completed";

  localStorage.setItem(storageKey, savedStates.join(","));
}

function loadChecklist(listId, countId, storageKey) {
  var list = document.getElementById(listId);
  if (!list) return;

  var saved = localStorage.getItem(storageKey);
  var boxes = list.getElementsByTagName("input");

  if (saved) {
    var states = saved.split(",");
    for (var i = 0; i < boxes.length; i++) {
      if (states[i] === "1") {
        boxes[i].checked = true;
      }
    }
  }

  updateChecklist(listId, countId, storageKey);
}

function filterContacts() {
  var query = document.getElementById("contactSearch").value.toLowerCase();
  var rows = document.getElementById("contactTableBody").getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var rowText = rows[i].innerText.toLowerCase();
    if (rowText.indexOf(query) !== -1) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function submitSupportForm(event) {
  event.preventDefault();

  var name = document.getElementById("studentName").value.trim();
  var email = document.getElementById("studentEmail").value.trim();
  var message = document.getElementById("studentMsg").value.trim();
  var statusBox = document.getElementById("formStatus");

  if (name.length < 2) {
    statusBox.innerHTML = "Error: Please enter your full name.";
    return false;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    statusBox.innerHTML = "Error: Please enter a valid email address.";
    return false;
  }

  if (message.length < 10) {
    statusBox.innerHTML = "Error: Message must be at least 10 characters long.";
    return false;
  }

  var refId = "LPU-" + Math.floor(1000 + Math.random() * 9000);
  statusBox.innerHTML =
    "Thank you, " + name + "! Your query is recorded. Reference ID: " + refId;
  document.getElementById("supportForm").reset();
  return false;
}