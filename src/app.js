const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
    const newRepository = {id: uuid(), title, url, techs, likes: 0}
  repositories.push(newRepository)
  return response.json(newRepository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  
  if(repositoryIndex === -1){
    return response.status(400).json({error: "Repository with this id can't be found"})
  }else{
    const {title, url, techs} = request.body
    repositories[repositoryIndex].title = title
    repositories[repositoryIndex].url = url
    repositories[repositoryIndex].techs = techs
    return response.json(repositories[repositoryIndex])
  }

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  
  if(repositoryIndex === -1){
    return response.status(400).json({error: "Repository with this id can't be found"})
  }else{
    repositories.splice(repositoryIndex, 1)
    return response.status(204).send()
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  
  if(repositoryIndex === -1){
    return response.status(400).json({error: "Repository with this id can't be found"})
  }else{
    repositories[repositoryIndex].likes++
    return response.json(repositories[repositoryIndex])
  }
});

module.exports = app;
