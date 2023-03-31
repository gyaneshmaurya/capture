const firebaseConfig = {
    apiKey: "AIzaSyCUJWIsj4vD7cFPqXDslLkkluKcdMWB2aM",
    authDomain: "captureimg-919cc.firebaseapp.com",
    projectId: "captureimg-919cc",
    storageBucket: "captureimg-919cc.appspot.com",
    messagingSenderId: "1053470437967",
    appId: "1:1053470437967:web:95d380f9033e295b17303a"
};

firebase.initializeApp(firebaseConfig);

// Get references to DOM elements
const captureButton = document.getElementById("capture");
const canvas = document.getElementById("canvas");

// Add event listener to capture button
captureButton.addEventListener("click", () => {
  // Get video stream from camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      // Create video element and attach stream
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      // Draw video stream to canvas
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to data URL
      const dataURL = canvas.toDataURL("image/png");

      // Upload image to Firebase Storage
      const storageRef = firebase.storage().ref();
      const imagesRef = storageRef.child("images");
      const imageName = new Date().getTime() + ".png";
      const imageRef = imagesRef.child(imageName);
      imageRef.putString(dataURL, "data_url")
        .then(() => {
          console.log("Image uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });

      // Stop video stream
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    })
    .catch((error) => {
      console.error("Error accessing camera: ", error);
    });
});

