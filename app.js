import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs"; // Import the 'fs' module

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

let params = {
  api_key: 'ebbb0ad4631c4f88bf1988818ba4b9de',
  ingredients: "", // Initialize ingredients
};

function fetchDataAndSaveToFile() {
  const api_url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(
    params.api_key
  )}&includeIngredients=${encodeURIComponent(params.ingredients)}`;

  axios
    .get(api_url)
    .then((response) => {
      const data = response.data;

      // Save the data to recipes.json, overwriting the file
      fs.writeFileSync('recipes.json', JSON.stringify(data, null, 2), 'utf8');
    })
    .catch((error) => {
      console.error("Error fetching data from the third-party API:", error);
    });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      params[key] = value;
    }

    // Call the function to fetch data and save it to "recipes.json"
    fetchDataAndSaveToFile();

    console.log(req.body, params);
    res.status(200).send("Data submitted and saved to 'recipes.json'");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/data", (req, res) => {
  try {
    // Read the data from "recipes.json"
    const data = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));

    // Send the data as JSON to the frontend
    res.json(data);
  } catch (error) {
    console.error("Error reading data from 'recipes.json':", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
