import express from "express";
import dotenv from "dotenv";
import {
    addAnimal,
    deleteAnimal,
    editAnimal,
    getAllAnimals,
    getAnimalById,
} from "./services/animals.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const port = process.env.NODE_PORT;


app.get("/", getAllAnimals);
app.get("/:id", getAnimalById);
app.post("/", addAnimal);
app.delete("/:id", deleteAnimal);
app.patch("/:id", editAnimal);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
