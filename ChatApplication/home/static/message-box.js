
const roomName = JSON.parse(document.getElementById('json-roomname').textContent);
const userName = JSON.parse(document.getElementById('json-username').textContent);
console.log(userName);
const chatSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + roomName
    + '/'
);

chatSocket.onclose = function(e) {
    console.log('onclose')
}

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);

    if (data.message) {
        console.log(data.username);
        document.querySelector('#chat-messages').innerHTML += ('<div class="sender-msg-box"'+' <p class="username">'+data.username+'</p>'+' <p class="message">'+ data.message +'</p></div>');
                                                        
    } 
    else {
        alert('The message was empty!')
    }

    scrollToBottom();
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) {
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    e.preventDefault()

    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;

    console.log({
        'message': message,
        'username': userName,
        'room': roomName
    })

    chatSocket.send(JSON.stringify({
        'message': message,
        'username': userName,
        'room': roomName
    }));

    messageInputDom.value = '';

    return false
};

/**
* A function for finding the messages element, and scroll to the bottom of it.
*/
function scrollToBottom() {
    let objDiv = document.getElementById("chat-messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

// Add this below the function to trigger the scroll on load.
scrollToBottom();



// JS functionalites

const searchInputElement = document.getElementById('search-input');
const roomsElement = document.querySelector('.rooms');
const suggestionsBox = document.getElementById('search-suggestions');

searchInputElement.addEventListener('input', () => {
    const searchTerm = searchInputElement.value.toLowerCase();
    const roomAnchors = roomsElement.querySelectorAll('a');
    const suggestions = [];

    roomAnchors.forEach(anchor => {
        const roomName = anchor.textContent.toLowerCase();
        if (roomName.includes(searchTerm)) {
            suggestions.push(`<a href="${anchor.href}">${anchor.textContent}</a>`);
        }
    });

    displaySuggestions(suggestions);
});

function displaySuggestions(suggestions) {
    if (suggestions.length > 0) {
        suggestionsBox.innerHTML = suggestions.join('');
        suggestionsBox.classList.remove('hidden');
        roomsElement.style.display = 'none'; // Hide rooms div
    } else {
        hideSuggestions();
    }
}

function hideSuggestions() {
    suggestionsBox.classList.add('hidden');
    roomsElement.style.display = 'flex'; // Show rooms div
}

searchInputElement.addEventListener('blur', () => {
    if (!searchInputElement.value.trim()) {
        hideSuggestions();
    }
});
