"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.User = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    avatar: String,
    email: String,
    hashPassword: String,
    reservations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Reservation',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
});
exports.UserSchema.virtual('avatar_url').get(function () {
    return process.env.APP_URL + ":" + process.env.HTTP_PORT + "/files/" + this.avatar;
});
exports.User = mongoose_1.model('User', exports.UserSchema);
function checkPassword(hashPassword, password) {
    return bcrypt_1.compare(password, hashPassword);
}
exports.checkPassword = checkPassword;
