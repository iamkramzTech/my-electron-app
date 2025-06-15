const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${window.api.versions.chrome()}), Node.js (v${window.api.versions.node()}), and Electron (v${window.api.versions.electron()})`;

window.api.send('toMain', 'hello from renderer');

window.api.receive('fromMain', (data) => {
    console.log('Received:', data);
});