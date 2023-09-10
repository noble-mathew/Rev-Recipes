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

            // Create card elements for the cards
            const card1 = createCard(card1Data);
            const card2 = createCard(card2Data);

            // Clear the data container and append card elements
            const dataContainer = document.getElementById("data-container");
            dataContainer.innerHTML = "";
            dataContainer.appendChild(card1);
            dataContainer.appendChild(card2);

            // Load recipe details next to the cards
            loadRecipeDetails(data.results);
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

function loadRecipeDetails(recipes) {
    // Assuming you want to display details for the first two recipes
    const recipe1 = recipes[0];
    const recipe2 = recipes[1];

    // Fetch and display details for recipe 1
    fetchRecipeDetails(recipe1.id, "card1-content");

    // Fetch and display details for recipe 2
    fetchRecipeDetails(recipe2.id, "card2-content");
}

function fetchRecipeDetails(recipeId, containerId) {
    // Make an API request to get recipe details using the recipe ID
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information`;

    axios.get(apiUrl, {
        params: {
            apiKey: "5811446a8d1b43bca5ddbb1fceb4403d", // Replace with your Spoonacular API key
        },
    })
    .then((response) => {
        const recipeDetails = response.data;

        // Create elements to display recipe details
        const recipeDetailsElement = createRecipeDetailsElement(recipeDetails);

        // Append recipe details elements to the appropriate containers
        const cardContent = document.getElementById(containerId);
        cardContent.innerHTML = ""; // Clear the existing content
        cardContent.appendChild(recipeDetailsElement);
    })
    .catch((error) => {
        // Display an error message to the user
        console.error("Error fetching recipe details:", error);
    });
}

function createRecipeDetailsElement(recipe) {
    // Create a string containing the recipe's ingredients and instructions
    const ingredients = recipe.extendedIngredients.map(ingredient => ingredient.original).join(", ");
    const instructions = recipe.instructions;

    const recipeDetails = document.createElement("div");
    recipeDetails.classList.add("recipe-details");
    recipeDetails.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>Recipe ID: ${recipe.id}</p>
        <p>Image Type: ${recipe.imageType}</p>
        <p>Ingredients: ${ingredients}</p>
        <p>Instructions: ${instructions}</p>
    `;

    return recipeDetails;
}
