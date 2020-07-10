const express = require("express");

const db = require("../data/helpers/projectModel")

const router = express.Router();


//post a new project
router.post('/', validatePost, (req, res) => {
    db.insert({name: req.body.name, description: req.body.description})
        .then(post => {
            res.status(201).json("Created")
        })
        .catch(err => {
            res.status(500).json({message:"project could not be created"})
        })
})
//GET a list of projects
router.get('/', (req, res) => {
    db.get()
        .then(projects =>{
            console.log(`201`, projects)
            res.status(201).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "there was an error getting projects"})
        })
})
//Update a project
router.put('/:id', validatePost, (req, res) => {
    const changes = req.body
    const {id} = req.params

    db.update(id, changes)
        .then(updated => {
            res.status(200).json({message: "The project has been updated"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "project could not be updated"})
        })
})
//Remove a project
router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(project => {
            res.status(204).json({message: "Project was successfully deleted"})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Project could not be deleted"})
        })
})

//get all actions for a project
router.get('/:id', (req, res) => {

    db.getProjectActions(req.params.id)
        .then(actions => {
            res.status(201).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "could not get actions"})
        })
})

//MIDDLEWARE
//Validate project


//Validate post
function validatePost(req, res, next){
    const body = req.body;
    const name = req.body.name;
    const description = req.body.description;

    if(!body){
        res.status(400).json({message: "missing post data"})
    } else if (!name || !description){
        res.status(400).json({message: "missing a required field"})
    }else{
        next()
    }

}


module.exports = router;