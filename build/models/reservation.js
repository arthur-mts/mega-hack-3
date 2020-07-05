"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = exports.ReservationStatus = void 0;
var mongoose_1 = require("mongoose");
var FeedbackSchema = new mongoose_1.Schema({
    description: String,
    attendance: Number,
    hygiene: Number,
    price: Number,
    drinksQuality: Number,
});
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "PENDING";
    ReservationStatus["REFUSED"] = "REFUSED";
    ReservationStatus["APPROVED"] = "APPROVED";
    ReservationStatus["CLOSED"] = "CLOSED";
    ReservationStatus["OPEN"] = "OPEN";
    //TODO: Rever a regra de negocio de quando o user da checkin
})(ReservationStatus = exports.ReservationStatus || (exports.ReservationStatus = {}));
// pending, refused, approved, closed
var ReservationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    establishmentId: { type: mongoose_1.Types.ObjectId, ref: 'Establishment' },
    schedule: Date,
    status: {
        type: String,
        enum: ['PENDING', 'REFUSED', 'APPROVED', 'CLOSED', 'OPEN'],
        default: 'PENDING',
    },
    feedback: {
        type: FeedbackSchema,
        default: undefined,
    },
});
exports.Reservation = mongoose_1.model('Reservation', ReservationSchema);
