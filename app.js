// Imports
import express from "express";
import cors from "cors";
import axios from "axios";

// global.localStorage = new LocalStorage("./scratch");

// Set up Express App for use
//Line 10-11 set up the CORS policy and the request body parser
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

let params = {
  api_key: '7814cf75a6954dd790bcc59be0e80db7',
 }

// The url using the parameters
const api_url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(
  params.api_key
)}&findIngredients=${params.ingredients}`;


//Additional parameters  query=${encodeURIComponent(obj.queries)}&cuisines=${obj.cuisines}&intolerances=${obj.intolerances}&

// Getting the data from the API using fetch

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", (req, res) => {
  try {
    // Your route handling logic
    // Use for...of to iterate over object properties
    for (const [key, value] of Object.entries(req.body)) {
      params[key] = value;
    }

    console.log(req.body, params);

    // Use JSON.stringify to convert params to a JSON string
  }
      catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  };
});


// Connecting to the 3rd party API
app.get("/api/data", async (req, res) => {
  try {
    // Make a GET request to the third-party API
    const response = await axios.get(api_url);

    // Extract the relevant data from the response
    const data = response.data;

    // Send the data as JSON to the frontend
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from the third-party API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});