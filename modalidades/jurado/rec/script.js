let mediaRecorder;
let recordedChunks = [];
let downloadLink;

async function toggleRecording() {
  const startButton = document.getElementById('start-button');
  const downloadButton = document.getElementById('download-button');
  const videoContainer = document.getElementById('video-container');

  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    // Iniciar la grabación
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedChunks = [];

      // Crear un enlace de descarga y configurar el objeto Blob
      downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'grabacion.webm';

      // Mostrar el botón de descarga después de detener la grabación
      downloadButton.style.display = 'block';
    };

    // Configurar el botón para iniciar la grabación
    startButton.textContent = 'Detener grabación';
    startButton.style.backgroundColor = '#e74c3c'; // Cambiar color para indicar que está grabando

    // Ocultar el botón de descarga al inicio
    downloadButton.style.display = 'none';

    // Mostrar la pantalla de la cámara en el centro
    videoContainer.innerHTML = ''; // Limpiar contenido previo
    const videoElement = document.createElement('video');
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoContainer.appendChild(videoElement);

    // Ajustar el tamaño del contenedor
    videoContainer.style.width = '100%';
    videoContainer.style.height = 'auto';
    videoContainer.style.position = 'fixed';
    videoContainer.style.top = '52%';
    videoContainer.style.left = '80%';
    videoContainer.style.transform = 'translate(-50%, -50%)';

    // Iniciar la grabación
    mediaRecorder.start();
  } else {
    // Detener la grabación
    mediaRecorder.stop();
    startButton.textContent = 'Iniciar grabación';
    startButton.style.backgroundColor = '#3498db'; // Restaurar color original
  }
}

function downloadRecording() {
  // Descargar la grabación
  downloadLink.click();
}
