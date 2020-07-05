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
var bcrypt_1 = require("bcrypt");
var reservation_1 = require("../models/reservation");
var AppError_1 = __importDefault(require("../errors/AppError"));
var EstablishmentReservationController = /** @class */ (function () {
    function EstablishmentReservationController() {
    }
    EstablishmentReservationController.prototype.checkout = function (_a) {
        var reservation_id = _a.reservation_id;
        return __awaiter(this, void 0, void 0, function () {
            var reservation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, reservation_1.Reservation.findById(reservation_id)];
                    case 1:
                        reservation = _b.sent();
                        if (!reservation)
                            throw new AppError_1.default('Reservation not found', 404);
                        if (reservation.status != reservation_1.ReservationStatus.OPEN)
                            throw new AppError_1.default('Checkout unauthorized', 401);
                        reservation.status = reservation_1.ReservationStatus.CLOSED;
                        //TODO notificar usuario quando a reserva for fechada e permitir o feedback
                        return [4 /*yield*/, reservation.save()];
                    case 2:
                        //TODO notificar usuario quando a reserva for fechada e permitir o feedback
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EstablishmentReservationController.prototype.refuse = function (_a) {
        var reservation_id = _a.reservation_id;
        return __awaiter(this, void 0, void 0, function () {
            var reservation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, reservation_1.Reservation.findById(reservation_id)];
                    case 1:
                        reservation = _b.sent();
                        if (!reservation)
                            throw new AppError_1.default('Reservation not found', 404);
                        reservation.status = reservation_1.ReservationStatus.REFUSED;
                        //TODO notificar usuario quando a reserva for recusada
                        return [4 /*yield*/, reservation.save()];
                    case 2:
                        //TODO notificar usuario quando a reserva for recusada
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EstablishmentReservationController.prototype.approve = function (_a) {
        var reservation_id = _a.reservation_id, establishment_id = _a.establishment_id;
        return __awaiter(this, void 0, void 0, function () {
            var reservation, validationCode, approvedReservations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, reservation_1.Reservation.findById(reservation_id)];
                    case 1:
                        reservation = _b.sent();
                        if (!reservation)
                            throw new AppError_1.default('Reservation not found', 404);
                        reservation.status = reservation_1.ReservationStatus.APPROVED;
                        //TODO notificar o usuario quando a reserva for aprovada
                        return [4 /*yield*/, reservation.save()];
                    case 2:
                        //TODO notificar o usuario quando a reserva for aprovada
                        _b.sent();
                        return [4 /*yield*/, bcrypt_1.hash(reservation_id, 2)];
                    case 3:
                        validationCode = _b.sent();
                        return [4 /*yield*/, reservation_1.Reservation.find({
                                establishmentId: establishment_id,
                                status: reservation_1.ReservationStatus.APPROVED,
                            })];
                    case 4:
                        approvedReservations = _b.sent();
                        return [2 /*return*/, { reservation: reservation, validationCode: validationCode, approvedReservations: approvedReservations.length }];
                }
            });
        });
    };
    EstablishmentReservationController.prototype.list = function (_a) {
        var establishment_id = _a.establishment_id, filter = _a.filter;
        return __awaiter(this, void 0, void 0, function () {
            var reservations;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, reservation_1.Reservation.find({ establishmentId: establishment_id })];
                    case 1:
                        reservations = _b.sent();
                        if (filter) {
                            switch (filter) {
                                case 'approved':
                                    return [2 /*return*/, reservations.filter(function (item) { return item.status == reservation_1.ReservationStatus.APPROVED; })];
                                case 'closed':
                                    return [2 /*return*/, reservations.filter(function (item) { return item.status == reservation_1.ReservationStatus.CLOSED; })];
                                case 'open':
                                    return [2 /*return*/, reservations.filter(function (item) { return item.status == reservation_1.ReservationStatus.OPEN; })];
                                case 'pending':
                                    return [2 /*return*/, reservations.filter(function (item) { return item.status == reservation_1.ReservationStatus.PENDING; })];
                                case 'refused':
                                    return [2 /*return*/, reservations.filter(function (item) { return item.status == reservation_1.ReservationStatus.REFUSED; })];
                            }
                        }
                        return [2 /*return*/, reservations];
                }
            });
        });
    };
    return EstablishmentReservationController;
}());
exports.default = new EstablishmentReservationController();
