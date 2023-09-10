async function returnText() {
     /* var query = document.getElementById("query").value;
     var cuisine = document.getElementById("cuisine").value;
     var intolerences = document.getElementById("intolerences").value; */
  var ingredients = document.getElementById("ingredients").value;

  try {
    const url = "http://localhost:3001";
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ /*query , cuisine, intolerences,*/ ingredients }),
    };
    fetch(url, options).then((res) => { });
  } catch (e) {
    console.error(e);
  }
}
function fetchData() {
  const apiUrl = "http://localhost:3001/api/data"; // Replace with your backend URL
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      // Handle and display the data on the frontend
      const dataContainer = document.getElementById("data-container");
      dataContainer.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function inputChanges() {
  // Get references to the textarea and output text box
  const textarea = document.getElementById("ingredients");
  const outputText = document.getElementById("outputText");

  // Add an event listener to the textarea to capture input changes
  textarea.addEventListener("input", function () {
    // Get the value of the textarea
    const inputValue = textarea.value;
  });
}

/*const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
     console.log(obj);
});*/
