// Selección de elementos
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const stateImage = document.getElementById('state-image');
const stateText = document.getElementById('state-text');

// Función para mostrar mensaje de notificación
function showMessage(message) {
  const notification = document.createElement('p');
  notification.textContent = message;
  notification.style.color = 'brown';
  taskList.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

// Función para actualizar la imagen y el texto según la cantidad de tareas
function updateStateImage() {
  const taskCount = taskList.children.length;

  if (taskCount === 0) {
    stateImage.src = 'images/resting.webp';
    stateImage.alt = 'Personaje descansando';
    stateText.textContent = 'Nada que hacer por ahora...';
  } else if (taskCount <= 3) {
    stateImage.src = 'images/standing.webp';
    stateImage.alt = 'Personaje de pie, relajado';
    stateText.textContent = 'Atento! Nos preparamos!';
  } else if (taskCount <= 6) {
    stateImage.src = 'images/focused.webp';
    stateImage.alt = 'Personaje concentrado';
    stateText.textContent = 'Vamos! Concentración';
  } else {
    stateImage.src = 'images/angry.webp';
    stateImage.alt = 'Personaje enojado';
    stateText.textContent = 'Ahhhhgg me lleva la...';
  }

  // Añadir animación de escala
  stateImage.classList.add('animated');
  setTimeout(() => stateImage.classList.remove('animated'), 300);
}

// Función para agregar una nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();

  if (!taskText) {
    showMessage("Escribe una tarea.");
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    updateStateImage();
  });

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
  taskInput.value = '';

  updateStateImage();  // Actualizar la imagen y texto después de añadir una tarea
}

// Eventos
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Inicializar con imagen de descanso y texto
updateStateImage();
