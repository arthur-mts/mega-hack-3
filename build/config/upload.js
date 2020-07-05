"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
    filename: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        var name = path_1.default.basename(file.originalname, ext);
        cb(null, name + "-" + Date.now() + ext);
    },
});
function removeFile(filename) {
    fs_1.unlink(path_1.default.resolve(__dirname, '..', '..', 'uploads', filename), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('succes');
        }
    });
}
exports.removeFile = removeFile;
var upload = multer_1.default({
    storage: storage,
});
exports.default = upload;
