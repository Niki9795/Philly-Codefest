const express = require('express')
const app = express()

app.get("/message", (req, res) => {
    res.json({ message: "Hello from nodeJS!" });
  });

app.listen(8000, () => {console.log("Server started on port 8000")})
