const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${text}</p>`;
    userInput.value = "";

    try {
        const res = await fetch("http://localhost:5000/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: "12345", text })  // Replace with actual user ID
        });
        const data = await res.json();
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.botMessage}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error sending message:", error);
    }
}
