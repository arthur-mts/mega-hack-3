import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import path from 'path';
import dotenv from 'dotenv';

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.setConfig();

    this.setMongoConfig();

    this.setRoutes();

    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
    this.app.listen(String(process.env.HTTP_PORT), () => {
      console.log('Server on!');
    });
  }

  private setRoutes() {
    this.app.use(router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setConfig() {
    dotenv.config();
    this.app.use(express.json());
  }
}

export default new App().app;
