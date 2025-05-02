const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS

let projects = [];

// Read projects from file
fs.readFile('projects.json', (err, data) => {
    if (err) {
        console.log('Error reading file, starting with an empty project list');
    } else {
        projects = JSON.parse(data);
    }
});

// Endpoint to get all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// Endpoint to create a new project
app.post('/api/projects', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description, tasks: [] };
    projects.push(newProject);
    fs.writeFileSync('projects.json', JSON.stringify(projects));
    res.status(201).json(newProject);
});

// Endpoint to delete a project
app.delete('/api/projects/:index', (req, res) => {
    const { index } = req.params;
    projects.splice(index, 1);
    fs.writeFileSync('projects.json', JSON.stringify(projects));
    res.status(200).send('Project deleted');
});

app.listen(port, () => {
    console.log(`Project management app is running at http://localhost:${port}`);
});
