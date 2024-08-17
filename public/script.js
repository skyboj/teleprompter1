// script.js
const ws = new WebSocket(`wss://${window.location.host}`);

ws.onopen = () => {
  console.log('WebSocket connection opened');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

const editor = document.getElementById('editor');

editor.addEventListener('input', () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(editor.value);
  } else {
    console.error('WebSocket connection is not open');
  }
});

ws.onmessage = (event) => {
  if (typeof event.data === 'string') {
    editor.value = event.data;
  } else {
    console.error('Received non-string data');
  }
};
