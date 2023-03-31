// Get reference to upload form
const form = document.getElementById("uploadForm");

// Get reference to input file element
const fileInput = document.getElementById("fileInput");

// Get reference to message element
const message = document.getElementById("message");

// Listen for submit event on form
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting

  const file = fileInput.files[0]; // Get file object

  if (file) {
    // Create reference to file in Firebase storage
    const fileRef = storage.ref().child(file.name);

    // Upload file to Firebase storage
    const uploadTask = fileRef.put(file);

    // Update progress bar while uploading
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        message.innerHTML = `Uploading... ${progress.toFixed(0)}%`;
      },
      (error) => {
        console.error(error);
        message.innerHTML = "Error uploading file.";
      },
      () => {
        // Upload successful
        message.innerHTML = "File uploaded successfully.";
      }
    );
  }
});
