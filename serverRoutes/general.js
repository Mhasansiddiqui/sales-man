var filepath = require('path');
var express = require('express');
var staticDIR = filepath.resolve(__dirname, "./../public");
exports.general = express.Router();
exports.general.use(express.static(staticDIR));
