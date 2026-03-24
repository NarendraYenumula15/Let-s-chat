const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function addMessage(message, sender) {

  const msg = document.createElement("div");

  msg.className = sender === "user" ? "user-msg" : "bot-msg";

  // Bold **text**
  message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert bullet points
  message = message.replace(/^\* (.*$)/gm, "• $1");

  // Convert line breaks
  message = message.replace(/\n/g, "<br>");

  msg.innerHTML = message;

  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(messageFromButton = null) {

  const message = messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  if (!messageFromButton) {
    input.value = "";
  }

  try {

    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    addMessage(data.reply, "bot");

  } catch (error) {

    addMessage("Error connecting to AI.", "bot");

  }
}

input.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    sendMessage();
  }

});