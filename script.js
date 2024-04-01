document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const messageBox = document.getElementById("message-box");
    const hiddenMessages = document.getElementById("hidden-messages");
    const clearButton = document.getElementById("clear-btn");

    // Load messages from local storage when the page loads
    loadMessages();

    sendButton.addEventListener("click", function() {
        const message = messageInput.value.trim();
        if (message !== "") {
            displayMessage(message);
            saveMessage(message); // Save message to local storage
            messageInput.value = "";
        }
    });

    // Event delegation to handle delete button clicks
    messageBox.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const messageElement = event.target.parentElement;
            deleteMessage(messageElement);
        }
    });

    // Clear all messages from local storage and reload page
    clearButton.addEventListener("click", function() {
        localStorage.clear(); // Remove all items from local storage
        location.reload(); // Reload the page
    });

    function displayMessage(message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        
        // Message text
        const messageText = document.createElement("span");
        messageText.textContent = message;
        messageElement.appendChild(messageText);
        
        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        messageElement.appendChild(deleteButton);
        
        messageBox.appendChild(messageElement);
        
        // Store message in hidden div
        const hiddenMessage = document.createElement("div");
        hiddenMessage.textContent = message;
        hiddenMessages.appendChild(hiddenMessage);
    }

    function saveMessage(message) {
        // Check if messages array exists in local storage
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
    }

    function loadMessages() {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.forEach(function(message) {
            displayMessage(message);
        });
    }

    function deleteMessage(messageElement) {
        const message = messageElement.querySelector("span").textContent;
        messageElement.remove();
        removeMessageFromStorage(message);
    }

    function removeMessageFromStorage(message) {
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        const index = messages.indexOf(message);
        if (index !== -1) {
            messages.splice(index, 1);
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }
});






function fetchMessages() {
    fetch('server.php')
    .then(response => response.text())
    .then(messages => {
        document.getElementById('message-box').innerHTML = messages;
    });
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message !== "") {
        // Send message to server (not implemented in this example)
        // Here you would send the message to the server for processing/storage
        // For simplicity, we're just displaying the message on the client side
        displayMessage(message);
        messageInput.value = ""; // Clear the text input field
    }
}

document.getElementById('send-btn').addEventListener('click', sendMessage);

document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Simulate a click event on the send button
        document.getElementById('send-btn').click();
    }
});

// Initial fetch of messages and subsequent fetches every 5 seconds
fetchMessages();
setInterval(fetchMessages, 5000); // 5 seconds
