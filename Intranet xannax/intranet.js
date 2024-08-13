
// Navegación dinámica
document.querySelectorAll('.navbar a, .sidebar a').forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
const targetId = e.target.getAttribute('href').substring(1);
document.querySelectorAll('.content').forEach(section => {
    section.style.display = 'none';
});
document.getElementById(targetId).style.display = 'block';
});
});

// Agregar un manejador de eventos para el formulario si se usa en lugar de un botón
document.getElementById('chat-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});


// Carga y visualización de archivos
function uploadFile() {
const fileInput = document.getElementById('file-upload');
const file = fileInput.files[0];
if (file) {
const fileList = document.getElementById('file-list');
fileList.innerHTML += `<li>${file.name}</li>`;
fileInput.value = '';
}
}

// Temporizador para tareas
function submitTask(event) {
event.preventDefault();
const title = document.getElementById('task-title').value;
const deadline = new Date(document.getElementById('task-deadline').value);
startTaskTimer(title, deadline);
return false;
}

function startTaskTimer(title, deadline) {
const timerElement = document.getElementById('task-timer');
const updateTimer = () => {
const now = new Date();
const timeLeft = deadline - now;
if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    timerElement.textContent = `Tiempo restante para "${title}": ${days}d ${hours}h ${minutes}m`;
} else {
    timerElement.textContent = `¡El plazo para "${title}" ha expirado!`;
    clearInterval(timerInterval);
}
};
updateTimer();
const timerInterval = setInterval(updateTimer, 60000); // Actualizar cada minuto
}

// Buscador de recursos
document.addEventListener('DOMContentLoaded', () => {
    // Cargar recursos al inicio (si hay algún recurso preexistente)
    loadResources();

    // Manejo de búsqueda
    document.getElementById('search-box').addEventListener('input', searchResources);
});

function publishResource(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const title = document.getElementById('resource-title').value.trim();
    const description = document.getElementById('resource-description').value.trim();
    const fileInput = document.getElementById('resource-file');
    const file = fileInput.files[0];

    if (title && description && file) {
        // Aquí se podrían guardar los recursos en una base de datos
        // Para esta demostración, simplemente los agregamos a la lista

        const resourceList = document.getElementById('resource-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${URL.createObjectURL(file)}" download="${file.name}">Descargar archivo</a>
        `;
        resourceList.appendChild(listItem);

        // Limpiar el formulario
        document.querySelector('.resource-form').reset();
    }
}

function searchResources() {
    const query = document.getElementById('search-box').value.toLowerCase();
    const resourceList = document.getElementById('resource-list');
    const items = resourceList.getElementsByTagName('li');

    Array.from(items).forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function loadResources() {
    // Cargar recursos de una base de datos o almacenamiento local
    // Ejemplo de recursos preexistentes (simulados)
    const resources = [
        { title: 'matematica', description: 'funciones lineales', file: 'https://www.matematicasonline.es/pdf/ejercicios/3_ESO/Ejercicios%20de%20Funcion%20Lineal.pdf' },
       
    ];

    const resourceList = document.getElementById('resource-list');
    resources.forEach(resource => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.file}" download>${resource.file}</a>
        `;
        resourceList.appendChild(listItem);
    });
}


// Inicialización
updateResourceList('');









//para desplegar el curso

function toggleContent(button) {
    var content = button.previousElementSibling;

    if (content.classList.contains('show')) {
        content.classList.remove('show');
        button.textContent = "Ver Detalles";
    } else {
        content.classList.add('show');
        button.textContent = "Ocultar Detalles";
    }
}


//archivos-----------------

function uploadFile() {
    var fileInput = document.getElementById('file-upload');
    var fileList = document.getElementById('file-list');
    
    var files = fileInput.files;
    if (files.length === 0) {
        alert('Por favor, selecciona un archivo para subir.');
        return;
    }

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        
        // Crear un elemento de lista para el archivo
        var listItem = document.createElement('li');
        listItem.textContent = file.name;
        fileList.appendChild(listItem);

        // Limpiar el input de archivo
        fileInput.value = '';
    }
}


//perfil.................................................

function editProfile() {
    document.querySelector('.profile-display').style.display = 'none';
    document.querySelector('.profile-edit').style.display = 'block';
}

function cancelEdit() {
    document.querySelector('.profile-display').style.display = 'flex';
    document.querySelector('.profile-edit').style.display = 'none';
}

//video llamada 

// Obtén referencias a los elementos de video
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const startCallButton = document.getElementById('start-call');
const endCallButton = document.getElementById('end-call');

// Variables para manejar la conexión
let localStream;
let peerConnection;
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// Configura la llamada
startCallButton.addEventListener('click', async () => {
    // Obtén el video local
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        // Configura la conexión con el remoto
        peerConnection = new RTCPeerConnection(configuration);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        
        // Manejo de la conexión remota y el intercambio de señales aquí (simplificado)
        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };

        // Código para manejar la señalización (oferta, respuesta, ICE candidates) aquí

    } catch (error) {
        console.error('Error al acceder a la cámara o micrófono:', error);
    }
});

// Termina la llamada
endCallButton.addEventListener('click', () => {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localVideo.srcObject = null;
    }
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    remoteVideo.srcObject = null;
});

//grupos

document.addEventListener('DOMContentLoaded', () => {
    // Cargar grupos al inicio (si hay grupos preexistentes)
    loadGroups();
});

function createGroup(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const name = document.getElementById('group-name').value.trim();
    const description = document.getElementById('group-description').value.trim();

    if (name && description) {
        // Crear un nuevo grupo
        const newGroup = document.createElement('li');
        newGroup.innerHTML = `
            <h4>${name}</h4>
            <p>${description}</p>
            <button onclick="editGroup(this)">Editar</button>
            <button onclick="deleteGroup(this)">Eliminar</button>
        `;

        // Añadir el nuevo grupo a la lista
        const groupList = document.getElementById('group-list');
        groupList.appendChild(newGroup);

        // Limpiar el formulario
        document.getElementById('create-group-form').reset();
    }
}

function editGroup(button) {
    const groupItem = button.parentElement;
    const name = prompt('Nuevo nombre del grupo:', groupItem.querySelector('h4').textContent);
    const description = prompt('Nueva descripción del grupo:', groupItem.querySelector('p').textContent);

    if (name && description) {
        groupItem.querySelector('h4').textContent = name;
        groupItem.querySelector('p').textContent = description;
    }
}

function deleteGroup(button) {
    if (confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
        const groupItem = button.parentElement;
        groupItem.remove();
    }
}

function loadGroups() {
    // Cargar grupos desde una base de datos o almacenamiento local
    // Ejemplo de grupos preexistentes (simulados)
    const groups = [
        { name: 'Grupo 1', description: 'Descripción del grupo 1' },
        { name: 'Grupo 2', description: 'Descripción del grupo 2' }
    ];

    const groupList = document.getElementById('group-list');
    groups.forEach(group => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h4>${group.name}</h4>
            <p>${group.description}</p>
            <button onclick="editGroup(this)">Editar</button>
            <button onclick="deleteGroup(this)">Eliminar</button>
        `;
        groupList.appendChild(listItem);
    });
}
