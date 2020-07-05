"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var establishment_1 = require("../models/establishment");
var bcrypt_1 = require("bcrypt");
var AppError_1 = __importDefault(require("../errors/AppError"));
var upload_1 = require("../config/upload");
var EstablishmentController = /** @class */ (function () {
    function EstablishmentController() {
    }
    EstablishmentController.prototype.store = function (_a) {
        var name = _a.name, email = _a.email, password = _a.password, avatar = _a.avatar, description = _a.description, latitude = _a.latitude, longitude = _a.longitude, phoneNumber = _a.phoneNumber;
        return __awaiter(this, void 0, void 0, function () {
            var establishment, hashPassword, location;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, establishment_1.Establishment.findOne({ email: email })];
                    case 1:
                        establishment = _b.sent();
                        if (establishment) {
                            throw new AppError_1.default('Establishment alredy exists', 400);
                        }
                        return [4 /*yield*/, bcrypt_1.hash(password, 8)];
                    case 2:
                        hashPassword = _b.sent();
                        location = {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        };
                        return [4 /*yield*/, establishment_1.Establishment.create({
                                email: email,
                                name: name,
                                hashPassword: hashPassword,
                                avatar: avatar,
                                description: description,
                                phoneNumber: phoneNumber,
                                location: location,
                            })];
                    case 3:
                        establishment = _b.sent();
                        establishment = establishment.toJSON();
                        establishment === null || establishment === void 0 ? true : delete establishment.hashPassword;
                        return [2 /*return*/, establishment];
                }
            });
        });
    };
    EstablishmentController.prototype.list = function (_a) {
        var latitude = _a.latitude, longitude = _a.longitude, radius = _a.radius;
        return __awaiter(this, void 0, void 0, function () {
            var establishments;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, establishment_1.Establishment.find({
                            location: {
                                $near: {
                                    $geometry: {
                                        type: 'Point',
                                        coordinates: [longitude, latitude],
                                    },
                                    $maxDistance: radius,
                                },
                            },
                        }).select('-hashPassword')];
                    case 1:
                        establishments = _b.sent();
                        return [2 /*return*/, establishments];
                }
            });
        });
    };
    EstablishmentController.prototype.update = function (_a) {
        var avatar = _a.avatar, description = _a.description, latitude = _a.latitude, longitude = _a.longitude, name = _a.name, phoneNumber = _a.phoneNumber, establishment_id = _a.establishment_id;
        return __awaiter(this, void 0, void 0, function () {
            var establishment, location_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (establishment_1.Establishment === null || establishment_1.Establishment === void 0 ? void 0 : establishment_1.Establishment.findById(establishment_id))];
                    case 1:
                        establishment = _b.sent();
                        if (!establishment) return [3 /*break*/, 3];
                        if (avatar) {
                            upload_1.removeFile(establishment.avatar);
                            establishment.avatar = avatar;
                        }
                        establishment.description = description || establishment.description;
                        establishment.name = name || establishment.name;
                        establishment.phoneNumber = phoneNumber || establishment.phoneNumber;
                        if (latitude && longitude) {
                            location_1 = {
                                type: 'Point',
                                coordinates: [longitude, latitude],
                            };
                            establishment.location = location_1;
                        }
                        return [4 /*yield*/, establishment.save()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        establishment = establishment === null || establishment === void 0 ? void 0 : establishment.toJSON();
                        establishment === null || establishment === void 0 ? true : delete establishment.hashPassword;
                        return [2 /*return*/, establishment];
                }
            });
        });
    };
    return EstablishmentController;
}());
exports.default = new EstablishmentController();
