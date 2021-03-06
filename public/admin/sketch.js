function setup() {
  noCanvas();
  loadSession();
}

async function loadSession() {
  const socket = io();
  const response = await fetch('/session');
  const session = await response.json();
  const inputs = [];
  // extra spot for when we are done

  session.presenters.push('💖');
  for (let i = 0; i < session.presenters.length; i++) {
    const name = session.presenters[i];
    const presenterDiv = createDiv('');
    createSpan(`${i + 1}: `).parent(presenterDiv);
    inputs[i] = createInput(name).parent(presenterDiv);
    const start = createButton('start')
      .parent(presenterDiv)
      .mousePressed(() => {
        socket.emit('new presenter', {
          name: inputs[i].value(),
          next: inputs[i + 1].value(),
        });
      });
  }
}
