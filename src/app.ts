import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import path from 'path';
import { Server, createServer } from 'http';
import io from 'socket.io';
import { connectSocket, disconnectSocket } from './services/UserOnlineService';
import cors from 'cors';

class App {
  public app: Application;
  public server: Server;
  private io: io.Server;

  constructor() {
    this.app = express();

    this.setConfig();

    this.server = createServer(this.app);

    this.io = io(this.server);

    this.setMongoConfig();

    this.setRoutes();

    // this.socketIoConfig();

    this.app.listen(Number(process.env.PORT), () => {
      console.log('Server on!');
    });
  }

  private socketIoConfig() {
    this.server.listen(String(process.env.IO_PORT), () => {
      console.log('Web Socker server on!');
    });

    this.io.on('connection', (socket) => {
      connectSocket(socket.id, socket);

      socket.on('disconnect', () => {
        disconnectSocket(socket.id);
      });
    });
  }

  private setRoutes() {
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
    this.app.use(router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(String(process.env.MONGO_URL), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setConfig() {
//    dotenv.config();
    this.app.use(express.json());
    this.app.use(cors());
  }
}

export default new App().app;
