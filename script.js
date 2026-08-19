const chatFile = document.getElementById("chatFile");

chatFile.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const chatText = event.target.result;

        console.log(chatText);
        alert("Chat file loaded successfully!");
    };

    reader.readAsText(file);
});
