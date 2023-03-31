const firebaseConfig = {
    apiKey: "AIzaSyCUJWIsj4vD7cFPqXDslLkkluKcdMWB2aM",
    authDomain: "captureimg-919cc.firebaseapp.com",
    projectId: "captureimg-919cc",
    storageBucket: "captureimg-919cc.appspot.com",
    messagingSenderId: "1053470437967",
    appId: "1:1053470437967:web:95d380f9033e295b17303a"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error(error);
    });

captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');

    const imageName = new Date().getTime() + '.jpg';
    const storageRef = storage.ref('images/' + imageName);
    const uploadTask = storageRef.putString(dataUrl, 'data_url');
});
