import Misc from './misc';
import ProjectForm from './addProjectForm';

const addTodoButton = document.getElementById('todo-activate');
const deleteProjectButton = document.getElementById('remove-project-button');
const sortLabel = document.getElementById('sort-label');
const projectName = document.getElementById('project-name');

const addProjectButton = document.getElementById('project-add-button');

const menuToggle = document.getElementById('menu-toggle');
const menuWrapper = document.getElementById('project-container');
const menuBackground = document.getElementById('sidebar-mobile-background');

const mobileMediaQuery = window.matchMedia('(max-width: 760px)');
mobileMediaQuery.addEventListener('change', handleMediaChange);

function handleMediaChange(event) {
  const isMobile = event.matches;
  if (isMobile) {
    addTodoButton.textContent = '+';
    deleteProjectButton.textContent = 'X';
    sortLabel.classList.remove('active');
    projectName.classList.remove('active');
  } else {
    addTodoButton.textContent = 'Add Todo';
    deleteProjectButton.textContent = 'Delete Project';
    sortLabel.classList.add('active');
    projectName.classList.add('active');
  }
  removeMenu();

  if (!ProjectForm.checkActive()) {
    Misc.bodyRemoveModal();
  }
}

handleMediaChange(mobileMediaQuery);

menuToggle.addEventListener('click', toggleMenu);

function toggleMenu() {
  menuWrapper.classList.toggle('active-mobile');
  menuBackground.classList.toggle('active');

  Misc.bodyToggleModal();
}

function removeMenu() {
  menuWrapper.classList.remove('active-mobile');
  menuBackground.classList.remove('active');
}

menuBackground.addEventListener('click', removeMenu);
menuWrapper.addEventListener('click', handleProjectClick);

function handleProjectClick(event) {
  const { target } = event;
  const targetName = target.nodeName;

  if (targetName === 'BUTTON') {
    removeMenu();
  }

  if (target !== addProjectButton) {
    Misc.bodyRemoveModal();
  }
}

export default {};
