async function returnText() {
     var query = document.getElementById("ingredients").value;
     /* var cuisine = document.getElementById("cuisine").value;
     var intolerences = document.getElementById("intolerences").value;
     var ingredients = document.getElementById("ingredients").value; */

  try {
    const url = "http://localhost:3001/";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ query /*, cuisine, intolerences, ingredients*/}),
    };
       fetch(url, options).then((res) => { console.log(res)});
  } catch (e) {
    console.error(e);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
     console.log(obj);
});
