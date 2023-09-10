// Add an event listener to the submit button
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
    // Call the fetchData function when the button is clicked
    fetchData();
});

function fetchData() {
    const ingredients = document.getElementById("ingredients").value;

    // Fetch the data from recipes.json
    axios.get("recipes.json")
        .then((response) => {
            const data = response.data;

            // Assuming data.results is an array with at least two items
            const card1Data = data.results[0];
            const card2Data = data.results[1];

            // Create card elements
            const card1 = createCard(card1Data);
            const card2 = createCard(card2Data);

            // Clear the data container and append card elements
            const dataContainer = document.getElementById("data-container");
            dataContainer.innerHTML = "";
            dataContainer.appendChild(card1);
            dataContainer.appendChild(card2);
        })
        .catch((error) => {
            // Display an error message to the user
            const dataContainer = document.getElementById("data-container");
            dataContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
            console.error("There was a problem with the fetch operation:", error);
        });
}

function createCard(data) {
    // Create a card element
    const card = document.createElement("div");
    card.classList.add("card");

    // Create card content
    const content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.image}" alt="${data.title}">
    `;

    // Append content to the card
    card.appendChild(content);

    return card;
}
