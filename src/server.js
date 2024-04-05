const express = require("express");
const viewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
require("dotenv").config("");
const app = express();
const port = process.env.PORT || 8080;

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
viewEngine(app);

//routes
app.use("/", webRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
