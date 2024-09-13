const express = require("express");
const router = require("./routes/userRoute");
const app = express();
const port = 3000;

// middware
app.use(express.json());

// Routes
app.use("/api/v1", router);

// Listening for requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
