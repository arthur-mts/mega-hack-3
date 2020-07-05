"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mappingRouter = express_1.Router();
mappingRouter.get('/', function (req, res) {
    var _a = req.query, latitude = _a.latitude, longitude = _a.longitude;
});
