
import filepath = require('path');


import express = require('express');


let staticDIR = filepath.resolve(__dirname , "../public");


export var general = express.Router();


general.use( express.static( staticDIR ));