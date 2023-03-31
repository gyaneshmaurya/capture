// Get references to DOM elements
const video = document.getElementById("video");

// Get user media from camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    // Set video source to stream
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing camera: ", error);
  });
