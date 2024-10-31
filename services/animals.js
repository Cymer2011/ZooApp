import { v4 } from "uuid";
import { readFileSync, writeFileSync } from "fs";


export const getAllAnimals = (req, res) => {
  const data = readFileSync("./db.json").toString();
  res.send(JSON.parse(data));
};


export const getAnimalById = (req, res) => {
  const data = readFileSync("./db.json").toString();
  const id = req.params.id;
  const currentAnimal = JSON.parse(data).find((animal) => animal.id === id);

  if (currentAnimal) {
    res.status(200).send(currentAnimal);
  } else {
    res.status(404).send({ message: "Animal not found" });
  }
};


export const addAnimal = (req, res) => {
  const data = readFileSync("./db.json").toString();
  req.body.id = v4(); 
  const newData = JSON.parse(data);
  newData.unshift(req.body);



  writeFileSync("./db.json", JSON.stringify(newData, null, 2)); 
  res.status(201).send({
    message: "Animal successfully added!",
  });
};

export const deleteAnimal = (req, res) => {
  const data = readFileSync("./db.json").toString();
  const id = req.params.id;
  const animals = JSON.parse(data).filter((animal) => animal.id !== id);

  writeFileSync("./db.json", JSON.stringify(animals));
  res.status(200).send({
    message: "Animal successfully deleted!",
  });
};


export const editAnimal = (req, res) => {
  const data = readFileSync("./db.json").toString();
  const id = req.params.id;
  const animals = JSON.parse(data);
  const currentAnimalIndex = animals.findIndex((animal) => animal.id === id);

  if (currentAnimalIndex === -1) {
    return res.status(404).json({ message: "Animal not found" });
  }

  animals[currentAnimalIndex] = { ...animals[currentAnimalIndex], ...req.body };
  writeFileSync("./db.json", JSON.stringify(animals, null, 2));

  res.status(200).json(animals[currentAnimalIndex]);
};
