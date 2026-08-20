const chatFile = document.getElementById("chatFile");
const chatContainer = document.getElementById("chatContainer");

const nameSelection = document.getElementById("nameSelection");
const myNameSelect = document.getElementById("myName");
const openChatButton = document.getElementById("openChat");

let chatLines = [];

chatFile.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const chatText = event.target.result;

        chatLines = chatText.split(/\r?\n/);

        findSenders(chatLines);
    };

    reader.readAsText(file);
});


function findSenders(lines) {

    const senders = new Set();

    lines.forEach(line => {

        const match = line.match(
            /^\d{1,2}\/\d{1,2}\/\d{2,4},?\s+\d{1,2}:\d{2}(?:\u202f?[APap][Mm])?\s*[-–]\s*(.*?):\s/
        );

        if (match) {
            senders.add(match[1]);
        }
    });

    myNameSelect.innerHTML = "";

    senders.forEach(sender => {

        const option = document.createElement("option");

        option.value = sender;
        option.textContent = sender;

        myNameSelect.appendChild(option);
    });

    nameSelection.style.display = "block";
}


openChatButton.addEventListener("click", function () {

    const myName = myNameSelect.value;

    displayChat(chatLines, myName);
});


function displayChat(lines, myName) {

    chatContainer.innerHTML = "";

    lines.forEach(line => {

        const match = line.match(
            /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?:\u202f?[APap][Mm])?)\s*[-–]\s*(.*?):\s(.*)$/
        );

        if (!match) return;

        const date = match[1];
        const time = match[2];
        const sender = match[3];
        const message = match[4];

        const messageDiv = document.createElement("div");

        messageDiv.className =
            sender === myName
                ? "message sent"
                : "message received";

        messageDiv.innerHTML = `
            <div class="sender">${sender}</div>
            <div class="text">${message}</div>
            <div class="time">${time}</div>
        `;

        chatContainer.appendChild(messageDiv);
    });
}
