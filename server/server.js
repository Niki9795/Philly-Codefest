const express = require('express')
const cors = require('cors');
require("./db.js")

const app = express()
const User = require("./db.js")

app.use(express.json());
app.use(cors());

const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  res.send(result);
})

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
  if (user) {
    res.send(user);
  } else {
    res.send({result:"No User Found"})
  }
} else {
  res.send({result:"No User Found"})
}
})

app.get("/location", async (req, res) => {
  // Fetch user data from the database
  const user = await User.findOne({}); // Add a condition here if needed

  if (!user || !user.location) {
    res.status(404).send({ error: "No user or location found" });
    return;
  }

  const { longitude, latitude } = user.location;
    res.send({ longitude, latitude });
});

app.get("/markers", async (req, res) => {
  // Fetch user data from the database
  const user = await User.findOne({}); // Add a condition here if needed

  if (!user || !user.markers) {
    res.status(404).send({ error: "No user or markers found" });
    return;
  }

  // Map the markers array to an array of objects with locationName, longitude, and latitude properties
  const markers = user.markers.map(([locationName, longitude, latitude]) => ({
    locationName,
    longitude,
    latitude
  }));

  // Send the markers array as a response
  res.send(markers);
});



// Define the endpoint URL
//const endpointUrl = 'https://r30htuioc6.execute-api.us-east-1.amazonaws.com/dev';
// Define the function to upload the audio file
/*sync function uploadAudio(audioFile) {
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
}*/

// Define the route to handle the audio file upload
/*app.post('/uploadwav', upload.single('audio'), async (req, res) => {
    try {
        // Read the uploaded audio file
        console.log("AUDIO API CALLED");
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
});*/
// Define the route to handle the audio file upload
const path = require('path');
const uploadDirectory = '../input/';
app.post('/uploadwav', upload.single('audio'), async (req, res) => {
  try {
    // Read the uploaded audio file
    console.log("AUDIO API CALLED");
    const audioFile = fs.readFileSync(req.file.path);

    // Set the unique filename to "input"
    const uniqueFilename = "input.wav";

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // Generate the file path
    const filePath = path.join(uploadDirectory, uniqueFilename);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      // If it exists, delete the existing file
      fs.unlinkSync(filePath);
    }

    // Save the audio file
    fs.writeFileSync(filePath, audioFile);

    // Send a success response
    res.send({ message: 'Audio file uploaded successfully', filePath });

  } catch (error) {
    console.error(error);
    // Handle the error
    res.status(500).send('Internal Server Error');
  }
});

const outputDirectory = '../output/';

app.get('/detect', async (req, res) => {
  const outputFilePath = `${outputDirectory}output.json`;

  // Check if the output.json file exists
  fs.access(outputFilePath, fs.constants.F_OK, async (err) => {
    if (err) {
      // If the file doesn't exist, send a response indicating no data
      res.send({ data: null });
    } else {
      // If the file exists, read its content
      fs.readFile(outputFilePath, 'utf8', async (err, data) => {
        if (err) {
          console.error('Error reading output.json:', err);
          res.status(500).send('Internal Server Error');
        } else {
          try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Fetch the user from the database
            const user = await User.findOne({}); // Add a condition here if needed

            if (user) {
              // Increment the count field
              user.count += 1;
              user.cause = jsonData.class;
              // Save the user back to the database
              await user.save();
            }

            // Delete the output.json file
            fs.unlink(outputFilePath, (err) => {
              if (err) {
                console.error('Error deleting output.json:', err);
              }
            });

            // Send the JSON data as a response
            res.send({ data: jsonData });
          } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
          }
        }
      });
    }
  });
});

app.get("/alerts", async (req, res) => {
  // Fetch user data from the database
  const user = await User.findOne({}, 'location markers cause date count');

  if (!user) {
    res.status(404).send({ error: "No user found" });
    return;
  }

  // Send the specific user data as a response
  res.send({
    location: user.location,
    cause: user.cause,
    date: user.date,
    count: user.count
  });
});

// app.get('/detect', (req, res) => {
//   const outputFilePath = `${outputDirectory}output.json`;

//   // Check if the output.json file exists
//   fs.access(outputFilePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       // If the file doesn't exist, send a response indicating no data
//       res.send({ data: null });
//     } else {
//       // If the file exists, read its content
//       fs.readFile(outputFilePath, 'utf8', (err, data) => {
//         if (err) {
//           console.error('Error reading output.json:', err);
//           res.status(500).send('Internal Server Error');
//         } else {
//           try {
//             // Parse the JSON data
//             const jsonData = JSON.parse(data);

//             // Delete the output.json file
//             fs.unlink(outputFilePath, (err) => {
//               if (err) {
//                 console.error('Error deleting output.json:', err);
//               }
//             });

//             // Send the JSON data as a response
//             res.send({ data: jsonData });
//           } catch (error) {
//             console.error('Error parsing JSON:', error);
//             res.status(500).send('Internal Server Error');
//           }
//         }
//       });
//     }
//   });
// });

app.listen(8000, () => {console.log("Server started on port 8000")})
