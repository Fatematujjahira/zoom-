const msgForm = document.getElementById('msgForm');
msgForm.hidden = true;
const nameForm = document.getElementById('nameForm');
const ul_msg = document.getElementById('messages');

// var socket = io();

socket.on('received-msg', (msg, name) => {
  displayMsg(msg, name);
});

socket.on('getName', () => {
  nameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameForm[0].value;
    if (!name) return;
    socket.emit('setName', name, () => {
      msgForm.hidden = false;
      nameForm.hidden = true;
    });
  });
});

msgForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = msgForm[0].value;
  if (!msg) return;
  socket.emit('new-msg', msg, () => {
    displayMsg(msg, 'You');
    msgForm[0].value = '';
  });
});

function displayMsg(msg, name) {
  const li = document.createElement('li');
  li.textContent = name + ': ' + msg;
  ul_msg.appendChild(li);
}
