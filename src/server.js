const express = require("express");
const fileUpload = require('express-fileupload');
const viewEngine = require("./config/viewEngine");
const connection = require("./config/database");
const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
require("dotenv").config("");
const app = express();
const port = process.env.PORT || 8080;


//config file upload 
app.use(fileUpload());


//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
viewEngine(app);

//routes
app.use("/", webRoutes);
app.use("/v1/api", apiRoutes);

(async () => {
  //test connection
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Backend app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>> Error check connection:", error);
  }
})();
