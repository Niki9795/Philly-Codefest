const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Define the endpoint URL
const endpointUrl = 'https://your-sagemaker-endpoint-url/uploadwav';

// Define the function to upload the audio file
async function uploadAudio(audioFile) {
    try {
        // Make a POST request to the endpoint with the audio file
        const response = await axios.post(endpointUrl, audioFile, {
            headers: {
                'Content-Type': 'audio/wav'
            }
        });

        // Handle the response
        console.log(response.data);
        // Do something with the response data

        return response.data;

    } catch (error) {
        console.error(error);
        // Handle the error
        throw error;
    }
}

// Define the route to handle the audio file upload
app.post('/uploadwav', upload.single('audio'), async (req, res) => {
    try {
        // Read the uploaded audio file
        const audioFile = fs.readFileSync(req.file.path);

        // Upload the audio file to the SageMaker endpoint
        const response = await uploadAudio(audioFile);

        // Pass the response to the output for /uploadwav
        res.send(response);

    } catch (error) {
        console.error(error);
        // Handle the error
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});