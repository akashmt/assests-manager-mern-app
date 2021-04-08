const express = require("express");
const connect = require("./connect");
const path = require('path');
require("dotenv").config();
const categoriesRoutes = require("./routes/categories");
const locationsRoutes = require("./routes/locations");
const assetsRoutes = require("./routes/assets");
const usersRoutes = require("./routes/users");
const { propfind } = require("./routes/categories");


const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/assets", assetsRoutes);
app.use("/api/users", usersRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ error: "Server error", code: err.code, message: err.message });
});



// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const listen = async () => {
  const conn = await connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets_manager');
  if (conn) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
};

listen();
