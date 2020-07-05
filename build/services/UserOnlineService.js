"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSocket = exports.disconnectSocket = exports.connectSocket = void 0;
var connections = {};
function connectSocket(key, socket) {
    connections[key] = socket;
}
exports.connectSocket = connectSocket;
function disconnectSocket(key) {
    delete connections[key];
}
exports.disconnectSocket = disconnectSocket;
function findSocket(key) {
    return connections[key];
}
exports.findSocket = findSocket;
