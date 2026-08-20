const chatFile = document.getElementById("chatFile");
const chatContainer = document.getElementById("chatContainer");

chatFile.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const chatText = event.target.result;

        displayChat(chatText);
    };

    reader.readAsText(file);
});


function displayChat(chatText) {

    chatContainer.innerHTML = "";

    const lines = chatText.split(/\r?\n/);

    lines.forEach(line => {

        // WhatsApp chat format:
        // 20/08/2026, 10:30 - Name: Message

        const match = line.match(
            /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s?[APap][Mm])?)\s*[-–]\s*(.*?):\s([\s\S]*)$/
        );

        if (!match) return;

        const date = match[1];
        const time = match[2];
        const sender = match[3];
        const message = match[4];

        const messageDiv = document.createElement("div");
        messageDiv.className = "message";

        messageDiv.innerHTML = `
            <div class="sender">${sender}</div>
            <div class="text">${message}</div>
            <div class="time">${time}</div>
        `;

        chatContainer.appendChild(messageDiv);
    });
}
