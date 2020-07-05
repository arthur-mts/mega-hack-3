"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("./AppError"));
function errorHandler(err, res) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).send({ message: err.message });
    }
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
}
exports.default = errorHandler;
