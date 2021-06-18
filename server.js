const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
// ?Initialization of Express
const app = express();

// ?Connection to the DB
connectDB();

// ?Initializing Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve Static assets in Production environment
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
