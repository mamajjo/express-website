export const dict = ["pin_1", "pin_2", "pin_3", "pin_4"];

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

export function submitForm() {
  fetch("https://api.github.com/users/github")
    .then((res) => res.json())
    .then((json) => console.log(json));
}