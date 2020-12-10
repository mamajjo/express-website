const formElem = document.querySelector("form");

export async function loadDbHistory(dbSources) {
  let selectableList = document.getElementById("db");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      dbSources = JSON.parse(this.response);
      for (let key of Object.keys(dbSources)) {
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(key.toString()));
        option.value = dbSources[key];
        selectableList.appendChild(option);
      }
    }
  };
  xhttp.open("GET", "http://10.0.12.71:5000/dbs", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}

const submitFrom = (event) => {
  event.preventDefault();
  new FormData(formElem);
};

formElem.addEventListener("submit", submitFrom);
formElem.addEventListener("formdata", (e) => {
  let data = e.formData;
  const body = {};
  for (var [key, value] of data.entries()) {
    body[key] = value;
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let messageBox = document.getElementsByClassName("message-box-content")[0];
      let hidableCard = document.getElementsByClassName("hidable")[0];
      let textContent = JSON.parse(this.response);
      messageBox.innerHTML = "";
      let hasErrors = false
      for(const line of textContent['response']) {
        if(line['type'] == "error") {
          hasErrors = true
        }
        messageBox.innerHTML += line["message"] + "<br>";
      }
      if (hasErrors) {
        changeBoxColor(messageBox, "red");
      }
      else {
        changeBoxColor(messageBox, "green");
      }
      uncover(hidableCard);
    }
  };
  xhttp.open("POST", "http://10.0.12.71:5000/xls", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(body));
});

function changeBoxColor(element, color) {
  element.style.backgroundColor = color;
}

function uncover(element) {
  element.style.visibility = "visible"
  element.style.opacity = 1;
}
