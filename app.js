// Imports
import express from "express";
import cors from "cors";
import axios from "axios";
import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage("./scratch");

// Set up Express App for use
//Line 10-11 set up the CORS policy and the request body parser
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// params = {
//   api_key: '7814cf75a6954dd790bcc59be0e80db7',
//   queries: obj[queries]
// }

// The url using the parameters
// const api_url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${encodeURIComponent(obj.api_key)}&query=${encodeURIComponent(obj.queries)}&cuisines=${obj.cuisines}&intolerances=${obj.intolerances}&includeIngredients=${obj.ingredients}`

// Getting the data from the API using fetch

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("done");
});
