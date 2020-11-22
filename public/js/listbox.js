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
  xhttp.open("GET", "http://0.0.0.0:5000/dbs", true);
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
  console.log(body);
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("POST", "http://0.0.0.0:5000/xls", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(body));
});
