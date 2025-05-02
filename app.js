const projects = [];

// Show the Add Project form
function showAddProjectForm() {
    document.getElementById('add-project-form').classList.remove('hidden');
}

// Add a new project
function addProject() {
    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const newProject = { name, description, tasks: [] };
    
    projects.push(newProject);
    displayProjects();
    document.getElementById('add-project-form').classList.add('hidden');
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
}

// Display all projects
function displayProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <button onclick="showTasks(${index})">View Tasks</button>
            <button onclick="deleteProject(${index})">Delete Project</button>
        `;
        projectsList.appendChild(projectElement);
    });
}

// Delete a project
function deleteProject(index) {
    projects.splice(index, 1);
    displayProjects();
}

// Show tasks for a project
function showTasks(projectIndex) {
    alert(`Show tasks for project: ${projects[projectIndex].name}`);
}

displayProjects();
