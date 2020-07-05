"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var UserOnlineService_1 = require("./services/UserOnlineService");
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.setConfig();
        this.server = http_1.createServer(this.app);
        this.io = socket_io_1.default(this.server);
        this.setMongoConfig();
        this.setRoutes();
        // this.socketIoConfig();
        this.app.listen(String(process.env.HTTP_PORT), function () {
            console.log('Server on!');
        });
    }
    App.prototype.socketIoConfig = function () {
        this.server.listen(String(process.env.IO_PORT), function () {
            console.log('Web Socker server on!');
        });
        this.io.on('connection', function (socket) {
            UserOnlineService_1.connectSocket(socket.id, socket);
            socket.on('disconnect', function () {
                UserOnlineService_1.disconnectSocket(socket.id);
            });
        });
    };
    App.prototype.setRoutes = function () {
        this.app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
        this.app.use(routes_1.default);
    };
    App.prototype.setMongoConfig = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(String(process.env.MONGO_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    };
    App.prototype.setConfig = function () {
        dotenv_1.default.config();
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
    };
    return App;
}());
exports.default = new App().app;
