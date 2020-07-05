"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var sessionRoutes_1 = __importDefault(require("./sessionRoutes"));
var establishmentRoutes_1 = __importDefault(require("./establishmentRoutes"));
var router = express_1.default.Router();
router.use(function (req, _res, next) {
    console.log("[" + req.method.toUpperCase() + "]: " + req.url);
    next();
});
router.use('/users', userRoutes_1.default);
router.use('/sessions', sessionRoutes_1.default);
router.use('/establishments', establishmentRoutes_1.default);
exports.default = router;
