"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
    return AppError;
}());
exports.default = AppError;
