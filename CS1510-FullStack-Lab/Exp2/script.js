'use strict';
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  input.value = '';
  input.focus();
  window.setTimeout(() => addMessage(getBotReply(message), 'bot'), 500);
});

function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${sender}`;
  messageElement.textContent = text;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(userMessage) {
  const normalized = userMessage.toLowerCase();
  if (normalized.includes('hello')) return 'Hi there! How can I help you?';
  if (normalized.includes('help me learn html')) return 'Yeah sure! Start with HTML elements, headings, paragraphs, links, and forms.';
  if (normalized.includes('bye')) return 'Happy Learning! See you again.';
  return `You said: ${userMessage}`;
}
