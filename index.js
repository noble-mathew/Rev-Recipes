// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
    // Call the fetchData function when the button is clicked
    fetchData();
});

function fetchData() {
    const ingredients = document.getElementById("ingredients").value;

    // Make an API request to your server
    const api_Url = "http://localhost:3001"; // Update with your server's URL

    fetch(api_Url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ ingredients }),
    })
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
