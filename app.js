// Initialize Firebase app
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
  const video = document.getElementById("video");
  const captureBtn = document.getElementById("capture-btn");
  
  // Get user media from camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      // Set video source to stream
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing camera: ", error);
    });
  
  // Initialize Firebase storage
  const storage = firebase.storage();
  const storageRef = storage.ref();
  
  // Add event listener to capture button
  captureBtn.addEventListener("click", () => {
    // Create canvas element to capture image
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Convert canvas image to data URL
    const dataURL = canvas.toDataURL();
  
    // Upload image to Firebase storage
    const imageName = Date.now().toString();
    const imageRef = storageRef.child(`images/${imageName}.png`);
    imageRef.putString(dataURL, "data_url")
      .then(() => {
        console.log("Image uploaded to Firebase storage.");
      })
      .catch((error) => {
        console.error("Error uploading image to Firebase storage: ", error);
      });
  });
  
