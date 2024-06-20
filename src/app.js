import express from "express";
import indexRouter from "./routes/QuakeRoute.js";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    // this.swagger();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/", indexRouter);
  }

  // swagger() {
  // 	this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // }
}

export default new App().server;
