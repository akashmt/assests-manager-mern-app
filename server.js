const express = require("express");
const connect = require("./connect");
require("dotenv").config();
const categoriesRoutes = require("./routes/categories");
const locationsRoutes = require("./routes/locations");
const assetsRoutes = require("./routes/assets");
const usersRoutes = require("./routes/users");
const { propfind } = require("./routes/categories");

const app = express();

const port = process.env.PORT || 5000;

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


app.use(express.static('client/build'));


const listen = async () => {
  const conn = await connect(process.env.MONGODB_URI);
  if (conn) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
};

listen();
