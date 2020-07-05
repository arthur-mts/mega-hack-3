"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Establishment = void 0;
var mongoose_1 = require("mongoose");
var point_1 = __importDefault(require("./util/point"));
var ScoreSchema = new mongoose_1.Schema({
    attendance: { type: Number, default: 0 },
    hygiene: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    drinksQuality: { type: Number, default: 0 },
    empaty: { type: Boolean, default: true },
});
var EstablishmentSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    score: { type: ScoreSchema, default: {} },
    reservations: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Reservation' }],
    email: String,
    hashPassword: String,
    location: {
        type: point_1.default,
        index: '2dsphere',
    },
    avatar: {
        required: false,
        type: String,
    },
    phoneNumber: String,
}, {
    toJSON: {
        virtuals: true,
    },
});
EstablishmentSchema.virtual('avatar_url').get(function () {
    return process.env.APP_URL + ":" + process.env.HTTP_PORT + "/files/" + this.avatar;
});
EstablishmentSchema.virtual('reservations_count').get(function () {
    return this.reservations.length;
});
//TODO arrumar um jeito de fazer com que o estabelecimento possa ter acesso em tempo
// real a todas as reservas feitas
exports.Establishment = mongoose_1.model('Establishment', EstablishmentSchema);
