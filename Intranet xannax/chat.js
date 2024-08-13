// Función para enviar el mensaje
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    // Verificar que el mensaje no esté vacío
    if (message) {
        const chatMessages = document.getElementById('chat-messages');

        // Crear un nuevo elemento de mensaje
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>Tú:</strong> ${message}`;

        // Añadir el mensaje al contenedor de mensajes
        chatMessages.appendChild(messageElement);

        // Limpiar el campo de entrada
        input.value = '';

        // Desplazar hacia abajo para mostrar el mensaje más reciente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Agregar un manejador de eventos para el formulario
document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    sendMessage();
});