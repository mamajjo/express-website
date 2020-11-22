export const dict = ["pin_1", "pin_2", "pin_3", "pin_4"];

const formElem = document.querySelector("form");

export async function generateDBoptions(dbSources) {
  let selectableList = document.getElementById("db");
  setTimeout(() => {
    dbSources.forEach((element) => {
      let option = document.createElement("option");
      option.appendChild(document.createTextNode(element));
      option.value = element;
      selectableList.appendChild(option);
    });
  }, 2000);
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
