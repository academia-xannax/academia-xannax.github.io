function sendMessage() {
    // Obtén el texto del área de texto
    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value.trim();

    // Verifica si el mensaje no está vacío
    if (messageText) {
        // Crea un nuevo mensaje
        var newMessage = document.createElement('div');
        newMessage.className = 'message-item';
        
        var messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';
        messageHeader.innerHTML = '<strong>Yo</strong> <span class="message-time">Ahora</span>';
        
        var messageBody = document.createElement('p');
        messageBody.className = 'message-body';
        messageBody.textContent = messageText;

        newMessage.appendChild(messageHeader);
        newMessage.appendChild(messageBody);

        // Agrega el nuevo mensaje a la lista de mensajes
        var messageList = document.querySelector('.message-list');
        messageList.appendChild(newMessage);

        // Limpia el área de texto
        messageInput.value = '';
        
        // Desplaza la vista hacia el final de la lista de mensajes
        messageList.scrollTop = messageList.scrollHeight;
    }
}
