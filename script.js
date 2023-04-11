
// utilisation de set pour stocker les projets de differentes catégorie
const allProject = new Set();
const objProject = new Set();
const aptProject = new Set();
const hotProject = new Set();
//recuperation des donnés de l API 
async function getAllProject() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response.error);
    }
}
// fonction pour trié les projets
function sortProject(projects) {
    for (const project of projects) {
        allProject.add(project);
        switch (project.categoryId) {
            case 1:
                objProject.add(project);
                break;
            case 2:
                aptProject.add(project);
                break;
            case 3:
                hotProject.add(project);
                break;
            default:
                console.log(project.categoryId);
                break;
        }
    }
}
// création des boutons filtres
function createFilterButtons() {
    const buttonContainer = document.getElementById("button-container");
    const categories = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

    categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.dataset.filter = index; 
        button.addEventListener("click", onFilterButtonClick);
        buttonContainer.appendChild(button);
    });
}
// boutonclique appellle la fonction sortgallery
function onFilterButtonClick(event) {
    const filter = event.target.dataset.filter;
    sortGallery(filter);
}
//fonction pour afficher les images
function displayProjects(projects) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // Clear the gallery

    for (const project of projects) {
        const imageElement = document.createElement("img");
        imageElement.src = project.imageUrl;
        imageElement.alt = project.title;
        gallery.appendChild(imageElement);
    }
}
//affichage des prjets par categorie
function sortGallery(sortType) {
    switch (sortType) {
        case "1":
            displayProjects(objProject);
            break;
        case "2":
            displayProjects(aptProject);
            break;
        case "3":
            displayProjects(hotProject);
            break;
        default:
            displayProjects(allProject);
            break;
    }
}
//recuperation de tous les projets
async function displayGallery() {
    const projects = await getAllProject();
    sortProject(projects);

    // Afficher les boutons de filtre
    createFilterButtons();

    // Afficher tous les projets
    displayProjects(allProject);
}
//lancement du processus 
displayGallery();