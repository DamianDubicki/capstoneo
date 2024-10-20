// When upload button is clicked, open the file picker dialog.
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('imageInput').click();
});

// Event listener for image input
document.getElementById('imageInput').addEventListener('change', (event) => {
    const reader = new FileReader();

    // Read the selected file as a Data URL
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
        // Display selected image on screen
        document.getElementById('selectedImage').src = reader.result;
        document.getElementById('selectedImage').style.display = 'block';
        // Call uploadImage function
        uploadImage(event.target.files[0]);
    };
});

async function uploadImage(file) {
    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    // Create FormData object to hold the file data
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send POST request to the '/predict' endpoint
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        // Parse the JSON response
        const data = await response.json();

        // Display the prediction details
        document.getElementById('artwork').textContent = `Artwork: ${data.artwork}`;
        document.getElementById('artist').textContent = `Artist: ${data.artist}`;
        document.getElementById('date').textContent = `Date: ${data.date}`;
        document.getElementById('style').textContent = `Style: ${data.style}`;
        document.getElementById('prediction').style.display = 'block';

    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        // Hide loading spinner
        document.getElementById('loading').style.display = 'none';
    }
}
