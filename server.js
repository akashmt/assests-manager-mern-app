const express = require("express");
const connect = require("./connect");
require("dotenv").config();
const categoriesRoutes = require("./routes/categories");
const locationsRoutes = require("./routes/locations");
const assetsRoutes = require("./routes/assets");
const usersRoutes = require("./routes/users");
const { propfind } = require("./routes/categories");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the mernapp API!!");
});

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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const listen = async () => {
  const conn = await connect(process.env.MONGODB_URI);
  if (conn) {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  }
};

listen();
