const path = require("path");

const uploadSingleFile = async (fileObject) => {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //let uploadPath = __dirname + "/public/images/" + fileObject.name;
  let uploadPath = path.resolve(__dirname, "../public/images/upload");

  //get image extension
  let extName = path.extname(fileObject.name);

  //get images name (without extension)
  let baseName = path.basename(fileObject.name, extName);

  //create final path
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server
  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (err) {
    console.log(">>>check err", err);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
};

const uploadMultipleFile = async (fileArr) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");
    let resultArr = [];
    let countSuccess = 0;
    for (var i = 0; i < fileArr.length; i++) {
      let extName = path.extname(fileArr[i].name);
      let baseName = path.basename(fileArr[i].name, extName);
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;
      try {
        await fileArr[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: fileArr[i].name,
          error: null,
        });
        countSuccess++;
      } catch (err) {
        resultArr.push({
          status: "failed",
          path: null,
          fileName: fileArr[i].name,
          error: JSON.stringify(err),
        });
      }
    }
    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = { uploadSingleFile, uploadMultipleFile };
