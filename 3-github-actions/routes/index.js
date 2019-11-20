var express = require('express');
var router = express.Router();

var fs = require('fs');
require('dotenv').config()

router.get('/', function (req, res, next) {

  myPlatform = process.platform

  let inImgPath = "/images/catpaw.png";

  if (myPlatform != "linux") {
    inImgPath = "/images/penguinflipper.png"
  }

  res.render('index', 
  { 
    title: "A Very Useful Website",
    imgPath: inImgPath
  }
  );
});

module.exports = router;
